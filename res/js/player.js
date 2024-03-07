import { ColorSwitcher } from "./colorSwitcher.js";
import { Entity } from "./entity.js";
import { Colors } from "./entity.js";
import { Vector2 } from "./math.js";
import { Rand } from "./math.js";

export class Player extends Entity {
    constructor(pos = new Vector2(0, 0), path) {
        super(pos, path);
        this.jumpPow = 125;
        this.gravityPow = 7;
        this.maxVelocity = 200;
        this.velocity = 0;
        this.radius = 20;
        this.color = "";
        this.regenColor();

        this.start = false;
    }

    drawExtend(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }

    update(deltaTime = 1) {
        if (!this.start) return;
        this.gravity();
        this.position.y += (this.velocity * deltaTime * .01);
    }

    jump() {
        this.velocity = -this.jumpPow;
    }

    gravity() {
        if (this.velocity < this.maxVelocity) this.velocity += this.gravityPow;
    }

    regenColor() {
        let newColor = this.color;
        while (newColor == this.color) newColor = Colors.getColor(Rand.getRandNum(0, 3));
        this.color = newColor;
    }

    collision(entity) {
        switch (entity.constructor) {
            case ColorSwitcher:
                if (Math.abs(entity.position.y - this.position.y) < (entity.radius + this.radius)) {
                    this.regenColor();
                    entity.position.y -= 750;
                    console.log("switcher collision!");
                }
                break;
            default:
                break;
        }
    }

}