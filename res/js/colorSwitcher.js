import { Entity } from "./entity.js";
import { Vector2 } from "./math.js";
import { Colors } from "./entity.js";

export class ColorSwitcher extends Entity {
    constructor(pos = new Vector2()) {
        super(pos);
        this.radius = 25;
        this.collected = false;
    }

    drawExtend(ctx) {
        // ctx.filter = 'blur(7px)';
        ctx.filter = 'drop-shadow(0px 0px 5px black)';

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

        // ctx.filter = 'blur(0px)';
    }

    update(deltaTime) {
        this.scale = Math.sin(Date.now() * 0.01) * 0.1 + 1;
        this.rotation += deltaTime * -.002;
    }
}