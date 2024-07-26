import { ActionKeys } from "@/models/action-keys"
import { Direction } from "@/models/direction"

export class KeysController {
    pressingKeys: { [key in ActionKeys]?: boolean } = {}
    constructor() { }
    getDirection(): Direction | null {
        const key = [ActionKeys.Down, ActionKeys.Left, ActionKeys.Right, ActionKeys.Up].find(k => this.pressingKeys[k] === true)
        return key != null ? Direction[ActionKeys[key] as keyof typeof Direction] : null
    }
}