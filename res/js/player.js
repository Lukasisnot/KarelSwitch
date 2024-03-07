import { Entity } from "./entity.js";
import { Colors } from "./entity.js";
import { Vector2 } from "./math.js";
import { Rand } from "./math.js";

export class Player extends Entity {
    constructor(pos = new Vector2(0, 0), path) {
        super(pos, path);
        this.jumpPow = 135;
        this.gravityPow = 7;
        this.maxVelocity = 200;
        this.velocity = 0;
        this.size = 30;
        this.color = "";
        this.regenColor();
    }

    drawExtend(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    }

    update(deltaTime = 1) {
        this.gravity();
        this.position.y += this.velocity * deltaTime * .01;
    }

    jump() {
        this.velocity = -this.jumpPow;
    }

    gravity() {
        if (this.velocity < this.maxVelocity) this.velocity += this.gravityPow;
    }

    regenColor() {
        let newColor = this.color;
        while (newColor == this.color) newColor = Colors.getColor(Rand.getRandNum(0, 1));
        this.color = newColor;
    }

    collision(entity) {
        switch (typeof entity) {
            case typeof ColorSwitcher:
                if (Math.abs(entity.position.y - this.position.y) < (entity.size + this.size)) this.regenColor();
                break;
            default:
                break;
        }
    }

}