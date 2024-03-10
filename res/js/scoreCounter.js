import { Colors, Entity } from "./entity.js";
import { Vector2 } from "./math.js";

export class Text extends Entity {
    constructor(pos = new Vector2()) {
        super(pos);
        this.text = 0;
        this.size = 150;
        this.font = '"Major Mono Display", monospace';
        this.color = Colors.getColor("white");
    }

    drawExtend(ctx) {
        ctx.font = `${this.size}px ${this.font}`;
        ctx.fillStyle = this.color;
        ctx.textAlign = "left";
        ctx.fillText(this.text, 0, 0);
    }
}