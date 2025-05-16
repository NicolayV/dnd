import React, { useRef } from 'react';
import { useDrag } from '@use-gesture/react';
import { useOutsideClick } from './hooks/useOutsideClick';
import { animated, config, SpringValue, SpringRef } from '@react-spring/web';
import {
  BOTTOM_SHEET_OFFSET,
  DRAG_CANCEL_OFFSET,
  SHEET_OFFSET,
  Z_INDEX,
} from '../../constants';
import * as S from './styles';

const AnimatedSheet = animated(S.Sheet);

interface BottomSheetProps {
  curtainContainerRef: React.RefObject<HTMLDivElement | null>;
  y: SpringValue<number>;
  api: SpringRef<{ y: number }>;
  children: React.ReactNode;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  y,
  api,
  curtainContainerRef,
  children,
}) => {
  const close = () => {
    if (!curtainContainerRef.current) return;
    const { height: containerHeight } =
      curtainContainerRef.current.getBoundingClientRect();

    api.start({
      y: containerHeight - BOTTOM_SHEET_OFFSET + 20,
      immediate: false,
      config: config.stiff,
    });
  };

  const bottomSheetRef = useRef<HTMLDivElement>(null);
  useOutsideClick(bottomSheetRef, () => {
    close();
  });

  const bind = useDrag(
    ({ last, offset: [, offsetY], cancel }) => {
      if (offsetY < -DRAG_CANCEL_OFFSET) cancel();

      if (last) {
        if (!curtainContainerRef.current) return;
        const { height: containerHeight } =
          curtainContainerRef.current.getBoundingClientRect();

        console.log('offsetY', offsetY);
        console.log('containerHeight', containerHeight - 350);

        offsetY > containerHeight - 350
          ? close()
          : api.start({ y: offsetY - 200 + 64, immediate: false });
      }
    },
    {
      from: () => [0, y.get()],
      filterTaps: true,
      bounds: { top: 0 },
      rubberband: true,
    }
  );

  return (
    <AnimatedSheet
      $sheetOffset={SHEET_OFFSET}
      $zIndex={Z_INDEX.bottomSheet}
      style={{ bottom: `-${SHEET_OFFSET + 64 + 20}px`, y }}
      ref={bottomSheetRef}
    >
      <S.SheetHandler onClick={close} {...bind()} />
      {children}
    </AnimatedSheet>
  );
};

export default BottomSheet;
