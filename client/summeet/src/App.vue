<script setup lang="ts">
import Office from '@/components/Office.vue';
import Debug from '@/components/Debug.vue';
import { onMounted } from 'vue';
import { screenStore } from './stores/screen';
import { RouterView } from 'vue-router';

const screen = screenStore();

onMounted(() => {
	window.addEventListener('resize', onDocumentResize);
	onDocumentResize();
});

function onDocumentResize() {
	screen.setWidth(window.innerWidth);
	screen.setHeight(window.innerHeight);
	const doc = document.documentElement
	doc.style.setProperty('--doc-height', `${window.innerHeight}px`);
	doc.style.setProperty('--doc-width', `${window.innerWidth}px`);
}
</script>

<template>
	<RouterView />
	<!--<Debug />
	<Office />-->
</template>

<style>
@import '@/styles/global.css';
</style>

