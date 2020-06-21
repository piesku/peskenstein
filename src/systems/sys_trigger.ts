import {dispatch} from "../actions.js";
import {Entity, Game} from "../game.js";
import {Has} from "../world.js";

const QUERY = Has.Transform | Has.Collide | Has.Trigger;

export function sys_trigger(game: Game, delta: number) {
    for (let i = 0; i < game.World.Mask.length; i++) {
        if ((game.World.Mask[i] & QUERY) === QUERY) {
            update(game, i);
        }
    }
}

function update(game: Game, entity: Entity) {
    let collide = game.World.Collide[entity];
    if (collide.Collisions.length > 0) {
        let trigger = game.World.Trigger[entity];
        dispatch(game, trigger.Action, entity);
    }
}
