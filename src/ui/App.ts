import {html} from "../../common/html.js";
import {Game} from "../game.js";

export function App(game: Game) {
    return html`
        <div
            style="
                position: absolute;
                right: 0;
                bottom: 0;
                left: 0;
                padding: 20px;
                font: 3rem Arial, sans-serif;
                font-weight: bold;
                color: #eee;
                background-color: #222;
            "
        >
            Items: ${game.ItemsCollected} / ${game.ItemsAvailable}
        </div>
    `;
}
