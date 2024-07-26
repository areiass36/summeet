import { Direction } from "./direction";

export enum ActionKeys {
	Down = 0,
	Left = 1,
	Right = 2,
	Up = 3
}

export class PlayerController {
	pressingKeys: { [key in ActionKeys]?: boolean } = {}
	constructor() { }
	getDirection(): Direction | null {
		const key = [ActionKeys.Down, ActionKeys.Left, ActionKeys.Right, ActionKeys.Up].find(k => this.pressingKeys[k] === true)
		return key != null ? Direction[ActionKeys[key] as keyof typeof Direction] : null
	}
}
