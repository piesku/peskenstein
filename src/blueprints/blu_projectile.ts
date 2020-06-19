import {lifespan} from "../components/com_lifespan.js";
import {render_diffuse} from "../components/com_render_diffuse.js";
import {Blueprint} from "../core.js";
import {Game} from "../game.js";

export function blueprint_projectile(game: Game): Blueprint {
    return {
        Scale: [0.1, 0.1, 0.1],
        Using: [
            render_diffuse(game.MaterialDiffuseGouraud, game.MeshCube, [0.3, 1, 1, 1]),
            lifespan(5),
        ],
    };
}
