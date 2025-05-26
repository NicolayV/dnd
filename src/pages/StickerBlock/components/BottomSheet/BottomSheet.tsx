import React, { useRef } from 'react';
import { useOutsideClick } from './hooks/useOutsideClick';
import { animated, config, SpringValue, SpringRef } from '@react-spring/web';
import {
  BOTTOM_SHEET_CLOSE_OFFSET,
  BOTTOM_SHEET_OFFSET,
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
      y: containerHeight - BOTTOM_SHEET_CLOSE_OFFSET,
      immediate: false,
      config: config.stiff,
    });
  };

  const bottomSheetRef = useRef<HTMLDivElement>(null);
  useOutsideClick(bottomSheetRef, () => {
    close();
  });

  return (
    <AnimatedSheet
      $sheetOffset={SHEET_OFFSET}
      $zIndex={Z_INDEX.bottomSheet}
      style={{ bottom: `-${BOTTOM_SHEET_OFFSET}px`, y }}
      ref={bottomSheetRef}
    >
      <S.SheetHandler onClick={close} />
      {children}
    </AnimatedSheet>
  );
};

export default BottomSheet;
