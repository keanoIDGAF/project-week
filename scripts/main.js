import { playerController } from "./player_controller.js";
import { Player } from "./player.js";
import { World } from "./world.js";
import { Wall } from "./wall.js";
import { Enemy } from "./enemy.js";

// Globally shared variables
export let tile_size;
export let rows;
export let columns; 
export let game_width;
export let game_height;

window.addEventListener('load', function () {
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');

    class Game {
        constructor(tile_size_v, rows_v, columns_v) {
            // Game grid setup
            this.tile_size = tile_size_v ?? 32;
            this.columns = columns_v ?? 20;
            this.rows = rows_v ?? 20;

            this.game_widtho = this.columns * this.tile_size;
            this.game_heighto = this.rows * this.tile_size;

            // Export values globally
            tile_size = this.tile_size;
            rows = this.rows;
            columns = this.columns;
            game_width = this.game_widtho;
            game_height = this.game_heighto;

            // Canvas dimensions
            canvas.width = this.game_widtho;
            canvas.height = this.game_heighto;

            // Game world setup
            this.world = new World(this.tile_size, this.columns, this.rows);
            this.world.drawGrid(ctx);

            // Player setup
            this.player = new Player({
                position: { x: 0, y: 5 }
            });

            // Enemy setup
            this.enemy = new Enemy({
                position: { x: 10, y: 5 }
            });

            // Player controller
            this.player_controller = this.player.player_controller;

            // Collision tracking
            this.world.collisions = [];
            this.collision_layer = null; // Initialize collision_layer

            // Create walls and get collision layer
            this.world.collisions = this.world.createWall({
                ctx: ctx,
                collision: true,
                destination: {
                    direction: "y",
                    x1: 0,
                    x2: 5
                },
                texture: "./images/spider.png"
                // draw_layer: [{x: 0, y:5}, {x:2, y:10}, {x:19,y:19 }]
            });

            // Start update loop
            requestAnimationFrame(() => this.update(ctx));
        }

        update(ctx) {
            // Keep update loop running
            requestAnimationFrame(() => this.update(ctx));

            // Clear canvas
            ctx.clearRect(0, 0, game_width, game_height);
                
            
            

            this.world.drawWall(ctx);

            this.collision_layer = this.world.drawCollisionLayer();
            // console.log(this.collision_layer);

            if (this.collision_layer) {
                // Mark player's position in collision layer
                this.collision_layer[this.player.position.y][20 - (rows - this.player.position.x)] = 2;

                // Adjust nearby tiles
                for (let y = 0; y < this.collision_layer.length; y++) {
                    for (let x = 0; x < this.collision_layer[y].length; x++) {
                        if (
                            y >= 0 &&
                            y < this.rows &&
                            x - 1 >= 0 &&
                            this.collision_layer[y][x - 1] === 1
                        ) {
                            this.collision_layer[y][x] = 0;
                        }
                    }
                }

                // Add enemy to collisions and mark in layer
                this.world.collisions.push(this.enemy);

                this.world.collisions.forEach((element, i) => {
                    this.collision_layer[element.position.y][20 - (rows - element.position.x)] = 1;
                });

                // Detect collisions
                this.world.detectCollision(this.player, this.world.collisions, this.collision_layer);
            }

            // Draw everything
            this.player.draw(ctx);
            this.enemy.draw(ctx);
            this.world.drawGrid(ctx);
        }
    }

    // Initialize game
    const game = new Game(32, 20, 20);
});
