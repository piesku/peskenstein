import {destroy} from "./core.js";
import {Entity, Game, View} from "./game.js";
import {scene_stage} from "./scenes/sce_stage.js";

export const enum Action {
    StartPlaying,
    CollectItem,
}

export function dispatch(game: Game, action: Action, payload: unknown) {
    switch (action) {
        case Action.StartPlaying: {
            game.View = View.Playing;
            scene_stage(game);
            break;
        }
        case Action.CollectItem: {
            game.ItemsCollected++;
            let entity = payload as Entity;
            destroy(game.World, entity);
            break;
        }
    }
}
