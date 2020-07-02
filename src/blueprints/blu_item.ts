import {Action} from "../actions.js";
import {collide} from "../components/com_collide.js";
import {render_diffuse} from "../components/com_render_diffuse.js";
import {trigger} from "../components/com_trigger.js";
import {Blueprint} from "../core.js";
import {Game, Layer} from "../game.js";

export function blueprint_item(game: Game): Blueprint {
    return {
        Scale: [0.3, 0.3, 0.3],
        Using: [
            collide(false, Layer.None, Layer.Player),
            trigger(Action.CollectItem),
            render_diffuse(game.MaterialDiffuseGouraud, game.MeshCube, [1, 0.3, 1, 1]),
        ],
    };
}
