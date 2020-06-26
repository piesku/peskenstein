import {Game, View} from "../game.js";
import {Playing} from "./Playing.js";
import {Summary} from "./Summary.js";
import {Title} from "./Title.js";

export function App(game: Game) {
    switch (game.View) {
        case View.LevelPlaying:
            return Playing(game);
        case View.LevelSummary:
            return Summary(game);
        default:
            return Title();
    }
}
