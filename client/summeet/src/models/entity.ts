import { type Direction } from './direction'
import { type Position } from './position'
import type { State } from './state'

export interface EntityState {
	direction: Direction,
	position: Position,
	isMoving: boolean,
	updateState(state: State): void
}

export interface EntityRenderer {
	img: HTMLImageElement,
	draw(state: State): void
}
