import {destroy} from "../core.js";
import {Entity, Game} from "../game.js";
import {Has} from "../world.js";

const QUERY = Has.Health;

export function sys_health(game: Game, delta: number) {
    for (let i = 0; i < game.World.Mask.length; i++) {
        if ((game.World.Mask[i] & QUERY) == QUERY) {
            update(game, i);
        }
    }
}

function update(game: Game, entity: Entity) {
    let health = game.World.Health[entity];
    if (health.Damage) {
        health.Current -= health.Damage;
        health.Damage = 0;
    }
    if (health.Current <= 0) {
        destroy(game.World, entity);
    }
}
