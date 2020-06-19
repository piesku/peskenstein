import {control_projectile} from "../components/com_control_projectile.js";
import {lifespan} from "../components/com_lifespan.js";
import {move} from "../components/com_move.js";
import {render_diffuse} from "../components/com_render_diffuse.js";
import {Blueprint} from "../core.js";
import {Game} from "../game.js";

export function blueprint_projectile(game: Game): Blueprint {
    return {
        Scale: [0.1, 0.1, 0.1],
        Using: [
            control_projectile(),
            move(5, 0),
            lifespan(3),
            render_diffuse(game.MaterialDiffuseGouraud, game.MeshCube, [0.3, 1, 1, 1]),
        ],
    };
}
