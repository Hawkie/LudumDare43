import { Canvas } from "./Canvas";
import { Assets } from "../../game/Assets/assets";
import { EventLoop } from "./EventLoop";
import { IStateProcessor } from "../State/StateProcessor";


export class Game<TState> {

    private static _assets: Assets = new Assets();
    public static get assets(): Assets { return this._assets; }

    // globals are doc and window
    run(window: Window, document: Document, state: TState, fsm: IStateProcessor<TState>): void {
        console.log("Game Run()");

        let canvas: Canvas = new Canvas(Game.assets.width, Game.assets.height, document);
        // let audioContext: AudioContext = new AudioContext();
        let gameloop: EventLoop<TState> = new EventLoop<TState>(document, window, canvas, state, fsm);
        gameloop.loop();
    }
}