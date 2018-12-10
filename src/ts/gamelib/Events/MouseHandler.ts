import { IEventState } from "../1Common/EventProcessor";
import { ICoordinate } from "../DataTypes/Coordinate";
import { Game } from "../1Common/Game";
import { Keys } from "./KeyHandler";
import { Canvas } from "../Elements/Canvas";

// mouse events

export function OnMouse(eState: IEventState, element: HTMLElement, e: MouseEvent): IEventState {
    const coord: ICoordinate = getMousePos(element, e);
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
            keys: eState.keys.concat(Keys.Num0),
        };
    } else if (e.type === "click") {
        return {...eState,
            keys: eState.keys.concat(Keys.Home)
        };
    }
    return eState;
}

function getMousePos(element: HTMLElement, evt: MouseEvent): ICoordinate {
    const rect:any = element.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}