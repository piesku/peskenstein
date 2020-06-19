import {get_rotation, get_translation} from "../../common/mat4.js";
import {render_diffuse} from "../components/com_render_diffuse.js";
import {instantiate} from "../core.js";
import {Entity, Game} from "../game.js";
import {Has} from "../world.js";

const QUERY = Has.Transform | Has.Shoot;

export function sys_shoot(game: Game, delta: number) {
    for (let i = 0; i < game.World.Mask.length; i++) {
        if ((game.World.Mask[i] & QUERY) === QUERY) {
            update(game, i);
        }
    }
}

function update(game: Game, entity: Entity) {
    let shoot = game.World.Shoot[entity];
    if (shoot.Trigger) {
        shoot.Trigger = false;

        let shooter_transform = game.World.Transform[entity];
        let projectile = instantiate(game, {
            Scale: [0.1, 0.1, 0.1],
            Using: [render_diffuse(game.MaterialDiffuseGouraud, game.MeshCube, [0.3, 1, 1, 1])],
        });
        let projectile_transform = game.World.Transform[projectile];
        get_translation(projectile_transform.Translation, shooter_transform.World);
        get_rotation(projectile_transform.Rotation, shooter_transform.World);
    }
}
