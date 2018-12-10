import { Canvas } from "../Elements/Canvas";
import { EventProcessor, IEventState } from "./EventProcessor";
import { IStateProcessor } from "../State/StateProcessor";
import { DrawContext } from "./DrawContext";


export class EventLoop<TState> {

    eventProcessor: EventProcessor;

    constructor(private document: Document,
        private window: Window,
        private canvas: Canvas,
        private state: TState,
        private stateMachine: IStateProcessor<TState>) {
            // loosely bound to canvas
        this.eventProcessor = new EventProcessor(this.document, this.canvas.canvas);
    }

    loop(): void {
        let lastTime: number = 0;
        let myLoop: FrameRequestCallback = (time => {
            const delta: number = time - lastTime;
            if (delta < 1000) {
                let nextState: TState = processOneFrame(this.state, this.stateMachine, delta / 1000,
                    this.canvas.context(),
                    this.eventProcessor.eState);
                // one place where we update state
                this.state = nextState;
            }
            lastTime = time;
            this.window.requestAnimationFrame(myLoop);
        });
        // request to do this again ASAP
        myLoop(20);
    }

}

function processOneFrame<TState>(state: TState,
     processor: IStateProcessor<TState>,
     delta: number,
     ctx: DrawContext,
     eState: IEventState): TState {
    processor.display(ctx, state);
    let newState: TState = processor.input(state, eState, delta);
    newState = processor.sound(newState, delta);
    newState = processor.update(newState, delta);
    let idState: number = processor.next(newState);
    if (idState !== undefined) {
        return Object.assign({}, newState, {
            activeState: idState
        });
    }
    return newState;
}