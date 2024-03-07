import { Vector2 } from "./math.js";

export class Colors {
    static getColor(i) {
        switch (i) {
            case 0:
            case "folly":
                return "rgb(255, 67, 101)"; // folly
                    
            case 1:
            case "turquoise":
                return "rgb(0, 217, 192)"; // turquoise

            case 2:
            case "black":
                return "rgb(3, 3, 1)"; // black

            case 3:
            case "khaki":
                return "rgb(183, 173, 153)"; // khaki
        
            default:
                console.error("invalid color value");
                break;
        }
    }
}

export class Entity {

    constructor(pos = new Vector2(0, 0), path = "") {
        this.img = new Image();
        this.img.src = path;
        this.position = pos;
        this.size = new Vector2(this.img.width, this.img.height);
        this.rotation = 0;
    }

    drawExtend(ctx) {}

    update(deltaTime) {}

    draw(ctx) {
        let ctxTranslation = new Vector2(this.position.x + this.size.x / 2, this.position.y + this.size.y / 2);
        ctx.translate(ctxTranslation.x, ctxTranslation.y);
        ctx.rotate(this.rotation);

        if (this.img.src != "") {
            ctx.drawImage(this.img, -this.size.x / 2, -this.size.y / 2, this.size.x, this.size.y);
        } 
        this.drawExtend(ctx);

        ctx.rotate(-this.rotation);
        ctx.translate(-ctxTranslation.x, -ctxTranslation.y);    
    }

    setSize(size = new Vector2(1, 1)) {
        this.size = new Vector2(this.img.width * size.x, this.img.height * size.y);
    }
}