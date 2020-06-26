import {destroy} from "./core.js";
import {Entity, Game, View} from "./game.js";
import {scene_stage} from "./scenes/sce_stage.js";
import {Has} from "./world.js";

export const enum Action {
    StartPlaying,
    CollectItem,
    Exit,
}

export function dispatch(game: Game, action: Action, payload: unknown) {
    switch (action) {
        case Action.StartPlaying: {
            game.View = View.LevelPlaying;
            scene_stage(game);
            break;
        }
        case Action.CollectItem: {
            game.ItemsCollected++;
            let [trigger, other] = payload as [Entity, Entity];
            destroy(game.World, trigger);
            break;
        }
        case Action.Exit: {
            let [trigger, other] = payload as [Entity, Entity];
            destroy(game.World, trigger);
            game.World.Mask[other] &= ~Has.ControlPlayer;
            game.View = View.LevelSummary;
            break;
        }
    }
}
