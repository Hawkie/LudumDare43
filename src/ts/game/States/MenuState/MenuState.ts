import { IMenuComponent, UpdateMenu, SoundMenu, DisplayMenu } from "../../Components/MenuComponent";
import { IMenuControls, UpdateMenuControls } from "./MenuControlsComponent";
import { IParticleField, CreateField } from "../../Components/FieldComponent";
import { Transforms } from "../../../gamelib/Physics/Transforms";
import { DrawContext } from "../../../gamelib/1Common/DrawContext";
import { DisplayTitle, DisplayText } from "../../Components/TitleComponent";
import { DisplayField, FieldGenMove } from "../../../gamelib/Components/ParticleFieldComponent";
import { EventProcessor, IEventState } from "../../../gamelib/1Common/EventProcessor";
import { IStateProcessor } from "../../../gamelib/State/StateProcessor";
import { Game } from "../../../gamelib/1Common/Game";
import { DrawGraphic } from "../../../gamelib/Views/GraphicView";

export interface IMenuState {
    readonly title: string;
    readonly help1: string;
    readonly help2: string;
    readonly help3: string;
    readonly font: string;
    readonly fontSize: number;
    readonly starField1: IParticleField;
    readonly starField2: IParticleField;
    readonly menu: IMenuComponent;
    readonly control: IMenuControls;
    readonly x: number;
    readonly y: number;
}

// when creating a game state - create the data and then bind to the objects
export function CreateGameStateMenu(): IStateProcessor<IMenuState> {
    return {
        id: 0,
        name: "Main Menu",
        sound: SoundMenuState,
        display: DisplayMenuState,
        input: InputMenuState,
        update: UpdateMenuState,
        next: (state: IMenuState) => {
            if (state.menu.selected) {
                return state.menu.itemFocus;
            }
            return undefined;
        }
    };
}

export function CreateMenuState(items: string[]): IMenuState {
    return {
        title: "Air Rider",
        help1: "Sacrifices must be made!",
        help2: "<Q> and <A> keys to select option",
        help3: "<Enter> to select a menu option",
        font: "Arial",
        fontSize: 18,
        starField1: CreateField(true, 2, 2, 1),
        starField2: CreateField(true, 2, 2, 2),
        menu: {
            lastMoved: 0,
            selected: false,
            itemFocus: 0,
            moved: false,
            font: "Arial",
            fontSize: 16,
            menuItems: items,
        },
        control: {
            up: false,
            down: false,
            enter: false,
        },
        x: 300,
        y: 200,
    };
}

// map whole state to view/ctx functions
export function DisplayMenuState(ctx: DrawContext, state: IMenuState): void {
    ctx.clear();
    DisplayField(ctx, state.starField1.particles);
    DisplayField(ctx, state.starField2.particles);
    DisplayTitle(ctx, state.title);
    DisplayMenu(ctx, 200, 100, state.menu);
    DrawGraphic(ctx, state.x, state.y, Game.assets.airBalloon);
    DisplayText(ctx, state.help1, 100, 400);
    DisplayText(ctx, state.help2, 100, 415);
    DisplayText(ctx, state.help3, 100, 430);
}

export function UpdateMenuState(state:IMenuState, timeModifier: number): IMenuState {
    return {...state,
        starField1: FieldGenMove(timeModifier, state.starField1, true, 2, (now: number) => {
            return {
                x: 0,
                y: Transforms.random(0, Game.assets.height),
                Vx: Transforms.random(10, 30),
                Vy: 0,
                born: now,
                size: 1,
            };
        }),
        starField2: FieldGenMove(timeModifier, state.starField2, true, 3, (now: number) => {
            return {
                x: 0,
                y: Transforms.random(0, Game.assets.height),
                Vx: Transforms.random(30, 50),
                Vy: 0,
                born: now,
                size: 2,
            };
        }),
        x: Math.max(200, Math.min(350, state.x + Transforms.random(-5, 5)* timeModifier)),
        y: Math.max(100, Math.min(300, state.y + Transforms.random(-5, 5)* timeModifier)),
    };
}

export function SoundMenuState(state: IMenuState): IMenuState {
    return {...state,
        menu: SoundMenu(state.menu, Game.assets.flyInspire, Game.assets.glassPing)
    };
}

export function InputMenuState(menuState: IMenuState, eState: IEventState, timeModifier: number): IMenuState  {
    let controls: IMenuControls = UpdateMenuControls(timeModifier, eState);
    return {...menuState,
        control: controls,
        menu: UpdateMenu(menuState.menu, controls)
    };
}