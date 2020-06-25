import {blueprint_wall} from "../blueprints/blu_wall.js";
import {camera} from "../components/com_camera.js";
import {light_directional} from "../components/com_light.js";
import {render_diffuse} from "../components/com_render_diffuse.js";
import {instantiate} from "../core.js";
import {Game} from "../game.js";
import {World} from "../world.js";

export function scene_title(game: Game) {
    game.World = new World();
    game.Camera = undefined;
    game.ViewportResized = true;
    game.Gl.clearColor(0.9, 0.9, 0.9, 1);

    // Camera.
    instantiate(game, {
        Translation: [-1.5, 1, 0],
        Using: [camera(1, 0.1, 1000)],
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
        [0, 0, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 0, 1, 1, 1],
    ];

    const enum TerrainKind {
        Empty,
        Wall,
    }

    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[0].length; x++) {
            switch (map[y][x]) {
                case TerrainKind.Wall:
                    instantiate(game, {
                        ...blueprint_wall(game),
                        Translation: [x - 4.5, 1, y - 4.5],
                    });
                    break;
            }
        }
    }
}
