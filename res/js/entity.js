import { Vector2 } from "./math.js";

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
        let ctxTranslation = new Vector2(this.position.x, this.position.y);
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

export class Colors {
    static getColor(i) {
        switch (i) {
            case 0:
            case "green":
                return "rgb(112, 243, 178)";
                    
            case 1:
            case "blue":
                return "rgb(112, 112, 243)";

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