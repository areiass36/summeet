import { layer } from '@/common/layer'
import type { State } from './state';
import type { Renderable } from './entity';

export class Layer implements Renderable {
	img: HTMLImageElement;
	foreground?: HTMLImageElement;
	tiles: number[][];

	constructor(background: HTMLImageElement, tiles: number[][]) {
		this.img = background;
		this.tiles = tiles;
	}

	draw(state: State): void {
		const player = state.localPlayer;
		const screen = state.screen;
		const halfX = Math.floor(screen.tiles.x / 2)
		//+1 fixes player upper sprite position
		const halfY = Math.floor((screen.tiles.y) / 2) + 1
		const actualX = screen.xUnit * (player.position.x - halfX)
		const actualY = screen.yUnit * (player.position.y - halfY)
		state.ctx.drawImage(this.img, -actualX, -actualY, layer.width, layer.height);

	}
}
