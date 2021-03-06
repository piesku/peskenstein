import {AABB} from "../../common/aabb.js";
import {Vec3} from "../../common/math.js";
import {Entity, Game, Layer} from "../game.js";
import {Has} from "../world.js";

export interface Collide extends AABB {
    readonly Entity: Entity;
    New: boolean;
    /**
     * Dynamic colliders collide with all colliders. Static colliders collide
     * only with dynamic colliders.
     */
    Dynamic: boolean;
    /** Collisions detected with this collider during this tick. */
    Collisions: Array<Collision>;
    Layers: Layer;
    IntersectWith: Layer;
}

export function collide(
    dynamic: boolean = true,
    layers = Layer.None,
    intersect_with = Layer.None,
    size: [number, number, number] = [1, 1, 1]
) {
    return (game: Game, entity: Entity) => {
        game.World.Mask[entity] |= Has.Collide;
        game.World.Collide[entity] = {
            Entity: entity,
            New: true,
            Dynamic: dynamic,
            Size: size,
            Min: [0, 0, 0],
            Max: [0, 0, 0],
            Center: [0, 0, 0],
            Half: [0, 0, 0],
            Collisions: [],
            Layers: layers,
            IntersectWith: intersect_with,
        };
    };
}

export interface Collision {
    /** The other entity in the collision. */
    Other: Entity;
    /** The direction and magnitude of the hit from this collider's POV. */
    Hit: Vec3;
}
