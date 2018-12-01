import { MoveWithVelocity } from "../../../gamelib/Actors/Movers";
import { RotateShape, RotateAngle } from "../../../gamelib/Actors/Rotators";
import { IShip } from "./ShipComponent";
import { AccelerateWithForces } from "../../../gamelib/Actors/Accelerator";
import { IVector, Vector } from "../../../gamelib/DataTypes/Vector";


export function MoveShip(ship: IShip, timeModifier: number): IShip {
    let newShip: IShip = ship;

    // limit spin
    let spin: number = newShip.spin;
    if (newShip.angle > newShip.maxAngle) {
        spin = -(newShip.angle * newShip.angle);
    } else if (newShip.angle < -newShip.maxAngle) {
        spin = newShip.angle * newShip.angle;
    }

    newShip = RotateAngle(newShip, spin, timeModifier);
    newShip = RotateShape(timeModifier, newShip, spin);
    let thrust: IVector = new Vector(newShip.angle, newShip.forwardThrust);
    let gravity: IVector = new Vector(180, 10);

    // calc force by subtracting windSpeed - ship speed
    let wind: IVector = new Vector(90, Math.max(0, ship.windStrength - ship.Vx));


    newShip = AccelerateWithForces(newShip, timeModifier, [thrust, gravity, wind], newShip.mass);
    newShip = MoveWithVelocity(timeModifier, newShip, newShip.Vx, newShip.Vy);
    return newShip;
}