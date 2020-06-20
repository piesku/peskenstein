import {Entity, Game} from "../game.js";
import {Has} from "../world.js";

export interface Health {
    /** Maximum HP. */
    Max: number;
    /** Current HP remaining. */
    Current: number;
    /** Damage dealt this frame. */
    Damage: number;
}

export function health(max: number) {
    return (game: Game, entity: Entity) => {
        game.World.Mask[entity] |= Has.Health;
        game.World.Health[entity] = {
            Max: max,
            Current: max,
            Damage: 0,
        };
    };
}
