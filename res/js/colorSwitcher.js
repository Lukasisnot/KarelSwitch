import { Entity } from "./entity.js";
import { Vector2 } from "./math.js";
import { Colors } from "./entity.js";

export class ColorSwitcher extends Entity {
    constructor(pos = new Vector2(0, 0)) {
        super(pos);
        this.radius = 30;
    }

    drawExtend(ctx) {
        ctx.beginPath();
        ctx.fillStyle = Colors.getColor(0);
        ctx.arc(0, 0, this.radius, 0, 0.5 * Math.PI);
        ctx.lineTo(0, 0);
        ctx.fill();
        
        ctx.beginPath();
        ctx.fillStyle = Colors.getColor(1);
        ctx.arc(0, 0, this.radius, 0.5 * Math.PI, Math.PI);
        ctx.lineTo(0, 0);
        ctx.fill();
        
        ctx.beginPath();
        ctx.fillStyle = Colors.getColor(2);
        ctx.arc(0, 0, this.radius, Math.PI, 1.5 * Math.PI);
        ctx.lineTo(0, 0);
        ctx.fill();
        
        ctx.beginPath();
        ctx.fillStyle = Colors.getColor(3);
        ctx.arc(0, 0, this.radius, 1.5 * Math.PI, 2 * Math.PI);
        ctx.lineTo(0, 0);
        ctx.fill();
    }

    update(deltaTime) {
        this.rotation += deltaTime / 500;
    }
}