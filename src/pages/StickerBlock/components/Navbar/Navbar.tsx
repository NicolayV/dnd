import React from 'react';
import * as S from './styles';

interface NavbarProps {
  onOpen: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpen }) => (
  <S.Navbar>
    <S.BtnToolbar>
      <button />
      <button onClick={onOpen}>готово</button>
    </S.BtnToolbar>

    <S.HomeIndicator>
      <div />
    </S.HomeIndicator>
  </S.Navbar>
);

export default Navbar;
