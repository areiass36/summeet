<script setup lang="ts">
import { keymap } from '@/common/keymap';
import SceneOffice from '@/components/SceneOffice.vue';
import { ActionKeys } from '@/models/action-keys';
import { keysStore } from '@/stores/keys';
import { meetingStore } from '@/stores/meeting';
import { screenStore } from '@/stores/screen';
import { computed, onMounted, ref, type Ref } from 'vue';
const screen = screenStore();
const meeting = meetingStore();
const keys = keysStore();


onMounted(() => {
	if (screen.isMobile)
		screen.scale = 2;
	document.addEventListener('keydown', (e: KeyboardEvent) => {
		keys.press(keymap.get(e.code)!);
	}, false);
	document.addEventListener('keyup', (e: KeyboardEvent) => {
		keys.release(keymap.get(e.code)!);
	}, false);
});
</script>

<template>
	<section class="video-container">
		<video v-if="!screen.isMobile" ref="stream" autoplay :srcObject="meeting.localStream"></video>
		<video v-for="[id, video] of meeting.remoteStreams" :srcObject.prop="video" :key="id" autoplay></video>
	</section>
	<SceneOffice />
	<article v-if="screen.isMobile" class="btns">
		<v-btn class="up" icon="fa-solid fa-arrow-up" @touchstart="keys.press(ActionKeys.Up)"
			@touchend="keys.release(ActionKeys.Up)" />
		<v-btn class="right" icon="fa-solid fa-arrow-right" @touchstart="keys.press(ActionKeys.Right)"
			@touchend="keys.release(ActionKeys.Right)" />
		<v-btn class="left" icon="fa-solid fa-arrow-left" @touchstart="keys.press(ActionKeys.Left)"
			@touchend="keys.release(ActionKeys.Left)" />
		<v-btn class="down" icon="fa-solid fa-arrow-down" @touchstart="keys.press(ActionKeys.Down)"
			@touchend="keys.release(ActionKeys.Down)" />
	</article>
</template>

<style scoped>
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
