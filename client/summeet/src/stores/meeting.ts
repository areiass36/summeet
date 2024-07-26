import { defineStore } from "pinia";
import { onMounted, reactive, ref } from "vue";

export const meetingStore = defineStore('meeting', () => {
    const localStream = ref<MediaStream | null>();
    const remoteStreams = reactive<Map<number, MediaStream>>(new Map<number, MediaStream>());
    onMounted(async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localStream.value = stream;
    });
    return { localStream, remoteStreams };
});