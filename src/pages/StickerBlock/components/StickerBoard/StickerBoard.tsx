import React, { useRef, useLayoutEffect, useEffect } from 'react';
import { animated, useSprings } from '@react-spring/web';
import { createUseGesture, dragAction, pinchAction } from '@use-gesture/react';
import { useDisableNativeGestures } from './hooks/useDisableNativeGestures';
import { createTransform, percentToPixels, pixelsToPercent } from './utils';
import * as S from './styles';

import reactLogo from '../../assets/react.svg';
import clever from '../../assets/clever.png';
import hands from '../../assets/hands.png';

const srcImg = [reactLogo, clever, hands];

import { DRAG_CONFIG, HALF_CARD_SIZE } from './constants';

const AnimatedCard = animated(S.Card);

const useGesture = createUseGesture([dragAction, pinchAction]);

export type PercentPosition = { x: number; y: number };
interface ImageData {
  id: string;
  x: number;
  y: number;
}
const PERCENT_POSITIONS_KEY = 'gesturePercentPositions';
const getStoredPositions = (): Record<string, PercentPosition> => {
  try {
    const raw = sessionStorage.getItem(PERCENT_POSITIONS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

const saveStoredPositions = (map: Record<string, PercentPosition>) => {
  sessionStorage.setItem(PERCENT_POSITIONS_KEY, JSON.stringify(map));
};

interface StickerBoardProps {
  images: ImageData[];
  isEnabled: boolean;
}

const StickerBoard: React.FC<StickerBoardProps> = ({ images, isEnabled }) => {
  useDisableNativeGestures();

  const containerRef = useRef<HTMLDivElement>(null);
  const savedPercentsRef =
    useRef<Record<string, PercentPosition>>(getStoredPositions());

  const [springProps, springApi] = useSprings(images.length, () => ({
    x: 0,
    y: 0,
    scale: 1,
    rotateZ: 0,
  }));

  const bind = useGesture(
    {
      onDrag: ({ args: [idx], pinching, cancel, offset: [x, y] }) => {
        if (pinching) return cancel();

        springApi.start((i) =>
          i === idx
            ? {
                x,
                y,
                immediate: false,
                config: DRAG_CONFIG,
              }
            : {}
        );
      },

      onDragEnd: ({ args: [idx], offset }) => {
        const container = containerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const newPercent = pixelsToPercent(offset, rect);

        savedPercentsRef.current = {
          ...savedPercentsRef.current,
          [images[idx].id]: newPercent,
        };
        saveStoredPositions(savedPercentsRef.current);
      },
    },
    {
      drag: {
        from: ({ args: [idx] }) => [
          springProps[idx].x.get(),
          springProps[idx].y.get(),
        ],
        bounds: () => {
          const { width, height } =
            containerRef.current!.getBoundingClientRect();

          return {
            left: 0,
            right: width,
            top: HALF_CARD_SIZE,
            bottom: height - HALF_CARD_SIZE,
          };
        },
      },
      enabled: isEnabled,
    }
  );

  // Initialize position on first render
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const initialPercents = images.map((img) =>
      savedPercentsRef.current[img.id]
        ? savedPercentsRef.current[img.id]
        : { x: img.x, y: img.y }
    );

    springApi.set((i) => {
      const pct = initialPercents[i];
      const { xPx, yPx } = percentToPixels(pct, containerRect);
      return { x: xPx, y: yPx };
    });
  }, []);

  // Recalculate on container resize
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleResize = () => {
      const containerRect = container.getBoundingClientRect();
      const initialPercents = images.map((img) =>
        savedPercentsRef.current[img.id]
          ? savedPercentsRef.current[img.id]
          : { x: img.x, y: img.y }
      );

      springApi.set((i) => {
        const pct = initialPercents[i];
        const { xPx, yPx } = percentToPixels(pct, containerRect);
        return { x: xPx, y: yPx };
      });
    };

    const observer = new ResizeObserver(handleResize);
    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  return (
    <S.Container ref={containerRef}>
      {springProps.map((props, i) => (
        <AnimatedCard
          key={images[i].id}
          {...bind(i)}
          style={{ transform: createTransform(props) }}
        >
          <S.Img src={srcImg[i]} draggable={false} />
        </AnimatedCard>
      ))}
    </S.Container>
  );
};

export default StickerBoard;
