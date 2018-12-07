import { IEventState } from "../1Common/EventProcessor";
import { ICoordinate } from "../DataTypes/Coordinate";
import { Game } from "../1Common/Game";
import { Keys } from "./KeyHandler";
import { Canvas } from "../1Common/Canvas";

// mouse events

export function OnMouse(eState: IEventState, canvas: Canvas, e: MouseEvent): IEventState {
    const coord: ICoordinate = getMousePos(canvas, e);
    console.log("Mouse" + e.type + "x:" + coord.x + "y:" + coord.y);
    if (e.type === "mousedown") {
        if (coord.y < 50) {
            return {...eState,
                keys: [Keys.Q]
            };
        } else if (coord.y > Game.assets.height-50) {
            return {...eState,
                keys: [Keys.A]
            };
        } else {
            return {...eState,
                keys: [Keys.Enter, Keys.N]
            };
        }
    } else if (e.type === "mouseup") {
        return {...eState,
            keys: []
        };
    }
    return eState;
}

function getMousePos(canvas: Canvas, evt: MouseEvent): ICoordinate {
    const rect:any = canvas.canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}