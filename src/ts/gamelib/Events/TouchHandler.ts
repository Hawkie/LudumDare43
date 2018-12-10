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
        return {...eState,
            touch: coord,
        };
    } else if (e.type === "touchend") {
        return {...eState,
            touch: undefined,
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