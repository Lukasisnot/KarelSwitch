import { Entity } from "./entity.js";
import { Vector2 } from "./math.js";
import { Waves } from "./math.js";
import { Colors } from "./entity.js";

export class RingObstacle extends Entity {
    constructor(pos = new Vector2()) {
        super(pos);
        this.radius = 250;
        this.thickness = 40;
        this.speed = 15;
    }

    drawExtend(ctx) {
        ctx.beginPath();
        ctx.fillStyle = Colors.getColor(0);
        ctx.arc(0, 0, this.radius, 0, 0.5 * Math.PI);
        ctx.lineTo(0, this.radius - this.thickness);
        ctx.arc(0, 0, this.radius - this.thickness, 0.5 * Math.PI, 0, true);
        ctx.lineTo(this.radius, 0);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = Colors.getColor(3);
        ctx.arc(0, 0, this.radius, 0.5 * Math.PI, Math.PI);
        ctx.lineTo(-this.radius, 0);
        ctx.arc(0, 0, this.radius - this.thickness, Math.PI, 0.5 * Math.PI, true);
        ctx.lineTo(0, this.radius - this.thickness);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = Colors.getColor(2);
        ctx.arc(0, 0, this.radius, Math.PI, 1.5 * Math.PI);
        ctx.lineTo(0, -this.radius);
        ctx.arc(0, 0, this.radius - this.thickness, 1.5 * Math.PI, Math.PI, true);
        ctx.lineTo(-this.radius, 0);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = Colors.getColor(1);
        ctx.arc(0, 0, this.radius, 1.5 * Math.PI, 2 * Math.PI);
        ctx.lineTo(this.radius - this.thickness, 0);
        ctx.arc(0, 0, this.radius - this.thickness, 2 * Math.PI, 1.5 * Math.PI, true);
        ctx.lineTo(0, -this.radius);
        ctx.fill();
    }

    update(deltaTime) {
        this.rotation += this.speed * deltaTime * .0001;
        if (this.rotation > 2 * Math.PI) this.rotation = 0;

        this.colorBottom = Math.floor(this.rotation / (Math.PI / 2));
        this.colorTop = Math.floor((Waves.saw(this.rotation) + Math.PI) / (Math.PI / 2));
    }
}