import type { RenderHandler, StateHandler } from "@/models/handler";
import type { State } from "@/models/state";

export class OnlinePlayerHandler implements StateHandler, RenderHandler {

    onStateUpdated(state: State): void {
        const onlinePlayers = state.onlinePlayers;
        for (const [id, player] of onlinePlayers)
            player.updateState(state);
    }

    onRender(state: State): void {
        const onlinePlayers = state.onlinePlayers;
        for (const [id, player] of onlinePlayers)
            player.draw(state);
    }

}