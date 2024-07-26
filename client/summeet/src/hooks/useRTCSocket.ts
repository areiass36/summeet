import { onMounted, reactive } from "vue";
import { useWebSocket } from "@/hooks/useWebSocket";
import { meetingStore } from "@/stores/meeting";
import type { Message, MessageContent } from "@/models/message";
import type { RTCContent, RTCMessage } from "@/models/rtc-content";
import { MessageType } from "@/common/message-type";
import { ca } from "vuetify/locale";


export interface RTCSocket {
    cleanUnconnectedPeers(peersPresent: Set<number>): void
    startMeeting(origin: number, destination: number): void
    endMeeting(destination: number): void
}

export function useRTCSocket(url: string) {
    const socket = useWebSocket(url);
    const connections = reactive<Map<number, RTCPeerConnection>>(new Map<number, RTCPeerConnection>());
    const meeting = meetingStore();
    const config = {
        iceServers: [
            {
                urls: ["stun:stun.l.google.com:19302"],
            },
        ],
    };

    async function startMeeting(origin: number, destination: number) {
        if (connections.has(destination) || meeting.localStream == null) return;
        connections.set(destination, await createPeerInstance(origin, destination));
    }

    async function endMeeting(destination: number) {
        if (!connections.has(destination)) return;
        const connection = connections.get(destination)!;
        meeting.remoteStreams.delete(destination);
        connection.close();
        connections.delete(destination);
    }

    async function createPeerInstance(origin: number, destination: number): Promise<RTCPeerConnection> {
        const connection = new RTCPeerConnection(config);
        connection.ontrack = onTrack(origin, destination);
        connection.onicecandidate = onNewIceCandidate(origin, destination);
        connection.onnegotiationneeded = await onNegotionNeeded(origin, destination);
        connection.onsignalingstatechange = (e) => console.log("Signaling state change", e.target);
        for (let track of meeting.localStream!.getTracks()) {
            connection.addTrack(track, meeting.localStream!);
        }
        return connection;
    }

    socket.onMessage(async (event: string) => {
        const message = JSON.parse(event) as Message;
        const handler = {
            [MessageType.rtcOffer]: onOfferReceived,
            [MessageType.rtcAnwser]: onAnswerReceived,
            [MessageType.rtcIceCandidate]: onIceCandidateReceived
        }[message.type];
        const content = message as MessageContent<RTCContent>;
        await handler(content.content);
    });

    function onTrack(origin: number, destination: number) {
        return (e: RTCTrackEvent) => {
            e.track.onunmute = () => {
                if (meeting.remoteStreams.has(destination)) return;
                const videoTrack = e.streams[0].getVideoTracks()[0];
                console.log("video track enabled", videoTrack.enabled);
                console.log("video track ready state", videoTrack.readyState);
                meeting.remoteStreams.set(destination, e.streams[0]);
            }
        };
    }

    async function onAnswerReceived(message: RTCContent) {
        if (!connections.has(message.origin)) return;
        const connection = connections.get(message.origin)!;
        //console.log("Answer received");
        await connection.setRemoteDescription((message as RTCMessage<RTCSessionDescriptionInit>).packet);
    }

    async function onOfferReceived(message: any) {
        if (!connections.has(message.origin))
            connections.set(message.origin, await createPeerInstance(message.destination, message.origin));
        const connection = connections.get(message.origin)!;
        //console.log("Offer received");
        await connection.setRemoteDescription(message.packet);
        const answer = await connection.createAnswer();
        await connection.setLocalDescription(answer);
        socket.sendMessage({ type: MessageType.rtcAnwser, content: { origin: message.destination, destination: message.origin, packet: answer } });
    }

    async function onIceCandidateReceived(message: RTCContent) {
        if (!connections.has(message.origin))
            connections.set(message.origin, await createPeerInstance(message.destination, message.origin));
        const connection = connections.get(message.origin)!;
        if (connection.remoteDescription)
            await connection.addIceCandidate((message as RTCMessage<RTCIceCandidateInit>).packet);
    }

    async function onNegotionNeeded(origin: number, destination: number): Promise<() => void> {
        return async () => {
            const connection = connections.get(destination)!;
            console.log("Are you even being called?", connection);
            if (destination >= origin) return;
            await connection.setLocalDescription();
            socket.sendMessage({ type: MessageType.rtcOffer, content: { origin: origin, destination: destination, packet: connection.localDescription } });
        }
    }

    function onNewIceCandidate(origin: number, destination: number): (e: RTCPeerConnectionIceEvent) => void {
        return (e: RTCPeerConnectionIceEvent) => {
            if (!e.candidate) return;
            socket.sendMessage({ type: MessageType.rtcIceCandidate, content: { origin: origin, destination: destination, packet: e.candidate } });
        }
    }

    function cleanUnconnectedPeers(peersPresent: Set<number>) {
        for (let [id, connection] of connections) {
            if (peersPresent.has(id)) continue;
            connection.close();
            connections.delete(id);
            meeting.remoteStreams.delete(id);
        }
    }

    return { cleanUnconnectedPeers, startMeeting, endMeeting } as RTCSocket
}