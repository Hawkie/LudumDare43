import { DrawContext } from "../../gamelib/1Common/DrawContext";
import { DrawText } from "../../gamelib/Views/TextView";

// map title to text view
export function DisplayTitle(ctx: DrawContext, title: string): void {
    DrawText(ctx, 10, 20, title, "Arial", 18);
}


export function DisplayText(ctx: DrawContext, title: string, x: number, y: number): void {
    DrawText(ctx, x, y, title, "Arial", 10);
}
