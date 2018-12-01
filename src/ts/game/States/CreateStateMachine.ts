
import { IMenuState, CreateMenuState, SoundMenuState, DisplayMenuState, InputMenuState, UpdateMenuState } from "./MenuState/MenuState";
import { IStateProcessor } from "../../gamelib/State/StateProcessor";
import { CreateGameStateLandExplorer, Sounds, Display, Input, Update, ILandExplorerGameState } from "./LandExplorer/LandExplorerGameState";
import { IState } from "../../gamelib/State/StateMachine";
import { EmptyUpdate, EmptyInput } from "../../testGame/CreateTestStateMachine";
import { IHelp, CreateHelp, DisplayHelp, InputHelp } from "./Help/HelpState";


export function CreateState(): IState {

    enum StateId {
        Menu, // 0
        BalloonRide, // 1
        Help,
    }

    const s0: IMenuState = CreateMenuState(["Start", "Help"]);
    const b0: IStateProcessor<IMenuState> = {
        id: StateId.Menu,
        name: "Main Menu",
        sound: SoundMenuState,
        display: DisplayMenuState,
        input: InputMenuState,
        update: UpdateMenuState,
        next: (state: IMenuState) => {
            if (state.menu.selected) {
                switch (state.menu.itemFocus) {
                    case 0:
                        return StateId.BalloonRide;
                    case 1:
                        return StateId.Help;
                }
            }
            return undefined;
        }
    };

    const s1: ILandExplorerGameState = CreateGameStateLandExplorer();
    const b1: IStateProcessor<ILandExplorerGameState> = {
        id: StateId.BalloonRide,
        name: "Balloon Race",
        sound: Sounds,
        display: Display,
        input: Input,
        update: Update,
        next: (state: ILandExplorerGameState) => {
            if (state.landState.controls.exit) {
                return StateId.Menu;
            }
            return undefined;
        }
    };
    const s2: IHelp = CreateHelp();
    const b2: IStateProcessor<IHelp> = {
        id: StateId.Help,
        name: "Help",
        sound: EmptyUpdate,
        display: DisplayHelp,
        input: InputHelp,
        update: EmptyUpdate,
        next: (state: IHelp) => {
            if (state.exit) {
                return StateId.Menu;
            }
            return undefined;
        }
    };

    return {
        activeState: 0,
        states: [s0, s1, s2],
        behaviours: [b0, b1, b2],
    };
}



