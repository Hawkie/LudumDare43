﻿import { Canvas } from "../Elements/Canvas";
import { OnKey } from "../Events/KeyHandler";
import { OnTouch } from "../Events/TouchHandler";
import { OnMouse } from "../Events/MouseHandler";

export interface IEventState {
    readonly keys: ReadonlyArray<number>;
}

export class EventProcessor {
    eState: IEventState = {
        keys: [],
    };

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
        // this.document.addEventListener("touchmove", touch, false);
        this.document.addEventListener("touchend", this._OnTouch.bind(this), false);

        this.document.addEventListener("mousedown", this._OnMouse.bind(this), false);
        // this.document.addEventListener("mousemove", mouse, false);
        this.document.addEventListener("mouseup", this._OnMouse.bind(this), false);
        this.document.addEventListener("click", this._OnMouse.bind(this), false);
    }
}




