import { Direction } from "./direction";
import type { Renderable, Stateful } from "./entity";
import type { Position } from "./position";
import type { State } from "./state";
import { sprite } from "@/common/sprite";
import type { User } from "./user";
import type { Player } from "./player";

export class ConnectedPlayer implements Renderable, Stateful {

	previousAnimationFrame: number = 2;
	animationFrame: number = 0;
	img: HTMLImageElement;
	position: Position;
	direction: Direction;
	user: User;
	get isMoving(): boolean {
		const isMovingX = this.position.x - Math.floor(this.position.x) !== 0;
		const isMovingY = this.position.y - Math.floor(this.position.y) !== 0;
		return isMovingX || isMovingY;
	};

	constructor(img: HTMLImageElement, position: Position, direction: Direction, user: User) {
		this.img = img;
		this.position = position;
		this.direction = direction;
		this.user = user;
	}

	updateState(state: State): void {
		if (!this.isMoving) {
			this.animationFrame = this.previousAnimationFrame == 0 ? 2 : 0;
			this.previousAnimationFrame = this.animationFrame;
		}
	}

	draw(state: State): void {
		const screen = state.screen;
		const ctx = state.ctx;
		const localPlayer = state.localPlayer;

		const actualX = screen.xUnit * (this.position.x - (localPlayer.position.x - Math.floor(screen.tiles.x / 2)));
		const actualY = screen.yUnit * (this.position.y - (localPlayer.position.y - Math.floor(screen.tiles.y / 2)));
		const frame = this.isMoving ? this.animationFrame : 1;
		ctx.drawImage(this.img, sprite.base * frame, sprite.height * this.direction, sprite.width, sprite.height, actualX, actualY, sprite.width / screen.scale, sprite.height / screen.scale);
	}
}
