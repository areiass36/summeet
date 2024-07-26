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
		cnv.value.width = screen.width;
		cnv.value.height = screen.height;
		ctx.value = cnv.value.getContext("2d")!;
		(window as any).debug = () => debuggerStore.debug = !debuggerStore.debug;
		startMainLoop();
	});

	function startMainLoop() {
		const maxMsPerUpdate = 15;
		const maxUpdates = 2;
		let previousTime = performance.now();
		let lag = 0;
		onInit();
		function loop() {
			const now = performance.now();
			let elapsed = now - previousTime;
			const fps = Math.round(1 / (elapsed / 1000));
			lag = elapsed;
			//console.log("elapsed", elapsed);
			let updates = 0;
			do {
				cnv.value.width = screen.width;
				cnv.value.height = screen.height;
				cnv.value.dispatchEvent(new Event(events.update));
				lag -= maxMsPerUpdate;
				updates++;
			} while (lag >= maxMsPerUpdate && updates < maxUpdates);
			//console.log("lag", lag);
			//console.log("updates", updates);
			debuggerStore.fps = fps;
			cnv.value.dispatchEvent(new Event(events.render));
			previousTime = now;
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


