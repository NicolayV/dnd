import { to as interpolate, SpringValue } from '@react-spring/web';
import { PercentPosition } from '../StickerBoard';

export const createTransform = ({
  x,
  y,
  scale,
  rotateZ,
}: Record<'x' | 'y' | 'scale' | 'rotateZ', SpringValue<number>>) =>
  interpolate(
    [x, y, scale, rotateZ],
    (xPx, yPx, sVal, rDeg) =>
      `translate(-50%, -50%) translate(${xPx}px, ${yPx}px) scale(${sVal}) rotateZ(${rDeg}deg)`
  );

export const percentToPixels = (
  percent: PercentPosition,
  containerRect: DOMRect
): { xPx: number; yPx: number } => ({
  xPx: (percent.x / 100) * containerRect.width,
  yPx: (percent.y / 100) * containerRect.height,
});

export const pixelsToPercent = (
  pixelOffset: [number, number],
  containerRect: DOMRect
): PercentPosition => {
  const [xPx, yPx] = pixelOffset;

  return {
    x: (xPx / containerRect.width) * 100,
    y: (yPx / containerRect.height) * 100,
  };
};
