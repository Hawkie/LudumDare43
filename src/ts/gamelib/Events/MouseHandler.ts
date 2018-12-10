import { IEventState } from "../1Common/EventProcessor";
import { ICoordinate } from "../DataTypes/Coordinate";

// mouse events
export function OnMouse(eState: IEventState, element: HTMLElement, e: MouseEvent): IEventState {
    const coord: ICoordinate = getMousePos(element, e);
    console.log("Mouse: " + e.type + " x:" + coord.x + " y:" + coord.y);
    if (e.type === "mousedown") {
        return {...eState,
            start: coord,
            buttons: e.buttons,
            ended: false,
        };
    } else if (e.type === "mousemove") {
        return {...eState,
            current: coord,
            buttons: e.buttons,
        };
    } else if (e.type === "mouseup") {
        return {...eState,
            end: coord,
            buttons: e.buttons,
            ended: true,
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