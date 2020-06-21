import {destroy} from "./core.js";
import {Entity, Game} from "./game.js";

export const enum Action {
    CollectItem,
}

export function dispatch(game: Game, action: Action, payload: unknown) {
    switch (action) {
        case Action.CollectItem: {
            let entity = payload as Entity;
            destroy(game.World, entity);
            break;
        }
    }
}
