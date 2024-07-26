import { sprite } from "@/common/sprite";
import type { Position } from "@/models/position";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const screenStore = defineStore('screen', () => {
	const scale = ref(1);
	const width = ref(Math.floor(window.innerWidth / sprite.base) * sprite.base);
	const height = ref(Math.floor(window.innerHeight / sprite.base) * sprite.base);
	const tiles = computed((): Position => ({ x: (width.value / sprite.base) * scale.value, y: (height.value / sprite.base) * scale.value }));
	const yUnit = computed(() => height.value / tiles.value.y)
	const xUnit = computed(() => width.value / tiles.value.x)
	const isMobile = computed(() => 'ontouchstart' in window || navigator.maxTouchPoints);
	function setWidth(value: number) {
		width.value = Math.floor(value / sprite.base) * sprite.base;
	}

	function setHeight(value: number) {
		height.value = Math.floor(value / sprite.base) * sprite.base;
	}

	return { width, height, setWidth, setHeight, tiles, xUnit, yUnit, isMobile, scale };
}); 
