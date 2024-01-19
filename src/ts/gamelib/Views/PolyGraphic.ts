import { DrawContext } from "../../../ts/gamelib/1Common/DrawContext";
import { IImageElement } from "../Elements/ImageElement";
import { IShape } from "../DataTypes/Shape";

export function DrawPolyGraphic(
  ctx: DrawContext,
  x: number,
  y: number,
  shape: IShape,
  graphic: IImageElement,
): void {
  if (graphic.loaded) {
    let xo: number = x + shape.offset.x;
    let yo: number = y + shape.offset.y;
    ctx.drawP(xo, yo, shape.points);
    ctx.save();
    let fillStyle: CanvasPattern = ctx.createPattern(graphic.img);
    ctx.fill(fillStyle);
    ctx.restore();
  }
}
