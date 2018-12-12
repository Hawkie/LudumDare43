﻿import { OnKey } from "./KeyHandler";
import { OnTouch } from "./TouchHandler";
import { OnMouse } from "./MouseHandler";
import { ICoordinate } from "../DataTypes/Coordinate";

export interface IEventState {
    readonly keys: ReadonlyArray<number>;
    readonly buttons: number;
    readonly start: ICoordinate;
    readonly current: ICoordinate;
    readonly end: ICoordinate;
    readonly touchForce: number;
    readonly down: boolean;
    readonly click: boolean;
}

export function CreateEventState(): IEventState {
    return {
        keys: [],
        buttons: undefined,
        start: undefined,
        current: undefined,
        end: undefined,
        touchForce: undefined,
        down: false,
        click: false,
    };
}

export function Click(oldState: IEventState, newState: IEventState): IEventState {
    return {...newState,
        click: DownCheck(oldState.down, newState.down),
    };
}

export function DownCheck(oldDown: boolean, newDown: boolean): boolean {
    if (oldDown && !newDown) {
        return true;
    }
    return false;
}

export class EventProcessor {
    eState: IEventState = CreateEventState();

    constructor(private document: Document,
        private element: HTMLElement) {
        this.addListeners();
    }


    private _OnKey(e: KeyboardEvent): void {
        this.eState = OnKey(this.eState, e);
    }

    private _OnTouch(e: TouchEvent): void {
        this.eState = OnTouch(this.eState, this.element, e);
    }

    private _OnMouse(e: MouseEvent): void {
        this.eState = OnMouse(this.eState, this.element, e);
    }

    private addListeners(): void {
        // keys
        this.document.addEventListener("keyup", this._OnKey.bind(this), false);
        this.document.addEventListener("keydown", this._OnKey.bind(this), false);
        // this.window.addEventListener("keypress", kd, false);
        // this.window.addEventListener("onkeydown", kd, false);

        // touch
        this.document.addEventListener("touchstart", this._OnTouch.bind(this), false);
        this.document.addEventListener("touchmove", this._OnTouch.bind(this), false);
        this.document.addEventListener("touchend", this._OnTouch.bind(this), false);

        this.document.addEventListener("mousedown", this._OnMouse.bind(this), false);
        this.document.addEventListener("mousemove", this._OnMouse.bind(this), false);
        this.document.addEventListener("mouseup", this._OnMouse.bind(this), false);
        this.document.addEventListener("click", this._OnMouse.bind(this), false);
    }
}




