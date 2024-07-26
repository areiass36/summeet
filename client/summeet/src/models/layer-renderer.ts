import type { State } from "./state"

export interface LayerRenderer {
	foreground?: HTMLImageElement,
	background: HTMLImageElement,
	drawBackground(state: State, ctx: CanvasRenderingContext2D): void
	drawForeground(state: State, ctx: CanvasRenderingContext2D): void
}
