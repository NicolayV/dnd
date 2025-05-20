import React from 'react';
import * as S from './styles';

import commonImg from '../../assets/commonImg.png';
const amountCommonImg = Array.from({ length: 25 }, (_, i) => i);

interface StickerPackProps {
  stickerPackRef: React.RefObject<HTMLDivElement | null>;
}

const StickerPack: React.FC<StickerPackProps> = ({ stickerPackRef }) => {
  return (
    <S.Board ref={stickerPackRef}>
      {amountCommonImg.map((i) => (
        <S.CommonImg key={i} src={commonImg} />
      ))}
    </S.Board>
  );
};

export default StickerPack;
