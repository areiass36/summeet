import { ActionKeys } from "@/models/action-keys"
import { Direction } from "@/models/direction"

export interface KeysController {
    isPressing(key: ActionKeys): void,
    release(key: ActionKeys): void,
    press(key: ActionKeys): void,
    getDirection(): Direction | null;
}