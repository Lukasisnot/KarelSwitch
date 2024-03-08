import { ColorSwitcher } from "./colorSwitcher.js";
import { Entity } from "./entity.js";
import { Colors } from "./entity.js";
import { Vector2, Waves } from "./math.js";
import { Rand } from "./math.js";
import { RingObstacle } from "./ringObstacle.js";

export class Player extends Entity {
    constructor(pos = new Vector2(0, 0), path) {
        super(pos, path);
        this.jumpPow = 125;
        this.gravityPow = 7;
        this.maxVelocity = 200;
        this.velocity = 0;
        this.radius = 25;
        this.color = "";
        this.regenColor();
        this.start = false;
        this.dead = false;
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
        let index = 0;
        while (newColor == this.color) {
            index = Rand.getRandNum(0, 3);
            newColor = Colors.getColor(index);
        }
        this.colorIndex = index;
        this.color = newColor;
    }

    collision(entity) {
        switch (entity.constructor) {
            case ColorSwitcher:
                if (Math.abs(entity.position.y - this.position.y) < (entity.radius + this.radius)) {
                    this.regenColor();
                    entity.collected = true;
                    // console.log("switcher collision!");
                }
                break;

            case RingObstacle:
                // console.log(this.dead, " this: ", this.colorIndex, " top: ", entity.colorTop, " bot: ", entity.colorBottom);
                const offset = entity.position.y - this.position.y;
                       // outer collision                                 // inner collision
                if (Math.abs(offset) - this.radius < entity.radius && Math.abs(offset) + this.radius > entity.radius - entity.thickness) {
                    if (offset > 0 && entity.colorTop != this.colorIndex) { // top collision
                        this.dead = true;
                    }
                    else if (offset < 0 && entity.colorBottom != this.colorIndex) { // bottom collision
                        this.dead = true;
                    }
                }
                break;
            default:
                break;
        }
        // console.log(this.dead);
    }

}