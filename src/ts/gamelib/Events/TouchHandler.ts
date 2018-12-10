import { Game } from "../1Common/Game";
import { ICoordinate } from "../DataTypes/Coordinate";
import { Canvas } from "../Elements/Canvas";
import { IEventState } from "../1Common/EventProcessor";
import { Keys } from "./KeyHandler";

// touch events
 export function OnTouch(eState:IEventState, element: HTMLElement, e: TouchEvent): IEventState {
    const coord: ICoordinate = getTouchPos(element, e);
    console.log("Touch" + e.type + "x:" + coord.x + "y:" + coord.y);
    if (e.type === "touchstart") {
        if (coord.y < Game.assets.height/2) {
            return {...eState,
                keys: [Keys.Q]
            };
        }
        if (coord.y > Game.assets.height/2) {
            return {...eState,
                keys: [Keys.A]
            };
        }
    }
    if (e.type === "touchend") {
        return {...eState,
            keys: eState.keys.concat(Keys.Num1),
        };
    }
    return eState;
}

function getTouchPos(element: HTMLElement, evt: TouchEvent): ICoordinate {
    const rect:any = element.getBoundingClientRect();
    return {
        x: evt.touches[0].clientX - rect.left,
        y: evt.touches[0].clientY - rect.top
    };
}