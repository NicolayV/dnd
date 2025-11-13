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
  border-radius: 40px;

  display: flex;
  align-items: center;
  justify-content: center;

  left: ${({ $isActive }) => ($isActive ? ' 0px' : '40px')};
  right: ${({ $isActive }) => ($isActive ? ' 0px' : '40px')};

  z-index: ${({ $isActive }) => ($isActive ? 1 : 0)};
  pointer-events: ${({ $isActive }) => ($isActive ? 'auto' : 'none')};

  transition:
    top 300ms ease-in-out,
    bottom 300ms ease-in-out,
    left 300ms ease-in-out,
    right 300ms ease-in-out,
    background-color 300ms ease-out;
`;

export const TopCard = styled.div<{ $isActive: boolean }>`
  ${cardBase}
  top: 0;
  bottom: ${({ $isActive }) =>
    $isActive ? 'calc(100% - 892px)' : 'calc(100% - 773px)'};
  background-color: #fff;
`;

export const BottomCard = styled.div<{ $isActive: boolean }>`
  ${cardBase}
  bottom: 0;
  top: ${({ $isActive }) =>
    $isActive ? 'calc(100% - 892px)' : 'calc(100% - 773px)'};
  background-color: ${({ $isActive }) => ($isActive ? '#22252A' : '#E3E4E6')};

  &::before {
    content: '';
    background-color: #e5e7ea;
    border-radius: 4px;
    width: 50px;
    height: 4px;
    position: absolute;
    left: 50%;
    top: -10px;
    transform: translateX(-50%);
  }
`;
