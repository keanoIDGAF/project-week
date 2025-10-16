import { GameObject } from "./game_objects.js";
import { tile_size } from "./main.js";

export class Enemy extends GameObject {
    constructor({position}) {
        super(position);
    }

    draw(ctx) {
        ctx.fillStyle = "red";
        ctx.fillRect(
            tile_size * this.position.x,
            tile_size * this.position.y,
            tile_size,
            tile_size
        )
    }
}