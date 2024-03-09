import { ColorSwitcher } from "./colorSwitcher.js";
import { Entity } from "./entity.js";
import { Colors } from "./entity.js";
import { Vector2, Waves } from "./math.js";
import { Rand } from "./math.js";
import { RingObstacle } from "./ringObstacle.js";

export class Player extends Entity {
    constructor(pos = new Vector2(0, 0), path) {
        super(pos, path);
        this.spawnPos = Object.assign({}, pos);
        this.jumpPow = 125;
        this.gravityPow = 7;
        this.maxVelocity = 200;
        this.radius = 25;
        this.velocity = 0;
        this.color = "";
        this.regenColor();
        this.start = false;
        this.isDead = false;
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

    respawn() {
        this.start = false;
        this.isDead = false;
        this.velocity = 0;
        this.color = "";
        this.regenColor();
        this.position = new Vector2(this.spawnPos.x, this.spawnPos.y);
    }

}