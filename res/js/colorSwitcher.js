import { Entity } from "./entity.js";
import { Vector2 } from "./math.js";

export class ColorSwitcher extends Entity {
    constructor(pos = new Vector2(0, 0), size = 5) {
        super(pos);
        this.size = size;
    }
}