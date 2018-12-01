import { IShip, CreateShip, CrashShip, DisplayShip, ShipCopyToUpdated, ShipSounds, LandShip } from "../../Components/Ship/ShipComponent";
import { ISurface, initSurface, DisplaySurface, addSurface, TestFlat } from "../../Components/SurfaceComponent";
import { IParticleField, CreateField } from "../../Components/FieldComponent";
import { IAsteroidsControls, InputAsteroidControls, CreateControls } from "../../Components/AsteroidsControlsComponent";
import { KeyStateProvider } from "../../../gamelib/1Common/KeyStateProvider";
import { DrawContext } from "../../../gamelib/1Common/DrawContext";
import { DisplayField, FieldGenMove } from "../../../gamelib/Components/ParticleFieldComponent";
import { Transforms } from "../../../gamelib/Physics/Transforms";
import { Game } from "../../../gamelib/1Common/Game";

export interface ILandExplorerState {
    readonly title: string;
    readonly controls: IAsteroidsControls;
    readonly ship: IShip;
    readonly starField: IParticleField;
    readonly surface: ISurface;
    readonly score: number;
}

export function CreateLandExplorer(ship: IShip, starfield: IParticleField, surface: ISurface): ILandExplorerState {
    return {
        title: "Air Rider",
        controls: CreateControls(),
        ship: ship,
        starField: starfield,
        surface: surface,
        score: 0,
    };
}

export function DisplayLandExplorer(ctx: DrawContext, state: ILandExplorerState): void {
    DisplayShip(ctx, state.ship);
    DisplayField(ctx, state.starField.particles);
    DisplaySurface(ctx, state.surface);
}

export function LandExplorerSounds(state: ILandExplorerState): ILandExplorerState {
    ShipSounds(state.ship);
    // turn off any sound triggers - need to think about this
    return state;
}

export function StateCopyToUpdate(state: ILandExplorerState, timeModifier: number): ILandExplorerState {
    return {...state,
        ship: ShipCopyToUpdated(timeModifier, state.ship, state.controls),
        starField: FieldGenMove(timeModifier, state.starField, true, 2, (now: number) => {
            return {
                x: 0,
                y: Transforms.random(0, Game.assets.height),
                Vx: Transforms.random(10, 30),
                Vy: 0,
                born: now,
                size: 1,
            };
        }),
        surface: addSurface(state.surface, state.ship.x, Game.assets.width, state.surface.surfaceGenerator)
    };
}

export function StateCopyToControls(state: ILandExplorerState, keys: KeyStateProvider): ILandExplorerState {
    return {...state,
        controls: InputAsteroidControls(keys.getKeys())
    };
}

export function TestPlayerHit(state: ILandExplorerState): ILandExplorerState {
    return TouchLand(state);
}

function TouchLand(state: ILandExplorerState): ILandExplorerState {
    if (Transforms.hasPoint(state.surface.points.map(p => p), { x: 0, y: -5 }, state.ship)) {
        // check velocity
        if (TestLand(state)) {
            return {...state,
                ship: LandShip(state.ship)
            };
        } else {
            return {...state,
                ship: CrashShip(state.ship, 0, 0)
            };
        }
    }
    return state;
}

function TestLand(state: ILandExplorerState): boolean {
    // check touch down
    if (state.ship.Vy < 10) {
        // check flat bit of land
        return TestFlat(state.surface, state.ship.x);
    }
    console.log("Too fast: " + state.ship.Vy);
    return false;
}