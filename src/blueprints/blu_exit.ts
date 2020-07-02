import {Action} from "../actions.js";
import {collide} from "../components/com_collide.js";
import {render_basic} from "../components/com_render_basic.js";
import {trigger} from "../components/com_trigger.js";
import {Blueprint} from "../core.js";
import {Game, Layer} from "../game.js";

export function blueprint_exit(game: Game): Blueprint {
    return {
        Scale: [0.5, 0.5, 0.5],
        Using: [
            collide(false, Layer.None, Layer.Player),
            trigger(Action.Exit),
            render_basic(game.MaterialWireframe, game.MeshCube, [1, 1, 1, 1]),
        ],
    };
}
