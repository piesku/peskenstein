import {render_diffuse} from "../components/com_render_diffuse.js";
import {Blueprint} from "../core.js";
import {Game} from "../game.js";

export function blueprint_enemy(game: Game): Blueprint {
    return {
        Children: [
            {
                Translation: [0, -0.15, 0],
                Scale: [0.3, 0.7, 0.3],
                Using: [
                    render_diffuse(game.MaterialDiffuseGouraud, game.MeshCube, [1, 0.3, 0.3, 1]),
                ],
            },
        ],
    };
}
