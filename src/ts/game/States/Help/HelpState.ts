import { DisplayText, DisplayTitle } from "../../Components/TitleComponent";
import { DrawContext } from "../../../gamelib/1Common/DrawContext";
import { Keys, KeyStateProvider } from "../../../gamelib/1Common/KeyStateProvider";

export interface IHelp {
    readonly title: string;
    readonly help1: string;
    readonly help2: string;
    readonly help3: string;
    readonly help4: string;
    readonly help5: string;
    readonly exit: boolean;
}

export function CreateHelp(): IHelp {
    return {
        title: "Instructions",
        help1: "Press Escape to return to menu",
        help2: "Space - Drop ballast or sacrifice passangers to go as far as possible",
        help3: "Left/Right Arrow - adjust speed left and right",
        help4: "Z and X to zoom in and out",
        help5: "Fly the balloon the furthest distance to win the race prize",
        exit: false,
    };
}

export function DisplayHelp(ctx: DrawContext, state: IHelp): void {
    ctx.clear();
    DisplayTitle(ctx, state.title);
    DisplayText(ctx, state.help1, 100, 200, 12);
    DisplayText(ctx, state.help2, 100, 220, 12);
    DisplayText(ctx, state.help3, 100, 240, 12);
    DisplayText(ctx, state.help4, 100, 260, 12);
    DisplayText(ctx, state.help5, 100, 280, 12);
}

export function InputHelp(state: IHelp, keystate: KeyStateProvider): IHelp {
    let up: boolean = false;
    let down: boolean = false;
    let exit: boolean = false;
    let keys: number[] = keystate.getKeys();
    if (keys.indexOf(Keys.UpArrow) > -1) {
        up = true;
    }
    if (keys.indexOf(Keys.DownArrow) > -1) {
        down = true;
    }
    if (keys.indexOf(Keys.Esc) > -1) {
        exit = true;
    }
    return {...state,
        exit: exit,
    };
}
