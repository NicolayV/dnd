import React from 'react';
import * as S from './styles';
import { animated, useTransition } from '@react-spring/web';
import { NO_BOUNCE_CONFIG } from '../../constants';

const transitionConfig = {
  from: { transform: 'translateY(100%)', opacity: 0 },
  enter: { transform: 'translateY(0%)', opacity: 1 },
  leave: { transform: 'translateY(100%)', opacity: 0 },
  config: NO_BOUNCE_CONFIG,
};

const AnimatedNavbar = animated(S.Navbar);

interface NavbarProps {
  onConfirm: () => void;
  onAddClick: () => void;
  isNavbarOpen: boolean;
}

const Navbar: React.FC<NavbarProps> = ({
  onConfirm,
  onAddClick,
  isNavbarOpen,
}) => {
  const transitions = useTransition(isNavbarOpen, transitionConfig);

  return (
    <>
      {transitions(
        (styles, visible) =>
          visible && (
            <AnimatedNavbar style={styles}>
              <S.BtnToolbar>
                <button onClick={onAddClick}>+</button>
                <button onClick={onConfirm}>готово</button>
              </S.BtnToolbar>
            </AnimatedNavbar>
          )
      )}
    </>
  );
};

export default Navbar;
