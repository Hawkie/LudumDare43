import { DisplayText, DisplayTitle } from "../../Components/TitleComponent";
import { DrawContext } from "../../../gamelib/1Common/DrawContext";
import { IEventState } from "../../../gamelib/1Common/EventProcessor";
import { Keys } from "../../../gamelib/Events/KeyHandler";

export interface IHelp {
    readonly title: string;
    readonly help1: string;
    readonly help2: string;
    readonly help3: string;
    readonly help4: string;
    readonly help5: string;
    readonly help6: string;
    readonly exit: boolean;
}

export function CreateHelp(): IHelp {
    return {
        title: "Instructions",
        help1: "The balloon era is upon us and flight is an adventurous and risky sport.",
        help2: "Gain prestige by flying and landing as many passengers as far as you can.",
        help3: "Control the balloon's temperature to gain lift.",
        help4: "The higher you fly the faster the wind speed.",
        help5: "To gain more control, you can sacrifice passengers but this will affect your prestige.",
        help6: "",
        exit: false,
    };
}

export function CreateHelpControls(): IHelp {
    return {
        title: "Controls",
        help1: "Game input is keyboard only.",
        help2: "<Q> - Burner on. Increases the temperature inside the balloon.",
        help3: "<A> - Dump Air. Dump air to drop temperature.",
        help4: "<-, -> Left/Right arrow use little jets of sideways air to manoeuver.",
        help5: "<Space> Sacrifice passenger to reduce mass of balloon.",
        help6: "",
        exit: false,
    };
}

export function CreateHintHelp(): IHelp {
    return {
        title: "Hints",
        help1: "Temp is everything! Find the temp to maintain height. ~90 temp for 8 passengers.",
        help2: "Landing: Descent < 10 and land on flat ground.",
        help3: "Landing: Hold left over a flat area to drop quickly into a flat landing area.",
        help4: "Going sideways will drop temp a little faster than normal.",
        help5: "With less mass, the balloon with rise faster for the same temp.",
        help6: "Fly high to gain faster wind speed and distance.",
        exit: false,
    };
}

export function DisplayHelp(ctx: DrawContext, state: IHelp): void {
    ctx.clear();
    DisplayTitle(ctx, state.title);
    let y:number = 140;
    const x: number = 40;
    DisplayText(ctx, state.help1, x, y, 12);
    y+=20;
    DisplayText(ctx, state.help2, x, y, 12);
    y+=20;
    DisplayText(ctx, state.help3, x, y, 12);
    y+=20;
    DisplayText(ctx, state.help4, x, y, 12);
    y+=20;
    DisplayText(ctx, state.help5, x, y, 12);
    y+=20;
    DisplayText(ctx, state.help6, x, y, 12);

    DisplayText(ctx, "<Esc> to return to menu", 100, 400);
}

export function InputHelp(state: IHelp, eState: IEventState): IHelp {
    let up: boolean = false;
    let down: boolean = false;
    let exit: boolean = false;
    let keys: ReadonlyArray<number> = eState.keys;
    if (keys.indexOf(Keys.Q) > -1) {
        up = true;
    }
    if (keys.indexOf(Keys.A) > -1) {
        down = true;
    }
    if (keys.indexOf(Keys.Esc) > -1) {
        exit = true;
    }
    return {...state,
        exit: exit,
    };
}
