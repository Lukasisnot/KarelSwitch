import { Vector2 } from "./math.js";
import { Entity } from "./entity.js";
import { Colors } from "./entity.js";
import { Player } from "./player.js";
import { ColorSwitcher } from "./colorSwitcher.js";

// canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = 1080;
const CANVAS_HEIGHT = 1920;
const CANVAS_COLOR = "rgb(25, 25, 25)";

// input
const keys = {};
const mousePos = new Vector2();

// delta time
let lastTick = performance.now();
let deltaTime = -1;

// entities
const plAndUI = [];
const map = [];

const switcher = new ColorSwitcher(new Vector2(CANVAS_WIDTH * 0.5, CANVAS_HEIGHT * 0.25))
map.push(switcher);

const pl = new Player(new Vector2(CANVAS_WIDTH * 0.5, CANVAS_HEIGHT * 0.75));
plAndUI.push(pl);
let plMoveYBounds = CANVAS_HEIGHT * 0.5;

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
    pl.start = true;
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