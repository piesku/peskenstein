import {Action} from "../actions.js";
import {collide, CollisionLayer} from "../components/com_collide.js";
import {render_diffuse} from "../components/com_render_diffuse.js";
import {trigger} from "../components/com_trigger.js";
import {Blueprint} from "../core.js";
import {Game} from "../game.js";

export function blueprint_item(game: Game): Blueprint {
    return {
        Scale: [0.3, 0.3, 0.3],
        Using: [
            collide(false, CollisionLayer.None, CollisionLayer.Player),
            trigger(Action.CollectItem),
            render_diffuse(game.MaterialDiffuseGouraud, game.MeshCube, [1, 0.3, 1, 1]),
        ],
    };
}
