import {blueprint_door} from "../blueprints/blu_door.js";
import {blueprint_enemy} from "../blueprints/blu_enemy.js";
import {blueprint_exit} from "../blueprints/blu_exit.js";
import {blueprint_item} from "../blueprints/blu_item.js";
import {blueprint_player} from "../blueprints/blu_player.js";
import {blueprint_wall} from "../blueprints/blu_wall.js";
import {instantiate} from "../core.js";
import {Game} from "../game.js";

export interface LevelMap {
    tiles: Array<number>;
    width: number;
    next: number;
}

export const enum TileKind {
    Empty = 0,
    Wall = 1,
    Player = 2,
    Exit = 3,
    Item = 4,
    Enemy = 5,
    DoorVertical = 6,
}

export const maps: Array<LevelMap> = [
    {
        // prettier-ignore
        tiles: [
            1, 1, 1, 1, 1, 1, 1,
            0, 0, 0, 0, 0, 0, 0,
            1, 1, 1, 0, 1, 1, 1,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 2, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
        ],
        width: 7,
        next: 2,
    },
    {
        // prettier-ignore
        tiles: [
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 0, 0, 0, 0, 4, 0, 0, 0, 1,
            1, 0, 1, 0, 1, 1, 1, 1, 0, 1,
            1, 0, 1, 0, 4, 1, 5, 0, 0, 1,
            1, 0, 1, 0, 0, 0, 0, 1, 4, 1,
            1, 0, 1, 0, 1, 1, 0, 1, 6, 1,
            1, 5, 1, 5, 0, 4, 0, 1, 0, 1,
            1, 4, 1, 1, 1, 1, 1, 1, 0, 1,
            1, 0, 0, 0, 0, 0, 3, 1, 2, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        ],
        width: 10,
        next: 2,
    },
    {
        // prettier-ignore
        tiles: [
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
            1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1,
            1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
            1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
            1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
            1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
            1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 6, 1, 1, 1,
            1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1,
            1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1,
            1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 6, 1, 1, 1,
            1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
            1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1,
            1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1,
            1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
            1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1,
            1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1, 1, 1, 6, 1, 1, 1,
            1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1,
            1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 2, 0, 0, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
        ],
        width: 20,
        next: 0,
    },
];

export function build_level(game: Game, map: LevelMap) {
    // Set the UI state for this scene.
    game.ItemsAvailable = 0;
    game.ItemsCollected = 0;
    for (let tile of map.tiles) {
        if (tile === TileKind.Item) {
            game.ItemsAvailable++;
        }
    }

    for (let i = 0; i < map.tiles.length; i++) {
        let x = i % map.width;
        let y = Math.floor(i / map.width);
        switch (map.tiles[i]) {
            case TileKind.Wall:
                instantiate(game, {
                    ...blueprint_wall(game),
                    Translation: [x - 4.5, 1, y - 4.5],
                });
                break;
            case TileKind.Enemy:
                instantiate(game, {
                    ...blueprint_enemy(game),
                    Translation: [x - 4.5, 1, y - 4.5],
                });
                break;
            case TileKind.Item:
                instantiate(game, {
                    ...blueprint_item(game),
                    Translation: [x - 4.5, 1, y - 4.5],
                });
                break;
            case TileKind.Exit:
                instantiate(game, {
                    ...blueprint_exit(game),
                    Translation: [x - 4.5, 1, y - 4.5],
                });
                break;
            case TileKind.Player:
                instantiate(game, {
                    ...blueprint_player(game),
                    Translation: [x - 4.5, 1, y - 4.5],
                });
                break;
            case TileKind.DoorVertical:
                instantiate(game, {
                    ...blueprint_door(game),
                    Translation: [x - 4.5, 1, y - 4.5],
                });
                break;
        }
    }
}
