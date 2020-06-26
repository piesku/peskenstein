import {html} from "../../common/html.js";
import {Game} from "../game.js";
import {Score} from "./Score.js";

export function Summary(game: Game) {
    return html`
        <div
            style="
                width: 50vw;
                height: 50vh;
                margin: auto;
                padding: 20px;
                font: 3rem Arial, sans-serif;
                font-weight: bold;
                color: #eee;
                background-color: #222;
            "
        >
            <h1 style="font-size: 4rem;">Level Complete!</h1>
            ${Score(game)}
        </div>
    `;
}
