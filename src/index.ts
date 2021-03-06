import {dispatch} from "./actions.js";
import {loop_start} from "./core.js";
import {Game} from "./game.js";
import {maps} from "./scenes/maps.js";
import {scene_title} from "./scenes/sce_title.js";

let game = new Game();
scene_title(game, maps[game.MapIndex]);
loop_start(game);

// @ts-ignore
window.game = game;

// @ts-ignore
window.$ = dispatch.bind(null, game);
