import type { RTCSocket } from "@/hooks/useRTCSocket";
import type { StateHandler } from "@/models/handler";
import type { State } from "@/models/state";

export class MeetingHandler implements StateHandler {

    private rtcSocket: RTCSocket;
    constructor(rtcSocket: RTCSocket) {
        this.rtcSocket = rtcSocket;
    }

    onStateUpdated(state: State): void {
        const localPlayer = state.localPlayer;
        for (let [id, onlinePlayer] of state.onlinePlayers) {
            const isOnHorizontal = Math.abs(onlinePlayer.position.x - localPlayer.position.x) <= 1 && onlinePlayer.position.y == localPlayer.position.y;
            const isOnVertical = onlinePlayer.position.x == localPlayer.position.x && Math.abs(onlinePlayer.position.y - localPlayer.position.y) <= 1;
            const shouldStartMeeting = isOnHorizontal || isOnVertical;
            if (shouldStartMeeting)
                this.rtcSocket.startMeeting(localPlayer.user.id, onlinePlayer.user.id);
            else
                this.rtcSocket.endMeeting(onlinePlayer.user.id);
        }
        this.rtcSocket.cleanUnconnectedPeers(new Set(state.onlinePlayers.keys()));
    }

}