import React from 'react';
import * as S from './styles';

interface OpenButtonProps {
  onClick: () => void;
}

const OpenButton: React.FC<OpenButtonProps> = ({ onClick }) => (
  <S.OpenBtn onClick={onClick}>x</S.OpenBtn>
);

export default OpenButton;
