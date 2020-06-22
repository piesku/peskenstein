import {html} from "../../common/html.js";
import {Game} from "../game.js";

export function Score(game: Game) {
    return html`
        <div style="flex: 1 content;">
            Items: ${game.ItemsCollected} / ${game.ItemsAvailable}
        </div>
    `;
}
