import {Entity, Game} from "../game.js";
import {Has} from "../world.js";

export interface ControlPlayer {
    Move: boolean;
    Yaw: boolean;
}

/**
 * The ControlPlayer mixin.
 *
 * @param Move - Whether to control the entity's movement.
 * @param Yaw - Whether to control the entity's yaw.
 */
export function control_player(move: boolean, yaw: boolean) {
    return (game: Game, entity: Entity) => {
        game.World.Mask[entity] |= Has.ControlPlayer;
        game.World.ControlPlayer[entity] = {
            Move: move,
            Yaw: yaw,
        };
    };
}
