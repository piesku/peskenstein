import {Entity, Game} from "./game.js";

export const enum Action {
    CollectItem,
}

export function dispatch(game: Game, action: Action, payload: unknown) {
    switch (action) {
        case Action.CollectItem: {
            let id = payload as Entity;
            alert(`Item ${id} collected!`);
            break;
        }
    }
}
