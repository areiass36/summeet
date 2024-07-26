import { ref } from "vue";
import { defineStore } from "pinia";
export const debugStore = defineStore('debug', () => {
	const debug = ref(true);
	const fps = ref(0);
	return { debug, fps };
});
