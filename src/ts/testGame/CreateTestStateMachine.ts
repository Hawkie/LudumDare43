import { IStateProcessor } from "../gamelib/State/StateProcessor";
import { DisplayTitle } from "../game/Components/TitleComponent";
import { EventProcessor, IEventState } from "../gamelib/1Common/EventProcessor";

export function CreateTestStateMachine(): IStateProcessor<string> {
    return {
        id: 1,
        name: "test",
        sound: EmptyUpdate,
        display: DisplayTitle,
        input: EmptyInput,
        update: EmptyUpdate,
        next: (state: string) => { return undefined; }
    };
}

export function EmptyInput<T>(state:T, eState:IEventState, timeModifier:number): T {
    return state;
}

export function EmptyUpdate<T>(state: T, timeModifier: number): T {
    return state;
}