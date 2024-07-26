import { type LayerRenderer } from './layer-renderer'
import { layer } from '@/common/layer'
import type { State } from './state';
export class Layer implements LayerRenderer {
	background: HTMLImageElement;
	foreground?: HTMLImageElement;
	tiles: number[][];

	constructor(background: HTMLImageElement, tiles: number[][], foreground?: HTMLImageElement) {
		this.background = background;
		this.foreground = foreground;
		this.tiles = tiles;
	}

	drawBackground(state: State, ctx: CanvasRenderingContext2D): void {
		const player = state.localPlayer;
		const screen = state.screen;
		const halfX = Math.floor(screen.tiles.x / 2)
		//+1 fixes player upper sprite position
		const halfY = Math.floor((screen.tiles.y) / 2) + 1
		const actualX = screen.xUnit * (player.position.x - halfX)
		const actualY = screen.yUnit * (player.position.y - halfY)
		ctx.drawImage(this.background, -actualX, -actualY, layer.width, layer.height);

	}
	drawForeground(state: State, ctx: CanvasRenderingContext2D): void {

	}
}
