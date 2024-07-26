import { ActionKeys } from "@/models/action-keys";
import { Direction } from "@/models/direction";

export const keymap = new Map(Object.entries({
		ArrowLeft : ActionKeys.Left,
		ArrowUp : ActionKeys.Up,
		ArrowDown : ActionKeys.Down,
		ArrowRight : ActionKeys.Right
}));

export const directionMap = new Map(Object.entries({
		[ActionKeys.Down] : Direction.Down,
		[ActionKeys.Up] : Direction.Up,
		[ActionKeys.Left] : Direction.Left,
		[ActionKeys.Right] : Direction.Right
}));
