import React from 'react';
import { animated, config, SpringRef, SpringValue } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import * as S from './styles';
import {
  CLOSE_THRESHOLD,
  DRAG_CANCEL_OFFSET,
  NO_BOUNCE_CONFIG,
  SHEET_OFFSET,
  SWIPE_OFFSET,
  Z_INDEX,
} from '../../constants';

const AnimatedSheet = animated(S.Sheet);

interface TopSheetProps {
  children: React.ReactNode;
  dragEnabled: boolean;
  curtainContainerRef: React.RefObject<HTMLDivElement | null>;
  y: SpringValue<number>;
  api: SpringRef<{ y: number }>;
  onDragStart: (directionY: number) => void;
}

const TopSheet: React.FC<TopSheetProps> = ({
  children,
  dragEnabled,
  curtainContainerRef,
  api,
  y,
  onDragStart,
}) => {
  const open = () => {
    api.start({
      y: 0,
      immediate: false,
      config: NO_BOUNCE_CONFIG,
    });
  };

  const close = (velocity = 0) => {
    if (!curtainContainerRef.current) return;
    const { height: containerHeight } =
      curtainContainerRef.current.getBoundingClientRect();

    api.start({
      y: -containerHeight,
      immediate: false,
      config: { ...config.stiff, velocity },
    });
  };

  const bind = useDrag(
    ({
      first,
      last,
      velocity: [, velocityY],
      direction: [, directionY],
      offset: [, offsetY],
      cancel,
    }) => {
      if (offsetY > DRAG_CANCEL_OFFSET) {
        cancel();
      }

      if (first) {
        onDragStart(directionY);
      }

      if (last) {
        if (!curtainContainerRef.current) return;
        const { height: containerHeight } =
          curtainContainerRef.current.getBoundingClientRect();

        const isCloseOrOpen =
          -offsetY > containerHeight * CLOSE_THRESHOLD ||
          (velocityY > CLOSE_THRESHOLD && directionY < 0);

        isCloseOrOpen ? close(velocityY) : open();
      } else api.start({ y: offsetY, immediate: true });
    },
    {
      enabled: dragEnabled,
      from: () => [0, y.get()],
      filterTaps: true,
      bounds: {
        bottom: 0,
      },
      rubberband: true,
    }
  );

  const display = y.to((yValue) => {
    const { current } = curtainContainerRef;
    if (current == null) return 'flex';

    return -yValue === current.getBoundingClientRect().height ? 'none' : 'flex';
  });

  return (
    <AnimatedSheet
      $sheetOffset={SHEET_OFFSET}
      $swipeOffset={SWIPE_OFFSET}
      $zIndex={Z_INDEX.topSheet}
      {...bind()}
      style={{ display, top: `-${SHEET_OFFSET}px`, y }}
    >
      {children}
    </AnimatedSheet>
  );
};

export default TopSheet;
