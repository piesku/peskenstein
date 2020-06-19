import {get_rotation, get_translation} from "../../common/mat4.js";
import {blueprint_projectile} from "../blueprints/blu_projectile.js";
import {instantiate} from "../core.js";
import {Entity, Game} from "../game.js";
import {Has} from "../world.js";

const QUERY = Has.Transform | Has.Shoot;

export function sys_shoot(game: Game, delta: number) {
    for (let i = 0; i < game.World.Mask.length; i++) {
        if ((game.World.Mask[i] & QUERY) === QUERY) {
            update(game, i, delta);
        }
    }
}

function update(game: Game, entity: Entity, delta: number) {
    let shoot = game.World.Shoot[entity];
    shoot.SinceLast += delta;

    if (shoot.Trigger) {
        shoot.Trigger = false;
        if (shoot.SinceLast > shoot.Frequency) {
            shoot.SinceLast = 0;

            let shooter_transform = game.World.Transform[entity];
            let projectile = instantiate(game, blueprint_projectile(game));
            let projectile_transform = game.World.Transform[projectile];
            get_translation(projectile_transform.Translation, shooter_transform.World);
            get_rotation(projectile_transform.Rotation, shooter_transform.World);
        }
    }
}
