import { type Direction } from './direction'
import { type Position } from './position'
import type { State } from './state'

export interface Stateful {
	direction: Direction,
	position: Position,
	isMoving: boolean,
	updateState(state: State): void
}

export interface Renderable {
	img: HTMLImageElement,
	draw(state: State): void
}
