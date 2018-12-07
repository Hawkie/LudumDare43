// import "@babel/polyfill";
import { Game } from "./gamelib/1Common/Game";
import { IStateProcessor } from "./gamelib/State/StateProcessor";
import { IState, createStateMachineProcessor } from "./gamelib/State/StateMachine";
import { CreateState } from "./game/States/CreateStateMachine";
import { CreateTestStateMachine } from "./testGame/CreateTestStateMachine";

// create state here and pass to game
const state: IState = CreateState();
let fsm: IStateProcessor<IState> = createStateMachineProcessor();

let game: Game<IState> = new Game();
game.run(window, document, state, fsm);