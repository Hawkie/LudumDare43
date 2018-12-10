import { IStateProcessor } from "../gamelib/State/StateProcessor";
import { DisplayTitle } from "../game/Components/TitleComponent";
import { IEventState } from "../gamelib/1Common/EventProcessor";
import { DrawContext } from "../gamelib/1Common/DrawContext";
import { DrawText } from "../gamelib/Views/TextView";
import { DrawNumber } from "../gamelib/Views/ValueView";
import { Game } from "../gamelib/1Common/Game";
import { Keys } from "../gamelib/Events/KeyHandler";
import { Canvas } from "../gamelib/Elements/Canvas";
import { CreateButton } from "../gamelib/Elements/Button";

export interface ITestState {
    title: string;
    errors: string[];
    controls: number[];
}

export function CreateTestState(): ITestState {
    return {
        title: "Test State",
        errors: [],
        controls: [],
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
        controls: eState.keys.map(k => k)
    };
}

export function DisplayTest(ctx: DrawContext, state:ITestState): void {
    ctx.clear();
    DisplayTitle(ctx, state.title);
    let y: number = 100;
    state.errors.forEach(e => { DrawText(ctx, 100, y, e); y+=15;});
    state.controls.forEach(c => { DrawNumber(ctx, 100, y, c); y+=15; });
}

