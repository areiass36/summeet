<script setup lang="ts">
import Office from '@/components/Office.vue';
import Debug from '@/components/Debug.vue';
import { onMounted } from 'vue';
import { screenStore } from './stores/screen';

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
	<Debug />
	<Office />
</template>

<style></style>
