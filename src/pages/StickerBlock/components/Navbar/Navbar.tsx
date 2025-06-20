import React from 'react';
import { animated, SpringValue, useTransition } from '@react-spring/web';
import { NO_BOUNCE_CONFIG } from '../../constants';
import * as S from './styles';

const btnConfig = {
  from: { opacity: 0 },
  enter: { opacity: 1 },
  leave: { opacity: 0 },
  config: NO_BOUNCE_CONFIG,
};

const AnimatedOpenBtn = animated(S.OpenBtn);
const AnimatedConfirmBtn = animated(S.ConfirmBtn);
const AnimatedDeleteBtnWrap = animated(S.DeleteBtnWrap);
const AnimatedDeleteBtn = animated(S.DeleteBtn);

interface NavbarProps {
  onConfirm: () => void;
  onOpen: () => void;
  hideDeleteBtn: boolean;
  btnSpring: { percent: SpringValue<number> };
}

const Navbar: React.FC<NavbarProps> = ({
  onConfirm,
  onOpen,
  hideDeleteBtn,
  btnSpring,
}) => {
  const openBtnTransitions = useTransition(hideDeleteBtn, btnConfig);
  const deleteBtnTransitions = useTransition(!hideDeleteBtn, btnConfig);
  const confirmBtnTransitions = useTransition(hideDeleteBtn, btnConfig);

  const deleteBtnStyle = {
    backgroundColor: btnSpring.percent.to(
      [100, 0],
      ['rgba(124,135,152,0.16)', 'rgba(255,255,255,1)']
    ),
    color: btnSpring.percent.to(
      [0, 100],
      ['rgba(124,135,152,0.16)', 'rgba(255,255,255,1)']
    ),
  };

  return (
    <S.Navbar>
      <div>
        {openBtnTransitions(
          (style, isVisible) =>
            isVisible && (
              <AnimatedOpenBtn style={style} onClick={onOpen}>
                О
              </AnimatedOpenBtn>
            )
        )}
      </div>

      <div>
        {deleteBtnTransitions(
          (style, isVisible) =>
            isVisible && (
              <AnimatedDeleteBtnWrap style={style}>
                <AnimatedDeleteBtn style={deleteBtnStyle}>X</AnimatedDeleteBtn>
              </AnimatedDeleteBtnWrap>
            )
        )}
      </div>

      <div>
        {confirmBtnTransitions(
          (style, isVisible) =>
            isVisible && (
              <AnimatedConfirmBtn style={style} onClick={onConfirm}>
                Done
              </AnimatedConfirmBtn>
            )
        )}
      </div>
    </S.Navbar>
  );
};

export default Navbar;
