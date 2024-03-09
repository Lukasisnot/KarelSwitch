import { Entity } from "./entity.js";
import { Vector2 } from "./math.js";
import { Colors } from "./entity.js";

export class ScorePoint extends Entity {
    constructor(pos = new Vector2()) {
        super(pos);
        this.radius = 22;
        this.collected = false;
    }

    drawExtend(ctx) {
        ctx.filter = 'blur(3px)';

        ctx.beginPath();
        ctx.fillStyle = Colors.getColor("white");
        ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);
        ctx.lineTo(0, 0);
        ctx.fill();
        
        ctx.filter = 'blur(0px)';
    }

    update(deltaTime) {
        this.scale = Math.sin(Date.now() * 0.01) * 0.1 + 1;
    }
}