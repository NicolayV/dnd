import styled, { css } from 'styled-components';

export const Container = styled.div`
  box-sizing: border-box;
  width: 100vw;
  height: 100dvh;
  background: #f4f5f6;
  padding: 24px;
`;

export const CardWrapper = styled.div`
  box-sizing: border-box;
  width: 600px;

  max-height: 920px;
  height: 100%;

  position: relative;
  margin: 0 auto;
`;

const cardBase = css<{ $isActive: boolean }>`
  position: absolute;
  left: 50%;
  border-radius: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  touch-action: none;
  user-select: none;

  /* Base dimensions - inactive state */
  width: 520px;
  height: 773px;

  /* GPU-optimized transforms */
  will-change: transform;
  transform: translateX(-50%) translateZ(0)
    ${({ $isActive }) =>
      $isActive
        ? 'scaleX(1.154) scaleY(1.154)' /* 600/520 = 1.154, active scaling */
        : 'scaleX(1) scaleY(1)'};

  z-index: ${({ $isActive }) => ($isActive ? 1 : 0)};

  transition:
    background-color 0.3s,
    transform 0.3s;
`;

export const TopCard = styled.div<{ $isActive: boolean }>`
  ${cardBase}
  top: 0;
  background-color: #fff;
`;

export const BottomCard = styled.div<{ $isActive: boolean }>`
  ${cardBase}
  bottom: 0;
  background-color: ${({ $isActive }) => ($isActive ? '#22252A' : '#E3E4E6')};

  &::before {
    content: '';
    background-color: #e5e7ea;
    border-radius: 4px;
    width: 50px;
    height: 4px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: -10px;
  }
`;
