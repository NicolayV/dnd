import React, { useLayoutEffect, useRef, useState } from 'react';
import { useSpring } from '@react-spring/web';
import {
  TopSheet,
  Toolbar,
  StickerBoard,
  Navbar,
  OpenButton,
  BottomSheet,
  StickerPack,
} from './components';
import * as S from './styles';
import {
  BOTTOM_SHEET_CLOSE_OFFSET,
  BOTTOM_SHEET_OFFSET,
  BOTTOM_SHEET_OPEN_OFFSET,
  NAVBAR_OFFSET,
  NO_BOUNCE_CONFIG,
} from './constants';
import {
  StickerData,
  useStickerData,
} from './components/StickerBoard/hooks/useStickerData';
import CardLayoutWrapper from './components/CardLayoutWrapper/CardLayoutWrapper';

const StickerBlock: React.FC = () => {
  const curtainContainerRef = useRef<HTMLDivElement | null>(null);
  const stickerPackRef = useRef<HTMLDivElement>(null);

  const { stickerDataList, updSticker, deleteSticker, addSticker } =
    useStickerData();

  const [topSheetEnabled, setTopSheetEnabled] = useState(true);
  const [topSheetDirection, setSheetDirection] = useState(0);
  const [stickerBoardEnabled, setStickerBoardEnabled] = useState(false);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [dragStickerId, setDragStickerId] = useState<number | null>(null);

  const [{ y: topY }, topSheetApi] = useSpring(() => ({ y: 0 }));
  const [{ y: bottomY }, bottomSheetApi] = useSpring(() => ({ y: 0 }));
  const [btnSpring, btnApi] = useSpring(() => ({ percent: 0 }));

  useLayoutEffect(() => {
    if (curtainContainerRef.current) {
      const { height } = curtainContainerRef.current.getBoundingClientRect();

      bottomSheetApi.start({
        y: height - BOTTOM_SHEET_OFFSET,
        immediate: true,
      });
    }
  }, []);

  const openTopSheet = (y: number = 0) =>
    topSheetApi.start({ y, config: NO_BOUNCE_CONFIG });

  const moveBottomSheet = (y: number = 0) =>
    bottomSheetApi.start({ y, config: NO_BOUNCE_CONFIG });

  const handleEdit = () => {
    setSheetDirection(0);

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
    moveBottomSheet(-BOTTOM_SHEET_OPEN_OFFSET);
    setStickerBoardEnabled(true);
  };

  const handleAddSticker = (stickerData: StickerData) => {
    if (!curtainContainerRef.current) return;
    const { height } = curtainContainerRef.current.getBoundingClientRect();

    addSticker(stickerData);
    moveBottomSheet(height - BOTTOM_SHEET_CLOSE_OFFSET);
    setStickerBoardEnabled(true);
  };

  return (
    <S.RootContainer>
      <S.CurtainContainer ref={curtainContainerRef}>
        <TopSheet
          api={topSheetApi}
          y={topY}
          dragEnabled={topSheetEnabled}
          curtainContainerRef={curtainContainerRef}
          onDragStart={setSheetDirection}
        >
          <Toolbar onEdit={handleEdit} />

          <StickerBoard
            isEnabled={stickerBoardEnabled}
            onStickerDragEnd={() => setDragStickerId(null)}
            onStickerDragStart={(id) => setDragStickerId(id)}
            btnApi={btnApi}
            stickerDataList={stickerDataList}
            updSticker={updSticker}
            deleteSticker={deleteSticker}
          />
        </TopSheet>

        <CardLayoutWrapper
          y={topY}
          curtainContainerRef={curtainContainerRef}
          navbarOpen={navbarOpen}
          topSheetDirection={topSheetDirection}
        >
          <div>div</div>
        </CardLayoutWrapper>

        <Navbar
          onConfirm={handleOpenTopSheet}
          onOpen={handleOpenBottomSheet}
          hideDeleteBtn={dragStickerId === null}
          btnSpring={btnSpring}
        />
        {navbarOpen && (
          <BottomSheet
            api={bottomSheetApi}
            y={bottomY}
            curtainContainerRef={curtainContainerRef}
          >
            <StickerPack
              stickerPackRef={stickerPackRef}
              addSticker={handleAddSticker}
            />
          </BottomSheet>
        )}

        <OpenButton onClick={handleOpenTopSheet} />
      </S.CurtainContainer>
    </S.RootContainer>
  );
};

export default StickerBlock;
