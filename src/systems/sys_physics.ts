import {add} from "../../common/vec3.js";
import {Entity, Game} from "../game.js";
import {Has} from "../world.js";

const QUERY = Has.Transform | Has.Collide | Has.RigidBody;

export function sys_physics(game: Game, delta: number) {
    for (let i = 0; i < game.World.Mask.length; i++) {
        if ((game.World.Mask[i] & QUERY) == QUERY) {
            update(game, i);
        }
    }
}

function update(game: Game, entity: Entity) {
    let transform = game.World.Transform[entity];
    let collide = game.World.Collide[entity];
    for (let collision of collide.Collisions) {
        add(transform.Translation, transform.Translation, collision.Hit);
        transform.Dirty = true;
    }
}
