import { ICoordinate } from "../DataTypes/Coordinate";
import { IEventState } from "./EventProcessor";
import { Game } from "../1Common/Game";
import { safariAudio } from "../Elements/AudioElement";




// touch events
 export function OnTouch(eState:IEventState, element: HTMLElement, e: TouchEvent): IEventState {
    const tList: TouchList = e.changedTouches;
    const t: Touch = tList[0];
    const coord: ICoordinate = getTouchPos(element, t);
    console.log("Touch" + e.type + "x:" + coord.x + "y:" + coord.y);
    if (e.type === "touchstart") {
        return {...eState,
            start: coord,
            current: coord,
            touchForce: t.force,
            down: true,
            touches: tList,
        };
    } else {
        e.preventDefault();
        if (e.type === "touchmove") {
            return {...eState,
                current: coord,
                touchForce: t.force,
                touches: tList,
            };
        }
        if (e.type === "touchend") {
            let log:string = safariAudio(eState);
            return {...eState,
                end: coord,
                touchForce: t.force,
                down: false,
                touches: tList,
                firstInteraction: true,
                log: log,
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