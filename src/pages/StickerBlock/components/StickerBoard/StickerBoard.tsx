import React, { useRef, useLayoutEffect, useEffect } from 'react';
import { animated, SpringRef, useSprings } from '@react-spring/web';
import { createUseGesture, dragAction, pinchAction } from '@use-gesture/react';
import { useDisableNativeGestures } from './hooks/useDisableNativeGestures';
import { StickerData } from './hooks/useStickerData';
import {
  createTransform,
  isInRange,
  percentToPixels,
  pixelsToPercent,
} from './utils';
import { DRAG_CONFIG, HALF_CARD_SIZE } from './constants';
import * as S from './styles';

const AnimatedCard = animated(S.Card);
const useGesture = createUseGesture([dragAction, pinchAction]);

interface StickerBoardProps {
  isEnabled: boolean;
  onStickerDragStart: (val: number) => void;
  onStickerDragEnd: () => void;
  btnApi: SpringRef<{ percent: number }>;
  stickerDataList: StickerData[];
  updSticker: (stickerData: StickerData, idx: number) => void;
  deleteSticker: (idx: number) => void;
}

const StickerBoard: React.FC<StickerBoardProps> = ({
  isEnabled,
  onStickerDragStart,
  onStickerDragEnd,
  btnApi,
  stickerDataList,
  updSticker,
  //   deleteSticker,
}) => {
  useDisableNativeGestures();
  const containerRef = useRef<HTMLDivElement>(null);

  const [springProps, springApi] = useSprings(stickerDataList.length, () => ({
    x: 0,
    y: 0,
    scale: 1,
    rotateZ: 0,
  }));

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    springApi.set((i) => {
      const currentStickerData = stickerDataList[i];
      const pos = percentToPixels(currentStickerData, containerRect);

      return { x: pos.x, y: pos.y };
    });
  }, [stickerDataList]);

  //   Initialize position on first render
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    springApi.set((i) => {
      const currentStickerData = stickerDataList[i];
      return percentToPixels(currentStickerData, containerRect);
    });
  }, []);

  const bind = useGesture(
    {
      onDragStart: ({ args: [idx], pinching, cancel, offset: [, y] }) => {
        if (pinching) return cancel();
        onStickerDragStart(Number(idx));

        const container = containerRef.current;
        if (!container) return;
        const containerHeight = container.getBoundingClientRect().height;
        const startOffset = containerHeight - y;
        const startAnimated = startOffset < 300;

        if (startAnimated) {
          const progress = Math.trunc(startOffset / 3);
          btnApi.start({ percent: progress, immediate: true });
        } else {
          btnApi.start({ percent: 100, immediate: true });
        }
      },

      onDrag: ({
        args: [idx],
        pinching,
        cancel,
        offset: [x, y],
        touches,
        xy,
      }) => {
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

        const container = containerRef.current;
        if (!container) return;
        // const { height, width } = container.getBoundingClientRect();
        // const containerHeight = height;
        // const startOffset = containerHeight - y;
        // const startAnimated = startOffset < 300;
        // if (startAnimated) {
        //   const progress = Math.trunc(startOffset / 3);
        //   btnApi.start({ percent: progress });
        // }
        const heightRange = { min: 870, max: 910 };
        const widthRange = { min: 180, max: 250 };
        const activeDeleteBtn = isInRange(heightRange, widthRange, {
          height: xy[1],
          width: xy[0],
        });

        console.log('inRange', activeDeleteBtn);
        console.log('Текущие координаты:', xy);
        console.log('Число пальцев на экране:', touches);
        if (activeDeleteBtn) {
          btnApi.start({ percent: 0 });
        } else {
          btnApi.start({ percent: 100 });
        }
      },

      onDragEnd: ({ args: [idx], offset }) => {
        const container = containerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const newPercent = pixelsToPercent(offset, rect);

        const newCurrentStickerData = {
          ...stickerDataList[idx],
          ...newPercent,
        };

        updSticker(newCurrentStickerData, idx);
        onStickerDragEnd();

        // const containerHeight = container.getBoundingClientRect().height;
        // const startOffset = containerHeight - offset[1];
        // const startAnimated = startOffset < 300;

        // if (startAnimated) {
        //   const progress = Math.trunc(startOffset / 3);
        //   if (progress === 0) {
        //     deleteSticker(idx);
        //   }
        // }
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
            bottom: height,
          };
        },
        rubberband: true,
      },
      enabled: isEnabled,
    }
  );

  // Recalculate on container resize
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleResize = () => {
      const containerRect = container.getBoundingClientRect();
      springApi.set((i) => {
        const currentStickerData = stickerDataList[i];
        return percentToPixels(currentStickerData, containerRect);
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
          key={stickerDataList[i].id + i}
          {...bind(i)}
          style={{ transform: createTransform(props) }}
        >
          <S.Img src={stickerDataList[i].src} draggable={false} />
        </AnimatedCard>
      ))}
    </S.Container>
  );
};

export default StickerBoard;
