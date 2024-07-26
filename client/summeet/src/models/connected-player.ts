import { Direction } from "./direction";
import type { Renderable, Stateful } from "./entity";
import type { Position } from "./position";
import type { State } from "./state";
import { sprite } from "@/common/sprite";
import type { User } from "./user";
import type { Player } from "./player";

export class ConnectedPlayer implements Renderable, Stateful {

	frame: number = 0;
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
	}

	draw(state: State): void {
		const screen = state.screen;
		const ctx = state.ctx;
		const localPlayer = state.localPlayer;

		const actualX = screen.xUnit * (this.position.x - (localPlayer.position.x - Math.floor(screen.tiles.x / 2)));
		const actualY = screen.yUnit * (this.position.y - (localPlayer.position.y - Math.floor(screen.tiles.y / 2)));

		const maxFrame = this.isMoving ? sprite.maxMovingFrames : sprite.maxIdleFrames;
		if (this.frame > maxFrame) {
			this.animationFrame = this.animationFrame == sprite.animationSprites - 1 ? 0 : this.animationFrame + 1;
			this.frame = 0;
		}

		const horizontalFrame = this.animationFrame;
		const verticalFrame = this.isMoving ? this.direction + sprite.movingAnimationOffset : this.direction;
		ctx.drawImage(this.img, sprite.width * horizontalFrame, sprite.height * verticalFrame, sprite.width, sprite.height, actualX, actualY, sprite.width / screen.scale, sprite.height / screen.scale);
		this.frame++;
	}
}
