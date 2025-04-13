import React, { useRef, useState } from 'react';
import { useSpring } from '@react-spring/web';
import {
  TopSheet,
  Toolbar,
  StickerBoard,
  Navbar,
  OpenButton,
} from './components';
import * as S from './styles';

const images = [
  { id: '1', x: 60.9304, y: 80.9129 },
  { id: '2', x: 65.9304, y: 89.9129 },
  { id: '3', x: 65.9304, y: 79.9129 },
];

const NO_BOUNCE_CONFIG = { tension: 200, friction: 30, clamp: true };
const NAVBAR_OFFSET = -60;

const StickerBlock: React.FC = () => {
  const curtainContainerRef = useRef<HTMLDivElement | null>(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const [{ y }, api] = useSpring(() => ({ y: 0 }));

  const openTopSheet = (y: number = 0) =>
    api.start({ y, config: NO_BOUNCE_CONFIG });

  const handleEdit = () => {
    openTopSheet(NAVBAR_OFFSET);
    setIsEnabled(true);
  };

  const handleOpen = () => {
    openTopSheet();
    setIsEnabled(false);
  };

  return (
    <S.RootContainer>
      <S.CurtainContainer ref={curtainContainerRef}>
        <TopSheet
          api={api}
          y={y}
          dragEnabled={!isEnabled}
          curtainContainerRef={curtainContainerRef}
        >
          <Toolbar onEdit={handleEdit} />
          <StickerBoard isEnabled={isEnabled} images={images} />
        </TopSheet>

        {isEnabled && <Navbar onOpen={handleOpen} />}
        <OpenButton onClick={handleOpen} />
      </S.CurtainContainer>
    </S.RootContainer>
  );
};

export default StickerBlock;
