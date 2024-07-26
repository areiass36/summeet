import type { PlayerSocket } from "@/hooks/usePlayerSocket";
import type { RenderHandler, StateHandler } from "@/models/handler";
import type { State } from "@/models/state";

export class PlayerHandler implements StateHandler, RenderHandler {

    private playerSocket: PlayerSocket;
    constructor(playerSocket: PlayerSocket) {
        this.playerSocket = playerSocket;
    }

    onStateUpdated(state: State): void {
        state.localPlayer.updateState(state);
        this.playerSocket.sendPlayerInfo(state.localPlayer);
    }

    onRender(state: State): void {
        state.localPlayer.draw(state);
    }
}