import { Keys } from "../../../gamelib/Events/KeyHandler";
import { IEventState } from "../../../gamelib/1Common/EventProcessor";

export interface IMenuControls {
    readonly up: boolean;
    readonly down: boolean;
    readonly enter: boolean;
}

export function UpdateMenuControls(timeModifier: number, eState: IEventState): IMenuControls {
    let up: boolean = false;
    let down: boolean = false;
    let enter: boolean = false;
    const keys: ReadonlyArray<number> = eState.keys;
    if (keys.indexOf(Keys.Q) > -1) {
        up = true;
    }
    if (keys.indexOf(Keys.A) > -1) {
        down = true;
    }
    if (keys.indexOf(Keys.Enter) > -1) {
        enter = true;
    }
    return {
        up: up,
        down: down,
        enter: enter,
    };
}