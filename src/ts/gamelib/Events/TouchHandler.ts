import { ICoordinate } from "../DataTypes/Coordinate";
import { IEventState } from "./EventProcessor";

// touch events
 export function OnTouch(eState:IEventState, element: HTMLElement, e: TouchEvent): IEventState {
    const t: Touch = e.touches[0];
    const coord: ICoordinate = getTouchPos(element, t);
    console.log("Touch" + e.type + "x:" + coord.x + "y:" + coord.y);
    if (e.type === "touchstart") {
        return {...eState,
            start: coord,
            touchForce: t.force,
            down: true,
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
                down: false,
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