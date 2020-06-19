import {Entity, Game} from "../game.js";
import {Has} from "../world.js";

export interface Shoot {
    Trigger: boolean;
}

export function shoot() {
    return (game: Game, entity: Entity) => {
        game.World.Mask[entity] |= Has.Shoot;
        game.World.Shoot[entity] = {
            Trigger: false,
        };
    };
}
