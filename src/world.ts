import {Camera} from "./components/com_camera.js";
import {Collide} from "./components/com_collide.js";
import {ControlPlayer} from "./components/com_control_player.js";
import {Health} from "./components/com_health.js";
import {Lifespan} from "./components/com_lifespan.js";
import {Light} from "./components/com_light.js";
import {Move} from "./components/com_move.js";
import {Render} from "./components/com_render.js";
import {Shoot} from "./components/com_shoot.js";
import {Transform} from "./components/com_transform.js";
import {Trigger} from "./components/com_trigger.js";

const enum Component {
    Camera,
    Collide,
    ControlPlayer,
    ControlProjectile,
    Health,
    Lifespan,
    Light,
    Move,
    Render,
    Shoot,
    Transform,
    Trigger,
}

export const enum Has {
    Camera = 1 << Component.Camera,
    Collide = 1 << Component.Collide,
    ControlPlayer = 1 << Component.ControlPlayer,
    ControlProjectile = 1 << Component.ControlProjectile,
    Health = 1 << Component.Health,
    Lifespan = 1 << Component.Lifespan,
    Light = 1 << Component.Light,
    Move = 1 << Component.Move,
    Render = 1 << Component.Render,
    Shoot = 1 << Component.Shoot,
    Transform = 1 << Component.Transform,
    Trigger = 1 << Component.Trigger,
}

export class World {
    // Component flags
    Mask: Array<number> = [];
    // Component data
    Camera: Array<Camera> = [];
    Collide: Array<Collide> = [];
    ControlPlayer: Array<ControlPlayer> = [];
    Health: Array<Health> = [];
    Lifespan: Array<Lifespan> = [];
    Light: Array<Light> = [];
    Move: Array<Move> = [];
    Render: Array<Render> = [];
    Shoot: Array<Shoot> = [];
    Transform: Array<Transform> = [];
    Trigger: Array<Trigger> = [];
}
