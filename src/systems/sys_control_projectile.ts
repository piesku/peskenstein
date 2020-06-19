import {Entity, Game} from "../game.js";
import {Has} from "../world.js";

const QUERY = Has.ControlProjectile | Has.Move;

export function sys_control_projectile(game: Game, delta: number) {
    for (let i = 0; i < game.World.Mask.length; i++) {
        if ((game.World.Mask[i] & QUERY) === QUERY) {
            update(game, i);
        }
    }
}

function update(game: Game, entity: Entity) {
    let move = game.World.Move[entity];

    // Always move forward.
    move.Directions.push([0, 0, 1]);
}
