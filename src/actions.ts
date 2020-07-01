import {destroy} from "./core.js";
import {Entity, Game, View} from "./game.js";
import {maps} from "./scenes/maps.js";
import {scene_stage} from "./scenes/sce_stage.js";
import {Has} from "./world.js";

export const enum Action {
    NextLevel,
    CollectItem,
    Exit,
}

export function dispatch(game: Game, action: Action, payload: unknown) {
    switch (action) {
        case Action.NextLevel: {
            game.View = View.LevelPlaying;
            let current_map = maps[game.MapIndex];
            game.MapIndex = current_map.next;
            scene_stage(game, maps[game.MapIndex]);
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
