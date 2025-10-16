import { GameObject } from "./game_objects.js";
import { tile_size } from "./main.js";
import { playerController } from "./player_controller.js";

export class Player extends GameObject {
    constructor({position, player_controller}) {
        
        super(position, player_controller);
        this.player_controller = new playerController(this);
    }

    draw(ctx) {
        ctx.fillStyle = "green";
        ctx.fillRect(
            tile_size * this.position.x,
            tile_size * this.position.y,
            tile_size,
            tile_size
        )
    }
}