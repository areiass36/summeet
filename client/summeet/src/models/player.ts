import { type Stateful, type Renderable } from "./entity";
import { type Position } from "./position";
import type { State } from "./state";
import { Direction } from "./direction";
import { sprite } from '@/common/sprite';
import type { User } from "./user";

export class Player implements Renderable, Stateful {

	animationFrame: number = 0;
	previousAnimationFrame: number = 0;
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
		this.user = user;
		this.position = position;
		this.direction = direction;
	}

	updateState(state: State): void {
		if (!this.isMoving) {
			this.animationFrame = this.previousAnimationFrame == 0 ? 2 : 0
			this.previousAnimationFrame = this.animationFrame;

			const nextPosition = this.getNextPosition();
			const canMoveX = !(nextPosition.x < 0 || nextPosition.x > state.layer.tiles[0].length - 1);
			const canMoveY = !(nextPosition.y < 0 || nextPosition.y > state.layer.tiles.length - 1);
			const canStartMoving = canMoveX && canMoveY && state.layer.tiles[nextPosition.y][nextPosition.x] == 0;
			if (!canStartMoving)
				return;
		}

		const key = state.controller.getDirection();
		const pace = .05;
		if (this.direction == Direction.Left && (key == Direction.Left || this.isMoving))
			this.position.x -= pace;
		else if (this.direction == Direction.Right && (key == Direction.Right || this.isMoving))
			this.position.x += pace;
		else if (this.direction == Direction.Up && (key == Direction.Up || this.isMoving))
			this.position.y -= pace;
		else if (this.direction == Direction.Down && (key == Direction.Down || this.isMoving))
			this.position.y += pace;

		this.position.x = Math.round(this.position.x * 100) / 100;
		this.position.y = Math.round(this.position.y * 100) / 100;
	}

	private getNextPosition(): Position {
		return {
			[Direction.Up]: { x: this.position.x, y: this.position.y - 1 },
			[Direction.Down]: { x: this.position.x, y: this.position.y + 1 },
			[Direction.Left]: { x: this.position.x - 1, y: this.position.y },
			[Direction.Right]: { x: this.position.x + 1, y: this.position.y },
		}[this.direction];
	}

	draw(state: State): void {
		const screen = state.screen;
		const ctx = state.ctx;

		const halfX = Math.floor(screen.tiles.x / 2)
		const actualX = Math.floor(screen.xUnit * halfX);

		const halfY = Math.floor(screen.tiles.y / 2)
		const actualY = Math.floor(screen.yUnit * halfY);
		const frame = this.isMoving ? this.animationFrame : 1;

		ctx.drawImage(this.img, sprite.base * frame, sprite.height * this.direction, sprite.width, sprite.height, actualX, actualY, sprite.width / screen.scale, sprite.height / screen.scale);
	}
}
