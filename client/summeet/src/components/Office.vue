<script setup lang="ts">      
import SceneOffice from '@/components/SceneOffice.vue';
import { meetingStore } from '@/stores/meeting';
import { computed, onMounted, ref, type Ref } from 'vue';
const  meeting = meetingStore();
</script>

<template>
    <section class="video-container">
        <video  ref="stream"  autoplay :srcObject="meeting.localStream"></video>
        <video v-for="[id, video] of meeting.remoteStreams" :srcObject.prop="video" :key="id" autoplay></video>
    </section>
    <SceneOffice/>
</template>

<style>
.video-container {
    position: absolute;
    display: flex;
    flex-wrap: wrap;
}
video {
    border-radius: 8px;
    width: 16rem;
    height: 12rem;
    margin: 10px;
    background-color: #000;
}
</style>