import { Colors, Entity } from "./entity.js";
import { Vector2 } from "./math.js";

export class ScoreCounter extends Entity {
    constructor(pos = new Vector2()) {
        super(pos);
        this.score = 0;
    }

    drawExtend(ctx) {
        ctx.font = "150px 'Major Mono Display', monospace";
        ctx.fillStyle = Colors.getColor("white");
        ctx.textAlign = "left";
        ctx.fillText(this.score, 0, 0);
    }
}