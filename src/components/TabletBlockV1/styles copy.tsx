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
  transform: translateX(-50%);
  border-radius: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  touch-action: none;
  user-select: none;

  z-index: ${({ $isActive }) => ($isActive ? 1 : 0)};
  width: ${({ $isActive }) => ($isActive ? '600px' : '520px')};
  height: ${({ $isActive }) =>
    $isActive
      ? 'calc(100% - 28px)' /* 920px - 892px (CARD_ACTIVE__HEIGHT) = 28px */
      : 'calc(100% - 147px)'}; /* 920px - 773px (CARD_INACTIVE_HEIGHT) = 147px */

  transition:
    background-color 0.3s,
    width 0.3s,
    height 0.3s;
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
