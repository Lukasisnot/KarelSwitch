import { Vector2 } from "./math.js";
import { Entity } from "./entity.js";
import { Colors } from "./entity.js";
import { Player } from "./player.js";
import { ColorSwitcher } from "./colorSwitcher.js";
import { RingObstacle } from "./ringObstacle.js";
import { ScorePoint } from "./scorePoint.js";
import { ScoreCounter } from "./scoreCounter.js";

// canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = 1080;
const CANVAS_HEIGHT = 1920;
const CANVAS_COLOR = Colors.getColor("gray");

// ctx.filter = 'drop-shadow(0px 0px 5px black)';

// input
const keys = {};
const mousePos = new Vector2();

// delta time
let lastTick = performance.now();
let deltaTime = -1;

// entities
const ui = [];
const map = [];

const OBSTACLES_NUM = 3;
const SWITCHER_NUM = OBSTACLES_NUM - 1;
const OBSTACLES_GAP = CANVAS_HEIGHT * 0.5;

const pl = new Player(new Vector2(CANVAS_WIDTH * 0.5, CANVAS_HEIGHT * 0.8));
const FLW_CAM_BOUNDS = CANVAS_HEIGHT * 0.5;

const scoreCounter = new ScoreCounter(new Vector2(CANVAS_WIDTH * 0.1, CANVAS_HEIGHT * 0.925));

document.addEventListener("mousemove", (event) => {
    mousePos.x = event.clientX;
    mousePos.y = event.clientY;
});

document.addEventListener("keydown", (key) => {
  keys[key.code] = true;
  if (key.code == "Space") {
    pl.start = true;
    pl.jump();
}
});

document.addEventListener("keyup", (key) => {
  keys[key.code] = false;
});

window.onload = () => {
    gameInit();
    window.requestAnimationFrame(gameLoop);
}

const gameInit = () => {
    scoreCounter.score = 0;

    while (ui.shift());
    while (map.shift());
    
    pl.respawn();
    ui.push(scoreCounter);

    for (let i = 0; i < OBSTACLES_NUM; i++) {
        const ring = new RingObstacle(new Vector2(CANVAS_WIDTH * 0.5, CANVAS_HEIGHT * 0.5));
        ring.position.y -= OBSTACLES_GAP * i;
        map.push(ring);

        const point = new ScorePoint(new Vector2(CANVAS_WIDTH * 0.5, CANVAS_HEIGHT * 0.5));
        point.position.y -= OBSTACLES_GAP * i;
        map.push(point);
    }

    for (let i = 0; i < SWITCHER_NUM; i++) {
        const switcher = new ColorSwitcher(new Vector2(CANVAS_WIDTH * 0.5, CANVAS_HEIGHT * 0.25));
        switcher.position.y -= OBSTACLES_GAP * i;
        map.push(switcher);
    }
};

const gameLoop = (now) => {
    resizeCanvas();
    clearCanvas();
    update();
    render();
    calcDeltaTime(now);
    console.log(deltaTime.toFixed(2));
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
    const mapOffset = Math.max(FLW_CAM_BOUNDS - pl.position.y, 0);

    ui.map((entity) => {
        entity.update(deltaTime);
    });

    pl.update(deltaTime);
    pl.position.y += mapOffset;

    map.map((entity, i) => {
        entity.update(deltaTime);
        entity.position.y += mapOffset;
        playerCollision(entity);

        switch (entity.constructor) {
            case ColorSwitcher:
                if (entity.collected) {
                    entity.collected = false;
                    entity.position.y -= OBSTACLES_GAP * SWITCHER_NUM;
                }
                break;

            case ScorePoint:
                if (entity.collected) {
                    entity.collected = false;
                    scoreCounter.score++;
                    entity.position.y -= OBSTACLES_GAP * OBSTACLES_NUM;
                }
                break;
                
            case RingObstacle:
                if (entity.position.y - entity.radius > CANVAS_HEIGHT) {
                    entity.position.y -= OBSTACLES_GAP * OBSTACLES_NUM;
                    entity.randomize();
                }
                break;
        
            default:
                break;
        }
    });

    if (pl.position.y > CANVAS_HEIGHT || pl.isDead) {
        end();
        return;
    }
};

const playerCollision = (entity) => {
    switch (entity.constructor) {
        case ColorSwitcher:
            if (Math.abs(entity.position.y - pl.position.y) < (entity.radius + pl.radius)) {
                pl.regenColor();
                entity.collected = true;
                // console.log("switcher collision!");
            }
            break;

        case ScorePoint:
            if (Math.abs(entity.position.y - pl.position.y) < (entity.radius + pl.radius)) {
                entity.collected = true;
                // console.log("switcher collision!");
            }
            break;

        case RingObstacle:
            // console.log(pl.dead, " pl: ", pl.colorIndex, " top: ", entity.colorTop, " bot: ", entity.colorBottom);
            const offset = entity.position.y - pl.position.y;
                   // outer collision                                 // inner collision
            if (Math.abs(offset) - pl.radius < entity.radius && Math.abs(offset) + pl.radius > entity.radius - entity.thickness) {
                if (offset > 0 && entity.colorTop != pl.colorIndex) { // top collision
                    pl.isDead = true;
                }
                else if (offset < 0 && entity.colorBottom != pl.colorIndex) { // bottom collision
                    pl.isDead = true;
                }
            }
            break;

        default:
            break;
    }
    // console.log(this.dead);
};

const render = () => {
    map.map((entity) => {
        entity.draw(ctx);
    });

    pl.draw(ctx);

    ui.map((entity) => {
        entity.draw(ctx);
    });
};

const calcDeltaTime = (now) => {
    deltaTime = now - lastTick;
    lastTick = now;
};

const end = () => {
    gameInit();
}
