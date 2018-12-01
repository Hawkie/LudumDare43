import { MoveWithVelocity } from "../../../gamelib/Actors/Movers";
import { RotateShape, RotateAngle } from "../../../gamelib/Actors/Rotators";
import { IShip } from "./ShipComponent";
import { AccelerateWithForces } from "../../../gamelib/Actors/Accelerator";
import { IVector, Vector } from "../../../gamelib/DataTypes/Vector";

// 18 * 10 equals gravity 180, 100, 0 to 240
function LiftAcceleration(temp: number): number {
    return temp*2;
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

    let forceAngle: number = 0;
    if (newShip.side > 0) {
        forceAngle = 90;
    } else if (newShip.side < 0) {
        forceAngle = -90;
    }
    let sideForce: IVector = new Vector(forceAngle, Math.abs(newShip.side)* newShip.mass);

    // const tDiff: number = Math.max(0, 120 - newShip.temp;
    let lift: IVector = new Vector(0, LiftAcceleration(ship.temp));
    // equation between temp and gravity
    // if temp > 120 then balloon is bouyant. if temp < 80 no bouyancy
    let gravity: IVector = new Vector(180, newShip.mass * 10);

    // calc force by subtracting windSpeed - ship speed
    // higher you go faster the speed
    let wind: IVector = new Vector(90, Math.max(0, ship.windStrength - ship.Vx));


    newShip = AccelerateWithForces(newShip, timeModifier, [lift, gravity, wind, sideForce], newShip.mass);
    newShip = MoveWithVelocity(timeModifier, newShip, newShip.Vx, newShip.Vy);
    return newShip;
}