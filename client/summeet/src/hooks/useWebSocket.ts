import type { Message, MessageContent } from "@/models/message";
import { onMounted, onUnmounted, reactive, ref } from "vue";

export function useWebSocket(url: string) {
    const socket = ref<WebSocket>();
    let onMessageCallback: (message: string) => void | null;


    onMounted(() => {
        connect();
    });

    onUnmounted(() => {
        if (!socket.value) return;
        socket.value.close();
    });

    function connect() {
        console.log("Connectng " + url);
        socket.value = new WebSocket(url);
        socket.value.onopen = () => onConnection;
        socket.value.onclose = () => onClosed
        socket.value.onmessage = (e: MessageEvent) => {
            if (onMessageCallback)
                onMessageCallback(e.data as string)
        };
    }

    function onConnection(callback: () => void) {
        callback();
    }

    function onClosed(callback: () => void) {
        callback();
    }

    function onMessage(callback: (message: string) => void) {
        onMessageCallback = callback;
    }

    function sendMessage<T>(message: MessageContent<T>) {
        if (socket.value && socket.value.readyState === WebSocket.OPEN) {
            const messageString = JSON.stringify(message);
            socket.value.send(messageString);
        }
    }

    return { onConnection, onClosed, onMessage, sendMessage, connect }
}


