import {Action} from "../actions.js";
import {animate, AnimationFlag} from "../components/com_animate.js";
import {collide} from "../components/com_collide.js";
import {render_diffuse} from "../components/com_render_diffuse.js";
import {trigger} from "../components/com_trigger.js";
import {Blueprint} from "../core.js";
import {Game, Layer} from "../game.js";

export function blueprint_door(game: Game): Blueprint {
    return {
        Using: [collide(false, Layer.None, Layer.Player, [1, 1, 2]), trigger(Action.OpenDoor)],
        Children: [
            {
                Scale: [1, 1, 0.1],
                Using: [
                    render_diffuse(game.MaterialDiffuseGouraud, game.MeshCube, [1, 1, 1, 1]),
                    collide(true, Layer.Terrain, Layer.None, [1, 1, 1]),
                    animate({
                        idle: {
                            Keyframes: [
                                {
                                    Timestamp: 0,
                                    Translation: [0, 0, 0],
                                },
                            ],
                        },
                        move: {
                            Flags: AnimationFlag.None,
                            Keyframes: [
                                {
                                    Timestamp: 0,
                                    Translation: [0, 0, 0],
                                },
                                {
                                    Timestamp: 1,
                                    Translation: [1, 0, 0],
                                },
                                {
                                    Timestamp: 3,
                                    Translation: [1, 0, 0],
                                },
                                {
                                    Timestamp: 4,
                                    Translation: [0, 0, 0],
                                },
                            ],
                        },
                    }),
                ],
            },
        ],
    };
}
