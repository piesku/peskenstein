import {Vec3} from "../../common/math.js";
import {Entity, Game} from "../game.js";
import {Has} from "../world.js";

export type Light = LightDirectional;

export const enum LightKind {
    Inactive,
    Directional,
}

export interface LightDirectional {
    Kind: LightKind.Directional;
    Color: Vec3;
    Intensity: number;
}

export function light_directional(color: Vec3 = [1, 1, 1], range: number = 1) {
    return (game: Game, entity: Entity) => {
        game.World.Mask[entity] |= Has.Light;
        game.World.Light[entity] = {
            Kind: LightKind.Directional,
            Color: color,
            Intensity: range ** 2,
        };
    };
}
