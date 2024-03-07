import { Vector2 } from "./math.js";
import { Entity } from "./entity.js";
import { Colors } from "./entity.js";
import { Player } from "./player.js";
import { ColorSwitcher } from "./colorSwitcher.js";

//canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = 1080;
const CANVAS_HEIGHT = 1920;
const CANVAS_COLOR = "rgb(25, 25, 25)";

const keys = {};
const mousePos = new Vector2(0, 0);

//delta time
let lastTick = performance.now();
let deltaTime;

///////////////////
const plAndUI = [];
const map = [];

const test = new Entity(new Vector2(0, -500), "./res/img/img.png");
test.setSize(new Vector2(6, 6));
map.push(test);

const pl = new Player(new Vector2(CANVAS_WIDTH * .5, 750));
plAndUI.push(pl);
let plMoveYBounds = 900;

document.addEventListener("mousemove", (event) => {
    mousePos.x = event.clientX;
    mousePos.y = event.clientY;
});

document.addEventListener("keydown", (key) => {
  keys[key.code] = true;
  if (key.code == "Space") pl.jump();
});

document.addEventListener("keyup", (key) => {
  keys[key.code] = false;
});

window.onload = () => {
    window.requestAnimationFrame(gameLoop);
}

const gameLoop = (now) => {
    resizeCanvas();

    clearCanvas();

    update();

    render();

    calcDeltaTime(now);

    window.requestAnimationFrame(gameLoop);
};

window.onclick = () => {
    pl.jump();
}

const resizeCanvas = () => {
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
};

const clearCanvas =  () => {
    resizeCanvas(); 
    ctx.fillStyle = CANVAS_COLOR;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
};

const update = () => {
    const mapOffset = Math.max(plMoveYBounds - pl.position.y, 0);

    plAndUI.map((entity) => {
        entity.update(deltaTime);
        entity.position.y += mapOffset;
    });

    map.map((entity) => {
        entity.update(deltaTime);
        entity.position.y += mapOffset;

        // collision detection
        pl.collision(entity);
        
    });

    // temporary ending
    if (pl.position.y > CANVAS_HEIGHT) window.location.reload();
};

const render = () => {
    map.map((entity) => {
        entity.draw(ctx);

    });

    plAndUI.map((entity) => {
        entity.draw(ctx);
    });
};

const calcDeltaTime = (now) => {
    deltaTime = now - lastTick;
    lastTick = now;
};