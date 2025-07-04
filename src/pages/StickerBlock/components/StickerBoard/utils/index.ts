import { to as interpolate, SpringValue } from '@react-spring/web';

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
  percent: { x: number; y: number },
  containerRect: DOMRect
): { x: number; y: number } => ({
  x: (percent.x / 100) * containerRect.width,
  y: (percent.y / 100) * containerRect.height,
});

export const pixelsToPercent = (
  pixelOffset: [number, number],
  containerRect: DOMRect
): { x: number; y: number } => {
  const [xPx, yPx] = pixelOffset;

  return {
    x: (xPx / containerRect.width) * 100,
    y: (yPx / containerRect.height) * 100,
  };
};
