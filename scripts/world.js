import { columns, rows } from "./main.js";
import { Wall } from "./wall.js";

export let collision_layer;
export let collision_state;

export class World {
    constructor(tile_size, columns, rows) {
        this.tile_size = tile_size;
        this.columns = columns;
        this.rows = rows;
        this.walls = []
    }

    drawGrid(ctx) {
        for(let col = 0; col < this.columns; col++) {
            for(let row = 0; row < this.rows; row++) {
                ctx.strokeRect(
                    this.tile_size * col,
                    this.tile_size * row,
                    this.tile_size,
                    this.tile_size
                );
            }
        }
    }

    createWall({ctx, position, destination, collision, draw_layer, texture}) {

        if(destination) {
            let direction = destination.direction;
            let x1 = destination.x1;
            let x2 = destination.x2;
            

            if(direction === "x") {
                for (let index = 0; index <= x2; index++) {

                    let wall = new Wall({
                        
                        texture: this.texture,
                        position: {x:x1, y:0}
                    });
                    x1++;
                    this.walls.push(wall);
                }
            } else if(direction === "y") {
                for (let index = 0; index <= x2; index++) {

                    let wall = new Wall({
                        position: {x:0, y:x1}
                    });
                    x1++;

                    this.walls.push(wall);
                }
            }
            

            return this.walls; 
        } else if (draw_layer.length != 0) {
            let main_layer = new Array(rows).fill(null).map(() => new Array(columns).fill(0));
            draw_layer.forEach(element => {
                let wall = new Wall({
                    position: {x: element.x, y: element.y}
                })
                wall.draw(ctx);
                walls.push(wall);

                
            });
            return walls;
        }
        
        
    }

    drawWall(ctx) {
        this.walls.forEach(element => {
            element.draw(ctx);
        });
    }

    detectCollision(player, collision, collision_layer) {
        collision.forEach(element => {
            if(collision_layer[player.position.y][20-(rows - player.position.x - 1)]==1) {
                player.player_controller.collision_state = 1;
            } else if (collision_layer[player.position.y][20-(rows - player.position.x + 1)]==1) {
                player.player_controller.collision_state = 3;
            } else if (player.position.y != 0 && collision_layer[player.position.y -1][20-(rows - player.position.x)]==1) {
                player.player_controller.collision_state = 4;
            } else if (player.position.y < rows - 1 && collision_layer[player.position.y + 1][20 - (rows - player.position.x)] == 1) {
                player.player_controller.collision_state = 2;
            }
            else {
                player.player_controller.collision_state = 0;
            }
        });
        
    }

    drawCollisionLayer() {
        return collision_layer = new Array(rows).fill(null).map(() => new Array(columns).fill(0));
    }
}