import type { Position } from "@/models/position";

export class CallController {

    private static connections: Position[] = [];

    public static processCall(positions: Position[]): Position[] | null {
        this.connections = [];
        this.proccessCallInner(0, positions, new Set<number>());
        return this.connections.length ? this.connections : null;
    }

    private static proccessCallInner(cur: number, positions: Position[], ignore: Set<number>) {
        const curPosition = positions[cur];
        ignore.add(cur);
        for (let i = 1; i < positions.length; i++) {
            const position = positions[i];
            if (ignore.has(i) || !this.hasConnection(curPosition, position)) continue;
            this.connections.push(position);
            this.proccessCallInner(i, positions, ignore);
            break;
        }
    }

    private static hasConnection(a: Position, b: Position): boolean {
        if (a.x - 1 == b.x && a.y == b.y)
            return true;
        if (a.x + 1 == b.x && a.y == b.y)
            return true;
        if (a.x == b.x && a.y - 1 == b.y)
            return true;
        if (a.x == b.x && a.y + 1 == b.y)
            return true;
        if (a.x == b.x && a.y == b.y)
            return true;
        return false;
    }

}