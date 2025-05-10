import React from 'react';
import * as S from './styles';

import commonImg from '../../assets/commonImg.png';
const amountCommonImg = Array.from({ length: 25 }, (_, i) => i);

const StickerPack: React.FC = () => {
  return (
    <S.Board>
      {amountCommonImg.map((i) => (
        <S.CommonImg key={i} src={commonImg} />
      ))}
    </S.Board>
  );
};

export default StickerPack;
