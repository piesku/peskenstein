import {GL_CULL_FACE, GL_DEPTH_TEST} from "../common/webgl.js";
import {mat1_basic_wireframe} from "../materials/mat1_basic_wireframe.js";
import {mat1_diffuse_gouraud} from "../materials/mat1_diffuse_gouraud.js";
import {mesh_cube} from "../meshes/cube.js";
import {Camera} from "./components/com_camera.js";
import {loop_start, loop_stop} from "./core.js";
import {sys_camera} from "./systems/sys_camera.js";
import {sys_collide} from "./systems/sys_collide.js";
import {sys_control_player} from "./systems/sys_control_player.js";
import {sys_control_projectile} from "./systems/sys_control_projectile.js";
import {sys_debug} from "./systems/sys_debug.js";
import {sys_framerate} from "./systems/sys_framerate.js";
import {sys_health} from "./systems/sys_health.js";
import {sys_lifespan} from "./systems/sys_lifespan.js";
import {sys_light} from "./systems/sys_light.js";
import {sys_move} from "./systems/sys_move.js";
import {sys_physics} from "./systems/sys_physics.js";
import {sys_render} from "./systems/sys_render.js";
import {sys_shoot} from "./systems/sys_shoot.js";
import {sys_transform} from "./systems/sys_transform.js";
import {sys_trigger} from "./systems/sys_trigger.js";
import {World} from "./world.js";

export type Entity = number;

export class Game {
    World = new World();

    ViewportWidth = 0;
    ViewportHeight = 0;
    ViewportResized = false;

    InputState: Record<string, number> = {};
    InputDelta: Record<string, number> = {};

    Ui = document.querySelector("main")!;
    CanvasScene = document.querySelector("canvas#scene")! as HTMLCanvasElement;
    Gl = this.CanvasScene.getContext("webgl")!;
    ExtVao = this.Gl.getExtension("OES_vertex_array_object")!;

    MaterialWireframe = mat1_basic_wireframe(this.Gl);
    MaterialDiffuseGouraud = mat1_diffuse_gouraud(this.Gl);
    MeshCube = mesh_cube(this.Gl);

    Camera?: Camera;
    // The rendering pipeline supports 8 lights.
    LightPositions = new Float32Array(4 * 8);
    LightDetails = new Float32Array(4 * 8);

    constructor() {
        document.addEventListener("visibilitychange", () =>
            document.hidden ? loop_stop() : loop_start(this)
        );

        window.addEventListener("keydown", (evt) => {
            if (!evt.repeat) {
                this.InputState[evt.code] = 1;
                this.InputDelta[evt.code] = 1;
            }
        });
        window.addEventListener("keyup", (evt) => {
            this.InputState[evt.code] = 0;
            this.InputDelta[evt.code] = -1;
        });

        this.Gl.enable(GL_DEPTH_TEST);
        this.Gl.enable(GL_CULL_FACE);
    }

    FrameReset() {
        this.ViewportResized = false;
        for (let name in this.InputDelta) {
            this.InputDelta[name] = 0;
        }
    }

    FrameUpdate(delta: number) {
        let now = performance.now();
        sys_lifespan(this, delta);
        sys_control_player(this, delta);
        sys_control_projectile(this, delta);
        sys_health(this, delta);
        sys_shoot(this, delta);
        sys_move(this, delta);
        sys_transform(this, delta);
        sys_collide(this, delta);
        sys_trigger(this, delta);
        sys_physics(this, delta);
        sys_transform(this, delta);
        sys_camera(this, delta);
        sys_light(this, delta);
        sys_render(this, delta);

        true && sys_debug(this, delta);
        true && sys_framerate(this, delta, performance.now() - now);
    }
}
