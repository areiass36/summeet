import type { KeysController } from "@/controllers/keys-controller";
import { ActionKeys } from "@/models/action-keys";
import { Direction } from "@/models/direction";
import { defineStore } from "pinia";
import { reactive } from "vue";

export const keysStore = defineStore('keys', () => {
    const pressingKeys: { [key in ActionKeys]?: boolean } = reactive({});

    function isPressing(key: ActionKeys): boolean {
        return pressingKeys[key] || false;
    }

    function release(key: ActionKeys) {
        pressingKeys[key] = false;
    }

    function press(key: ActionKeys) {
        pressingKeys[key] = true;
    }

    function getDirection(): Direction | null {
        const key = [ActionKeys.Down, ActionKeys.Left, ActionKeys.Right, ActionKeys.Up].find(k => pressingKeys[k] === true)
        return key != null ? Direction[ActionKeys[key] as keyof typeof Direction] : null
    }
    return { isPressing, release, getDirection, press } as KeysController;
});