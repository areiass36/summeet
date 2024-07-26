<script lang="ts" setup>
import { debugStore } from '@/stores/debug';
const debuggerStore = debugStore();
function onKeyDown(key: string) {
	document.dispatchEvent(new KeyboardEvent('keydown', { code: key }))
}

function onKeyUp(key: string) {
	document.dispatchEvent(new KeyboardEvent('keyup', { code: key }))
}
</script>


<template>
	<article class="fps" v-if="debuggerStore.debug">
		<span>{{ debuggerStore.fps }}</span>
	</article>
	<article class="btns">
		<v-btn class="up" icon="fa-solid fa-arrow-up" @mousedown="onKeyDown('ArrowUp')"
			@mouseup="onKeyUp('ArrowUp')" @touchdown="onKeyDown('ArrowUp')" @touchup="onKeyUp('ArrowUp')" />
		<v-btn class=" right" icon="fa-solid fa-arrow-right" @mousedown="onKeyDown('ArrowRight')"
			@mouseup="onKeyUp('ArrowRight')" @touchdown="onKeyDown('ArrowRight')"
			@touchup="onKeyUp('ArrowRight')" />
		<v-btn class=" left" icon="fa-solid fa-arrow-left" @mousedown="onKeyDown('ArrowLeft')"
			@mouseup="onKeyUp('ArrowLeft')" @touchdown="onKeyDown('ArrowLeft')"
			@touchup="onKeyDown('ArrowLeft')" />
		<v-btn class=" down" icon="fa-solid fa-arrow-down" @mousedown="onKeyDown('ArrowDown')"
			@mouseup="onKeyUp('ArrowDown')" @touchup="onKeyUp('ArrowDown')"
			@touchdown="onKeyDown('ArrowDown')" />
	</article>
</template>

<style>
.fps {
	display: flex;
	background-color: white;
	z-index: 1;
	position: absolute;
	right: 1rem;
	top: 1rem;
	align-items: center;
	justify-content: center;
	border-radius: 50px;
	border: 1px solid black;
	padding: 1rem;
	width: 3rem;
	height: 3rem;
}

.btns {
	display: grid;
	grid-template-rows: 1fr 1fr 1fr;
	grid-template-columns: 1fr 1fr 1fr;
	z-index: 1;
	position: absolute;
	left: 1rem;
	bottom: 1rem;
	align-items: center;
	justify-content: center;
	width: 10rem;
	height: 10rem;
}

.up {
	grid-column: 2;
	grid-row: 1;
}

.left {
	grid-column: 1;
	grid-row: 2;
}

.right {
	grid-column: 3;
	grid-row: 2;
}

.down {
	grid-column: 2;
	grid-row: 3;
}
</style>
