import {query_all} from "./components/com_transform.js";
import {destroy} from "./core.js";
import {Entity, Game, View} from "./game.js";
import {maps} from "./scenes/maps.js";
import {scene_stage} from "./scenes/sce_stage.js";
import {Has} from "./world.js";

export const enum Action {
    NextLevel,
    CollectItem,
    OpenDoor,
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
        case Action.OpenDoor: {
            let [trigger, other] = payload as [Entity, Entity];
            for (let child of query_all(game.World, trigger, Has.Animate)) {
                let animate = game.World.Animate[child];
                animate.Trigger = "move";
            }
            break;
        }
    }
}
