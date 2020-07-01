import {light_directional} from "../components/com_light.js";
import {render_diffuse} from "../components/com_render_diffuse.js";
import {instantiate} from "../core.js";
import {Game} from "../game.js";
import {World} from "../world.js";
import {build_level, LevelMap} from "./maps.js";

export function scene_title(game: Game, map: LevelMap) {
    game.World = new World();
    game.Camera = undefined;
    game.ViewportResized = true;
    game.Gl.clearColor(0.9, 0.9, 0.9, 1);

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

    build_level(game, map);
}
