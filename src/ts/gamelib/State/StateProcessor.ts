import { DrawContext } from "../1Common/DrawContext";
import { KeyStateProvider } from "../1Common/KeyStateProvider";

export interface IStateProcessor<T> {
    id: number;
    name: string;
    sound(state: T, timeModifier: number): T;
    display(ctx: DrawContext, state:T): void;
    input(state:T, keyStateProvider: KeyStateProvider, timeModifier: number): T;
    update(state:T, timeModifier: number): T;
    next(state: T): number;
}


