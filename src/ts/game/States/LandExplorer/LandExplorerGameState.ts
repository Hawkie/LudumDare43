import { DrawContext} from "../../../gamelib/1Common/DrawContext";
import { KeyStateProvider } from "../../../gamelib/1Common/KeyStateProvider";
import { CreateLandExplorer, ILandExplorerState, StateCopyToControls,
    StateCopyToUpdate, DisplayLandExplorer, LandExplorerSounds, TestPlayerHit } from "./LandExplorerState";
import { CreateShip, IShip, DisplayShip } from "../../Components/Ship/ShipComponent";
import { ICoordinate } from "../../../gamelib/DataTypes/Coordinate";
import { initSurface, ISurface, ISurfaceGeneration } from "../../Components/SurfaceComponent";
import { IParticleField, CreateField } from "../../Components/FieldComponent";
import { DisplayTitle } from "../../Components/TitleComponent";
import { MoveShip } from "../../Components/Ship/MovementComponent";
import { CreateView, IView, DisplayView, Zoom } from "../../Components/ViewPortComponent";
import { Game } from "../../../gamelib/1Common/Game";
import { DrawNumber } from "../../../gamelib/Views/ValueView";
import { DrawText } from "../../../gamelib/Views/TextView";

export interface ILandExplorerGameState {
    landState: ILandExplorerState;
    view: IView;
}

export function CreateGameStateLandExplorer(): ILandExplorerGameState {
    let surfaceGenerator: ISurfaceGeneration = {
        resolution: 10,
        upper: 10,
        lower: -10,
        flatChance: 0.5,
    };
    let ship: IShip = CreateShip(Game.assets.width/2, Game.assets.height/2, 10,
        MoveShip);
    let points: ICoordinate[] = initSurface(Game.assets.width, surfaceGenerator);
    let surface: ISurface = {
        addedLeft: 0,
        points: points,
        surfaceGenerator: surfaceGenerator,
    };
    let starfield: IParticleField = CreateField(true, 1, 1);
    let state: ILandExplorerState = CreateLandExplorer(ship, starfield, surface);
    let view: IView = CreateView(true);
    return {
        landState: state,
        view: view,
    };
}

export function Update(state: ILandExplorerGameState, timeModifier: number): ILandExplorerGameState {
    let newState: ILandExplorerState = state.landState;
    // combine our three state changes from one update function
    newState = StateCopyToUpdate(newState, timeModifier);
    newState = TestPlayerHit(newState);
    return {...state,
        landState: newState,
        view: Zoom(state.view, newState.controls.zoomIn, newState.controls.zoomOut)
    };
}

export function Sounds(state: ILandExplorerGameState): ILandExplorerGameState {
    return {...state,
        landState: LandExplorerSounds(state.landState),
    };
}

export function Input(state: ILandExplorerGameState, keys: KeyStateProvider): ILandExplorerGameState {
    return {...state,
        landState: StateCopyToControls(state.landState, keys)
    };
}

export function Display(ctx: DrawContext, state: ILandExplorerGameState): void {
    ctx.clear();
    // objects not affected by movement. e.g GUI
    DisplayGUI(ctx, state);
    DisplayView(ctx, state.view, state.landState.ship.x, state.landState.ship.y, state.landState, {displayState: DisplayLandExplorer});
}

function DisplayGUI(ctx: DrawContext, state: ILandExplorerGameState): void {
    DisplayTitle(ctx, state.landState.title);
    let y:number = 20;
    const x: number = 30;
    const x2: number = 100;
    // score
    DrawText(ctx, Game.assets.width - x2, y, "Score:");
    DrawNumber(ctx, Game.assets.width- x, y, state.landState.score,);
    // passengers
    y +=20;
    DrawText(ctx, Game.assets.width - x2, y, "Passengers:");
    DrawNumber(ctx, Game.assets.width- x, y, state.landState.ship.weapon1.remaining);
    // fuel
    y +=20;
    DrawText(ctx, Game.assets.width - x2, y, "Fuel:");
    DrawNumber(ctx, Game.assets.width- x, y, state.landState.ship.fuel);
    // fuel
    y +=20;
    DrawText(ctx, Game.assets.width - x2, y, "Temp:");
    DrawNumber(ctx, Game.assets.width- x, y, state.landState.ship.temp);
    // mass
    y +=20;
    DrawText(ctx, Game.assets.width - x2, y, "Mass:");
    DrawNumber(ctx, Game.assets.width- x, y, state.landState.ship.mass);
    // decent speed
    y +=20;
    DrawText(ctx, Game.assets.width - x2, y, "Descent:");
    DrawNumber(ctx, Game.assets.width- x, y, state.landState.ship.guiDescent);
    // air Speed
    y +=20;
    DrawText(ctx, Game.assets.width - x2, y, "Air Speed:");
    DrawNumber(ctx, Game.assets.width- x, y, state.landState.ship.Vx);
    // height
    y +=20;
    DrawText(ctx, Game.assets.width - x2, y, "Height:");
    DrawNumber(ctx, Game.assets.width- x, y, Math.abs(state.landState.ship.y - 400));
}
