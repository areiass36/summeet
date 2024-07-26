import type { RenderHandler } from "@/models/handler";
import type { State } from "@/models/state";

export class BackgroundHandler implements RenderHandler {

    onRender(state: State): void {
        this.clearScreen(state.ctx);
        state.layer.draw(state);
    }

    private clearScreen(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = "#3a3a50"
        ctx.beginPath();
        ctx.rect(0, 0, screen.width, screen.height);
        ctx.fill();
    }

}