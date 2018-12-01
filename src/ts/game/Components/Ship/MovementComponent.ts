import { MoveWithVelocity } from "../../../gamelib/Actors/Movers";
import { RotateShape, RotateAngle } from "../../../gamelib/Actors/Rotators";
import { IShip } from "./ShipComponent";
import { AccelerateWithForces } from "../../../gamelib/Actors/Accelerator";
import { IVector, Vector } from "../../../gamelib/DataTypes/Vector";

// 18 * 10 equals gravity 180, 100, 0 to 240
function LiftAcceleration(temp: number): number {
    return Math.min(200, temp * 2);
}

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

    // const tDiff: number = Math.max(0, 120 - newShip.temp;
    let lift: IVector = new Vector(0, LiftAcceleration(ship.temp) - newShip.mass * 10);
    // equation between temp and gravity
    // if temp > 120 then balloon is bouyant. if temp < 80 no bouyancy
    // let gravity: IVector = new Vector(180, newShip.mass * 10);

    // calc force by subtracting windSpeed - ship speed
    // higher you go faster the speed

    // higher you go faster the wind is
    let acc: IVector = new Vector(90, newShip.acc);

    newShip = AccelerateWithForces(newShip, timeModifier, [lift], newShip.mass);
    // wind, side forces don't act on mass because they are friction on balloon
    newShip = AccelerateWithForces(newShip, timeModifier, [acc], 1);
    newShip = MoveWithVelocity(timeModifier, newShip, newShip.Vx, newShip.Vy);
    return newShip;
}