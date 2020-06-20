import {blueprint_camera_fly} from "../blueprints/blu_camera_fly.js";
import {blueprint_enemy} from "../blueprints/blu_enemy.js";
import {blueprint_wall} from "../blueprints/blu_wall.js";
import {light_directional} from "../components/com_light.js";
import {render_diffuse} from "../components/com_render_diffuse.js";
import {instantiate} from "../core.js";
import {Game} from "../game.js";
import {World} from "../world.js";

export function scene_stage(game: Game) {
    game.World = new World();
    game.Camera = undefined;
    game.ViewportResized = true;
    game.Gl.clearColor(0.9, 0.9, 0.9, 1);

    // Camera.
    instantiate(game, {
        Translation: [0, 1, 10],
        ...blueprint_camera_fly(game),
    });

    // Light 1.
    instantiate(game, {
        Translation: [2, 3, 5],
        Using: [light_directional([1, 1, 1], 0.9)],
    });

    // Light 2.
    instantiate(game, {
        Translation: [-1, 1, 1],
        Using: [light_directional([1, 1, 1], 0.4)],
    });

    // Ground.
    instantiate(game, {
        Translation: [0, 0, 0],
        Scale: [100, 1, 100],
        Using: [render_diffuse(game.MaterialDiffuseGouraud, game.MeshCube, [1, 1, 0.3, 1])],
    });

    let map = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 2, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 2, 1, 0, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 2, 1, 0, 1],
        [1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 2, 0, 0, 0, 1],
        [1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
    ];

    const enum TerrainKnd {
        Empty,
        Wall,
        Enemy,
    }

    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[0].length; x++) {
            switch (map[y][x]) {
                case TerrainKnd.Wall:
                    instantiate(game, {
                        ...blueprint_wall(game),
                        Translation: [x - 4.5, 1, y - 4.5],
                    });
                    break;
                case TerrainKnd.Enemy:
                    instantiate(game, {
                        ...blueprint_enemy(game),
                        Translation: [x - 4.5, 1, y - 4.5],
                    });
                    break;
            }
        }
    }
}
