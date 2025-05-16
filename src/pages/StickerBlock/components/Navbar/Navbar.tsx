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

const buttonConfig = {
  from: { opacity: 0 },
  enter: { opacity: 1 },
  leave: { opacity: 0 },
  config: { ...NO_BOUNCE_CONFIG, duration: 100 },
};

const AnimatedNavbar = animated(S.Navbar);
const AnimatedBtnToolbar = animated(S.BtnToolbar);

interface NavbarProps {
  onConfirm: () => void;
  onAddClick: () => void;
  isNavbarOpen: boolean;
  dragStickerId: number | null;
}

const Navbar: React.FC<NavbarProps> = ({
  onConfirm,
  onAddClick,
  isNavbarOpen,
  dragStickerId,
}) => {
  const navTransitions = useTransition(isNavbarOpen, transitionConfig);
  const isDragging = dragStickerId !== null; // TODO improve
  const buttonTransitions = useTransition(isDragging, buttonConfig);

  return (
    <>
      {navTransitions(
        (navStyles, navVisible) =>
          navVisible && (
            <AnimatedNavbar style={navStyles}>
              {buttonTransitions((btnStyles, dragging) => (
                <AnimatedBtnToolbar style={btnStyles}>
                  {dragging ? (
                    <button onClick={() => {}}>X</button>
                  ) : (
                    <>
                      <button onClick={onAddClick}>O</button>
                      <button onClick={onConfirm}>готово</button>
                    </>
                  )}
                </AnimatedBtnToolbar>
              ))}
            </AnimatedNavbar>
          )
      )}
    </>
  );
};

export default Navbar;
