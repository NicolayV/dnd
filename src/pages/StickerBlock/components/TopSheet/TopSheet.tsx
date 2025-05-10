import React from 'react';
import { animated, config, SpringRef, SpringValue } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import * as S from './styles';
import {
  CLOSE_THRESHOLD,
  DRAG_CANCEL_OFFSET,
  NO_BOUNCE_CONFIG,
  SHADOW_OFFSET,
  SHEET_OFFSET,
  SWIPE_OFFSET,
  Z_INDEX,
} from '../../constants';

const AnimatedSheet = animated(S.Sheet);
const AnimatedShadow = animated(S.Shadow);

interface TopSheetProps {
  children: React.ReactNode;
  dragEnabled: boolean;
  shadowEnabled: boolean;
  curtainContainerRef: React.RefObject<HTMLDivElement | null>;
  y: SpringValue<number>;
  api: SpringRef<{ y: number }>;
}

const TopSheet: React.FC<TopSheetProps> = ({
  children,
  dragEnabled,
  shadowEnabled,
  curtainContainerRef,
  api,
  y,
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
      last,
      velocity: [, velocityY],
      direction: [, directionY],
      offset: [, offsetY],
      cancel,
    }) => {
      if (offsetY > DRAG_CANCEL_OFFSET) {
        cancel();
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

  const opacity = y.to((yValue) => {
    const normalized = (yValue + SHADOW_OFFSET) / SHADOW_OFFSET;
    return Math.min(Math.max(normalized, 0), 1);
  });
  const margin = y.to((yValue) => {
    const normalized = (yValue + SHADOW_OFFSET) / SHADOW_OFFSET;
    const clamped = Math.min(Math.max(normalized, 0), 1);

    return `${(clamped * 10).toFixed(0)}px`;
  });

  const shadowDisplay = y.to((yValue) =>
    -yValue >= SHADOW_OFFSET ? 'none' : 'flex'
  );
  const width = y.to((yValue) => {
    const normalized = (yValue + SHADOW_OFFSET) / SHADOW_OFFSET;
    const clamped = Math.min(Math.max(normalized, 0), 1);

    return `calc(100% - ${(clamped * 2 * 10).toFixed(0)}px)`;
  });

  return (
    <>
      <AnimatedSheet
        $sheetOffset={SHEET_OFFSET}
        $swipeOffset={SWIPE_OFFSET}
        $zIndex={Z_INDEX.topSheet}
        {...bind()}
        style={{ display, top: `-${SHEET_OFFSET}px`, y }}
      >
        {children}
      </AnimatedSheet>

      {shadowEnabled && (
        <AnimatedShadow
          style={{
            opacity,
            marginLeft: margin,
            marginRight: margin,
            display: shadowDisplay,
            width,
          }}
        />
      )}
    </>
  );
};

export default TopSheet;
