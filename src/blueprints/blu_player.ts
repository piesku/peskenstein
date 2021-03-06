import {camera} from "../components/com_camera.js";
import {collide} from "../components/com_collide.js";
import {control_player} from "../components/com_control_player.js";
import {move} from "../components/com_move.js";
import {rigid_body} from "../components/com_rigid_body.js";
import {shoot} from "../components/com_shoot.js";
import {Blueprint} from "../core.js";
import {Game, Layer} from "../game.js";

export function blueprint_player(game: Game): Blueprint {
    return {
        Rotation: [0, 1, 0, 0],
        Using: [
            control_player(true, true),
            rigid_body(),
            move(2, 1.3),
            collide(true, Layer.Player, Layer.Terrain | Layer.Enemy, [0.5, 0.5, 0.5]),
            shoot(0.2),
        ],
        Children: [
            {
                Rotation: [0, 1, 0, 0],
                Using: [camera(1, 0.1, 1000)],
            },
        ],
    };
}
