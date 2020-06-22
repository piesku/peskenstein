import {html} from "../../common/html.js";
import {Game} from "../game.js";
import {Score} from "./Score.js";

export function App(game: Game) {
    return html`
        <div
            style="
                position: absolute;
                right: 0;
                bottom: 0;
                left: 0;
                display: flex;
                justify-content: space-between;
                padding: 20px;
                font: 3rem Arial, sans-serif;
                font-weight: bold;
                color: #eee;
                background-color: #222;
            "
        >
            <div style="flex: 1 content;">Castle Peskenstein</div>
            ${Score(game)}
        </div>
    `;
}
