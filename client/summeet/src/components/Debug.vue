<script lang="ts" setup>
import { debugStore } from '@/stores/debug';
const debuggerStore = debugStore();
</script>


<template>
	<article class="fps" v-if="debuggerStore.debug">
		<span>{{ debuggerStore.fps }}</span>
	</article>
</template>

<style scoped>
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

</style>
