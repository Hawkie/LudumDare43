import { DrawContext } from "../../gamelib/1Common/DrawContext";
import { DrawRectangle } from "../../gamelib/Views/RectangleView";
import { circular, sine } from "../../gamelib/Actors/Paths2D/path";

export interface IParticleTrail {
    readonly x: number;
    readonly y: number;
    readonly t: number;
    readonly length: number;
}

export function CreateParticleTrail(x: number, y: number): IParticleTrail {
    let particle: IParticleTrail = {
        x: x,
        y: y,
        t: 0,
        length: 10,
    };
    return particle;
}

export function DisplayParticleTrail(ctx: DrawContext, p: IParticleTrail): void {
    DrawRectangle(ctx, p.x, p.y, 2, 2);
}

export function UpdateParticleTrail(p: IParticleTrail, timeModifier: number): IParticleTrail {
    const newP: IParticleTrail = sine(p, timeModifier, 100, 1);
    return newP;
}