import { ICoordinate } from "../../DataTypes/Coordinate";

export interface ITime {
    t: number;
}

export interface ITimeDependentPath extends ICoordinate {
    t: number;
}

export function time<TLocated extends ITime>(located: TLocated,
    timeModifier: number): TLocated {
   const t: number = located.t + timeModifier;
   return Object.assign({}, located, {
       t: t,
   });
}

export function circular<TLocated extends ITime>(located: TLocated,
     timeModifier: number,
     amp: number,
     freq: number): TLocated {
    const t: number = located.t + timeModifier;
    return Object.assign({}, located, {
        x: amp * Math.sin(t * freq),
        y: amp * Math.cos(t * freq),
        t: t,
    });
}

export function sine<TLocated extends ITimeDependentPath>(located: TLocated,
     timeModifier: number,
     amp: number,
     freq: number): TLocated {
    const t: number = located.t + timeModifier;
    return Object.assign({}, located, {
        t: t,
        x: amp * t * freq,
        y: amp * Math.sin(t * freq)
    });
}