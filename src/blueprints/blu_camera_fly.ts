import {camera} from "../components/com_camera.js";
import {collide} from "../components/com_collide.js";
import {control_player} from "../components/com_control_player.js";
import {move} from "../components/com_move.js";
import {shoot} from "../components/com_shoot.js";
import {Blueprint} from "../core.js";
import {Game} from "../game.js";

export function blueprint_camera_fly(game: Game) {
    return <Blueprint>{
        Rotation: [0, 1, 0, 0],
        Using: [control_player(true, true), move(2, 1.3), collide(true), shoot(0.2)],
        Children: [
            {
                Rotation: [0, 1, 0, 0],
                Using: [camera(1, 0.1, 1000)],
            },
        ],
    };
}
