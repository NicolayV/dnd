import React, { useLayoutEffect, useRef, useState } from 'react';
import { useSpring } from '@react-spring/web';
import {
  TopSheet,
  Toolbar,
  StickerBoard,
  Navbar,
  OpenButton,
  BottomSheet,
} from './components';
import * as S from './styles';
import {
  BOTTOM_SHEET_OFFSET,
  NAVBAR_OFFSET,
  NO_BOUNCE_CONFIG,
} from './constants';
import StickerPack from './components/StickerPack/StickerPack';

const images = [
  { id: '1', x: 60.9304, y: 80.9129 },
  { id: '2', x: 65.9304, y: 89.9129 },
  { id: '3', x: 65.9304, y: 79.9129 },
];

const StickerBlock: React.FC = () => {
  const curtainContainerRef = useRef<HTMLDivElement | null>(null);

  const [topSheetEnabled, setTopSheetEnabled] = useState(true);
  const [stickerBoardEnabled, setStickerBoardEnabled] = useState(false);
  const [navbarOpen, setNavbarOpen] = useState(false);

  const [{ y: topY }, topApi] = useSpring(() => ({ y: 0 }));
  const [{ y: bottomY }, bottomApi] = useSpring(() => ({ y: 0 }));

  useLayoutEffect(() => {
    if (curtainContainerRef.current) {
      const { height } = curtainContainerRef.current.getBoundingClientRect();

      bottomApi.start({
        y: height - BOTTOM_SHEET_OFFSET,
        immediate: true,
      });
    }
  }, []);

  const openTopSheet = (y: number = 0) =>
    topApi.start({ y, config: NO_BOUNCE_CONFIG });

  const handleEdit = () => {
    openTopSheet(NAVBAR_OFFSET);

    setTopSheetEnabled(false);
    setStickerBoardEnabled(true);

    setNavbarOpen(true);
  };

  const handleOpenTopSheet = () => {
    openTopSheet();

    setTopSheetEnabled(true);
    setStickerBoardEnabled(false);

    setNavbarOpen(false);
  };

  const handleOpenBottomSheet = () => {
    bottomApi.start({
      y: 0,
      immediate: false,
      config: NO_BOUNCE_CONFIG,
    });

    setStickerBoardEnabled(false);
  };

  return (
    <S.RootContainer>
      <S.CurtainContainer ref={curtainContainerRef}>
        <TopSheet
          api={topApi}
          y={topY}
          dragEnabled={topSheetEnabled}
          shadowEnabled={!navbarOpen}
          curtainContainerRef={curtainContainerRef}
        >
          <Toolbar onEdit={handleEdit} />
          <StickerBoard isEnabled={stickerBoardEnabled} images={images} />
        </TopSheet>

        <Navbar
          isNavbarOpen={navbarOpen}
          onConfirm={handleOpenTopSheet}
          onAddClick={handleOpenBottomSheet}
        />

        {navbarOpen && (
          <BottomSheet
            api={bottomApi}
            y={bottomY}
            curtainContainerRef={curtainContainerRef}
          >
            <StickerPack />
          </BottomSheet>
        )}

        <OpenButton onClick={handleOpenTopSheet} />
      </S.CurtainContainer>
    </S.RootContainer>
  );
};

export default StickerBlock;
