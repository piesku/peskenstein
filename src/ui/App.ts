import {Game, View} from "../game.js";
import {Playing} from "./Playing.js";
import {Title} from "./Title.js";

export function App(game: Game) {
    switch (game.View) {
        case View.Playing:
            return Playing(game);
        default:
            return Title();
    }
}
