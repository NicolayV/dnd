import React from 'react';
import * as S from './styles';

import clever from '../../assets/clever.png';
import hands from '../../assets/hands.png';

const stickersSrc = [
  { id: '1', src: clever },
  { id: '2', src: hands },
];

const commonPosition = {
  x: 20,
  y: 20,
  scale: 1,
  rotateZ: 0,
};

import { StickerData } from '../StickerBoard/hooks/useStickerData';
const amountCommonImg = Array.from(
  { length: 25 },
  (_, idx) => stickersSrc[idx % stickersSrc.length]
);

interface StickerPackProps {
  stickerPackRef: React.RefObject<HTMLDivElement | null>;
  addSticker: (stickerData: StickerData) => void;
}

const StickerPack: React.FC<StickerPackProps> = ({
  stickerPackRef,
  addSticker,
}) => {
  return (
    <S.Board ref={stickerPackRef}>
      {amountCommonImg.map((el, index) => (
        <S.CommonImg
          key={index}
          src={el.src}
          onClick={() => {
            addSticker({
              id: el.id,
              src: el.src,
              ...commonPosition,
            });
          }}
        />
      ))}
    </S.Board>
  );
};

export default StickerPack;
