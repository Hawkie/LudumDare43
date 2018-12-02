import { Keys } from "../../gamelib/1Common/KeyStateProvider";

export interface IControls {
    readonly left: boolean;
    readonly right: boolean;
    readonly up: boolean;
    readonly down: boolean;
    readonly fire: boolean;
    readonly zoomIn: boolean;
    readonly zoomOut: boolean;
    readonly exit: boolean;
}

export function CreateControls(): IControls {
    return {
            left: false,
            right: false,
            up: false,
            down: false,
            fire: false,
            zoomIn: false,
            zoomOut: false,
            exit: false,
    };
}

export function InputControls(keys:number[]): IControls {
    let up: boolean = false;
    let down: boolean = false;
    let left: boolean = false;
    let right: boolean = false;
    let fire: boolean = false;
    let zoomIn: boolean = false;
    let zoomOut: boolean = false;
    let exit: boolean = false;
    if (keys.indexOf(Keys.Q) > -1) {
        up = true;
    }
    if (keys.indexOf(Keys.A) > -1) {
        down = true;
    }
    if (keys.indexOf(Keys.LeftArrow) > -1) {
        left = true;
    }
    if (keys.indexOf(Keys.RightArrow) > -1) {
        right = true;
    }
    if (keys.indexOf(Keys.SpaceBar) > -1) {
        fire = true;
    }
    if (keys.indexOf(Keys.Z) > -1) {
        zoomIn = true;
    }
    if (keys.indexOf(Keys.X) > -1) {
        zoomOut = true;
    }
    if (keys.indexOf(Keys.Esc) > -1) {
        exit = true;
    }
    return {
        left: left,
        right: right,
        up: up,
        down: down,
        fire: fire,
        zoomIn: zoomIn,
        zoomOut: zoomOut,
        exit: exit,
    };
}