import { Vector2 } from "./math.js";

export class Entity {

    constructor(pos = new Vector2(0, 0), path = "") {
        this.img = new Image();
        this.img.src = path;
        this.position = pos;
        this.rotation = 0;
        this.scale = 1;
    }

    drawExtend(ctx) {}

    update(deltaTime) {}

    draw(ctx) {
        ctx.translate(this.position.x, this.position.y);
        ctx.scale(this.scale, this.scale);
        ctx.rotate(this.rotation);

        if (this.img.src != "") {
            ctx.drawImage(this.img, -this.img.width / 2, -this.img.height / 2, this.img.width, this.img.height);
        } 
        this.drawExtend(ctx);

        ctx.rotate(-this.rotation);
        ctx.scale(1 / this.scale, 1 / this.scale);
        ctx.translate(-this.position.x, -this.position.y);
    }
}

export class Colors {
    static getColor(i) {
        switch (i) {
            case 0:
            case "blue":
                return "rgb(112, 112, 243)";

            case 1:
            case "green":
                return "rgb(112, 243, 178)";
            
            case 2:
            case "red":
                return "rgb(243, 112, 177)";

            case 3:
            case "yellow":
                return "rgb(242,243,112)";
        
            default:
                console.error("invalid color value");
                break;
        }
    }
}