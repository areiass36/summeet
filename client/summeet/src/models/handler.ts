import type { State } from "./state";

export interface StateHandler {
    onStateUpdated(state: State): void;
}

export interface RenderHandler {
    onRender(state: State): void;
}