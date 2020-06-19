import {Vec3} from "../../common/math.js";
import {from_axis} from "../../common/quat.js";
import {Entity, Game} from "../game.js";
import {Has} from "../world.js";

const QUERY = Has.Move | Has.ControlPlayer;
const AXIS_Y = <Vec3>[0, 1, 0];

export function sys_control_player(game: Game, delta: number) {
    for (let i = 0; i < game.World.Mask.length; i++) {
        if ((game.World.Mask[i] & QUERY) === QUERY) {
            update(game, i, delta);
        }
    }
}

function update(game: Game, entity: Entity, delta: number) {
    let control = game.World.ControlPlayer[entity];

    if (control.Move) {
        let move = game.World.Move[entity];
        if (game.InputState["KeyW"] || game.InputState["ArrowUp"]) {
            // Move forward
            move.Directions.push([0, 0, 1]);
        }
        if (game.InputState["KeyA"]) {
            // Strafe left
            move.Directions.push([1, 0, 0]);
        }
        if (game.InputState["KeyS"] || game.InputState["ArrowDown"]) {
            // Move backward
            move.Directions.push([0, 0, -1]);
        }
        if (game.InputState["KeyD"]) {
            // Strafe right
            move.Directions.push([-1, 0, 0]);
        }
    }

    if (control.Yaw) {
        // Yaw is applied relative to the entity's local space, so that the Y
        // axis is not affected by its current orientation.
        let move = game.World.Move[entity];
        if (game.InputState["ArrowLeft"]) {
            // Rotate left
            move.LocalRotations.push(from_axis([0, 0, 0, 0], AXIS_Y, Math.PI * control.Yaw));
        }
        if (game.InputState["ArrowRight"]) {
            // Rotate right
            move.LocalRotations.push(from_axis([0, 0, 0, 0], AXIS_Y, -Math.PI * control.Yaw));
        }
    }
}
