import { onMounted, onUnmounted, ref, type Ref } from 'vue'
import { screenStore } from '@/stores/screen';
import { debugStore } from '@/stores/debug';
import { events } from '@/common/events';

export function useSceneBuilder(cnv: Ref<HTMLCanvasElement>, onInit: () => void) {
	const screen = screenStore();
	const debuggerStore = debugStore();
	const ctx = ref() as Ref<CanvasRenderingContext2D>;
	const animationFrameId = ref() as Ref<number>;

	onMounted(() => {
		console.log("Build");
		cnv.value.width = screen.width;
		cnv.value.height = screen.height;
		ctx.value = cnv.value.getContext("2d")!;
		ctx.value.scale(1, 1);
		(window as any).debug = () => debuggerStore.debug = !debuggerStore.debug;
		startMainLoop();
	});

	function startMainLoop() {
		const msPerUpdate = 15;
		const maxUpdate = 4;
		let previousTime = performance.now();
		let lag = 0;
		onInit();
		function loop() {
			const now = performance.now();
			let elapsed = now - previousTime;
			const fps = Math.round(1 / (elapsed / 1000));
			debuggerStore.fps = fps;
			lag += elapsed;
			let i = 0;
			do {
				cnv.value.width = screen.width;
				cnv.value.height = screen.height;
				cnv.value.dispatchEvent(new Event(events.update));
				lag -= msPerUpdate;
				i++;
			} while (lag >= msPerUpdate && i < maxUpdate);
			previousTime = now;
			cnv.value.dispatchEvent(new Event(events.render));
			animationFrameId.value = window.requestAnimationFrame(loop);
		}
		animationFrameId.value = window.requestAnimationFrame(loop);
	}

	onUnmounted(() => {
		window.cancelAnimationFrame(animationFrameId.value);
		animationFrameId.value = 0;
	})

	return ctx;
}


