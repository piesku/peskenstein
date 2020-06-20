import {destroy} from "../core.js";
import {Entity, Game} from "../game.js";
import {Has} from "../world.js";

const QUERY = Has.ControlProjectile | Has.Move | Has.Collide;

export function sys_control_projectile(game: Game, delta: number) {
    for (let i = 0; i < game.World.Mask.length; i++) {
        if ((game.World.Mask[i] & QUERY) === QUERY) {
            update(game, i);
        }
    }
}

function update(game: Game, entity: Entity) {
    let move = game.World.Move[entity];
    let collide = game.World.Collide[entity];

    if (collide.Collisions.length > 0) {
        destroy(game.World, entity);
        for (let collision of collide.Collisions) {
            if (game.World.Mask[collision.Other] & Has.Health) {
                let health = game.World.Health[collision.Other];
                health.Damage += 1;
            }
        }
    } else {
        // Always move forward.
        move.Directions.push([0, 0, 1]);
    }
}
