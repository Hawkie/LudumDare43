import { Game } from "../1Common/Game";
import { ICoordinate } from "../DataTypes/Coordinate";
import { Canvas } from "../Elements/Canvas";
import { IEventState } from "../1Common/EventProcessor";
import { Keys } from "./KeyHandler";

// touch events
 export function OnTouch(eState:IEventState, element: HTMLElement, e: TouchEvent): IEventState {
    const t: Touch = e.touches[0];
    const coord: ICoordinate = getTouchPos(element, t);
    console.log("Touch" + e.type + "x:" + coord.x + "y:" + coord.y);
    if (e.type === "touchstart") {
        return {...eState,
            start: coord,
            touchForce: t.force,
            ended: false,
        };
    } else {
        e.preventDefault();
        if (e.type === "touchmove") {
            return {...eState,
                current: coord,
                touchForce: t.force,
            };
        }
        if (e.type === "touchend") {
            return {...eState,
                end: coord,
                touchForce: t.force,
                ended: true,
            };
        }
    }
    return eState;
}

function getTouchPos(element: HTMLElement, t: Touch): ICoordinate {
    const rect:any = element.getBoundingClientRect();
    return {
        x: t.clientX - rect.left,
        y: t.clientY - rect.top
    };
}