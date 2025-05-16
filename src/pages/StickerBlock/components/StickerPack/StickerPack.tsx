import React from 'react';
import * as S from './styles';

import commonImg from '../../assets/commonImg.png';
import { useScroll } from '@use-gesture/react';
const amountCommonImg = Array.from({ length: 25 }, (_, i) => i);

interface StickerPackProps {
  stickerPackRef: React.RefObject<HTMLDivElement | null>;
}

const StickerPack: React.FC<StickerPackProps> = ({ stickerPackRef }) => {
  useScroll(
    ({ xy: [, y] }) => {
      // TODO add close logic when scroll in top position
      console.log('scroll', y);
    },
    {
      target: stickerPackRef,
    }
  );

  return (
    <S.Board ref={stickerPackRef}>
      {amountCommonImg.map((i) => (
        <S.CommonImg key={i} src={commonImg} />
      ))}
    </S.Board>
  );
};

export default StickerPack;
