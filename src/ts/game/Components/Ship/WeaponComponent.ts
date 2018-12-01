import { MoveWithVelocity } from "../../../gamelib/Actors/Movers";
import { Coordinate } from "../../../gamelib/DataTypes/Coordinate";
import { Transforms } from "../../../gamelib/Physics/Transforms";
import { DrawContext } from "../../../gamelib/1Common/DrawContext";
import { IParticle, DisplayField } from "../../../gamelib/Components/ParticleFieldComponent";
import { FilterParticles } from "../../../gamelib/Actors/FieldParticleRemover";
import { AccelerateWithForces } from "../../../gamelib/Actors/Accelerator";
import { IVector } from "../../../gamelib/DataTypes/Vector";
import { DrawGraphic } from "../../../gamelib/Views/GraphicView";
import { Game } from "../../../gamelib/1Common/Game";

export interface IWeapon {
    readonly bullets: ReadonlyArray<IParticle>;
    readonly lastFired: number;
    readonly fired: boolean;
    readonly bulletVelocity: number;
    readonly bulletLifetime: number;
    readonly reloadTimeSec: number;
    readonly remaining: number;
}

export function CreateWeapon(reloadTimeSec: number, bulletVelocity: number): IWeapon {
    return {
        bullets: [],
        lastFired: undefined,
        fired: false,
        bulletLifetime: 5,
        bulletVelocity: bulletVelocity,
        reloadTimeSec: reloadTimeSec,
        remaining: 8,
    };
}

export function DisplayWeapon(ctx: DrawContext, weapon: IWeapon): void {
    weapon.bullets.forEach(p =>  DrawGraphic(ctx, p.x-15, p.y-15, Game.assets.fallingMan));
}

export function RemoveBullet(weapon: IWeapon, bulletIndex: number): IWeapon {
    let b: IParticle[] = weapon.bullets.map(b => b);
    b.splice(bulletIndex, 1);
    return {...weapon,
        bullets: b
    };
}

export function PullTrigger(timeModifier: number, weapon: IWeapon,
        fireWeaponIntent: boolean,
        x: number, y: number, Vx: number, Vy:number, angle: number, bulletVelocity: number): IWeapon {
    // local varibales
    let reloaded: boolean = false;
    let fired: boolean = false;
    let remaining: number = weapon.remaining;
    // read object properties
    let bullets: IParticle[] = weapon.bullets.map(b => b);
    let lastFired: number = weapon.lastFired;
    const now:number = Date.now();
    if (fireWeaponIntent) {
        if (lastFired === undefined
            // todo move this to weapon
            || ((now - lastFired) / 1000) > weapon.reloadTimeSec) {
            if (remaining > 0) {
                reloaded = true;
                lastFired = now;
                remaining--;
            }
        }
    }
    if (reloaded) {
        fired = true;
        let velocity: Coordinate = Transforms.VectorToCartesian(angle, bulletVelocity);
        let bullet: IParticle = {
            x: x,
            y: y,
            Vx: Vx + velocity.x,
            Vy: Vy + velocity.y,
            born: now,
            size: 2,
        };
        // add bullets
        bullets.push(bullet);
    }

    // remove old bullets
    bullets = FilterParticles(bullets, now, weapon.bulletLifetime);
    bullets = bullets.map((b)=> MoveWithVelocity(timeModifier, b, b.Vx, b.Vy));
    let gravity: IVector = { angle: 180, length: 50 };
    bullets = bullets.map(b => AccelerateWithForces(b, timeModifier, [gravity], 1));

    // move bullets and set fired
    return {...weapon,
        bullets: bullets,
        fired: fired,
        lastFired: lastFired,
        remaining: remaining,
    };
}