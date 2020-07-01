import {html} from "../../common/html.js";
import {Action} from "../actions.js";

export function Title() {
    return html`
        <div
            style="
                padding: 20px;
                font-family: Arial, sans-serif;
                font-weight: bold;
                color: #222;
            "
        >
            <h1 style="font-size: 6rem;">Castle Peskenstein</h1>
            <button
                onclick="$(${Action.NextLevel})"
                style="padding: 20px; font-size: 2rem; font-weight: bold;"
            >
                Play Now
            </button>
        </div>
    `;
}
