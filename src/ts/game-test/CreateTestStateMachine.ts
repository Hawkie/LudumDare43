import { IStateProcessor } from "../gamelib/State/StateProcessor";
import { DisplayTitle } from "../game/Components/TitleComponent";
import { IEventState, CreateEventState } from "../gamelib/1Common/EventProcessor";
import { DrawContext } from "../gamelib/1Common/DrawContext";
import { DrawText } from "../gamelib/Views/TextView";
import { DrawNumber } from "../gamelib/Views/ValueView";
import { Game } from "../gamelib/1Common/Game";
import { DrawCircle } from "../gamelib/Views/CircleView";

export interface ITestState {
    title: string;
    errors: string[];
    controls: IEventState;
}

export function CreateTestState(): ITestState {
    return {
        title: "Test State",
        errors: [],
        controls: CreateEventState(),
    };
}

export function CreateTestStateMachine(): IStateProcessor<ITestState> {
    return {
        id: 1,
        name: "test",
        sound: SoundTest,
        display: DisplayTest,
        input: InputTest,
        update: EmptyUpdate,
        next: (state: ITestState) => { return undefined; }
    };
}

export function EmptyInput<T>(state:T, eState:IEventState, timeModifier:number): T {
    return state;
}

export function EmptyUpdate<T>(state: T, timeModifier: number): T {
    return state;
}

export function SoundTest(state: ITestState): ITestState {
    return {...state,
        errors: [Game.assets.cinematic.display(), Game.assets.explosion.display()]
    };
}

export function InputTest(state:ITestState, eState:IEventState, timeModifier:number): ITestState {
    return {...state,
        controls: eState,
    };
}

export function DisplayTest(ctx: DrawContext, state:ITestState): void {
    ctx.clear();
    DisplayTitle(ctx, state.title);
    let y: number = 100;
    state.errors.forEach(e => { DrawText(ctx, 100, y, e); y+=15;});

    // keys
    if (state.controls.keys !== undefined) {
        state.controls.keys.forEach(k => { DrawNumber(ctx, 100, y, k); y+=15;});
    }

    // mouse point
    if (state.controls.point !== undefined) {
        DrawCircle(ctx, state.controls.point.x, state.controls.point.y, 2);
    }

    // touch point
    if (state.controls.touch !== undefined) {
        DrawCircle(ctx, state.controls.touch.x, state.controls.touch.y, state.controls.touchForce * 10);
    }
}

