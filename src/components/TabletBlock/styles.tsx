import styled, { css } from 'styled-components';

export const TOP_GAP = 30;
export const BOTTOM_GAP = 30;
export const STACK_OFFSET = 14;
export const HEIGHT_DIFF = 150;

export const Container = styled.div`
  box-sizing: border-box;
  width: 100vw;
  height: 100dvh;
  position: relative;
  background: #0b132b;

  /* вычисляем базовую высоту верхней карты: <= 600px и с учётом отступов 30+30 */
  --card-h: min(600px, calc(100% - ${TOP_GAP + BOTTOM_GAP}px));

  overscroll-behavior: contain;
  -webkit-tap-highlight-color: transparent;
`;

const cardBase = css`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  height: var(--card-h);

  border-radius: 20px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: #fff;

  display: flex;
  align-items: center;
  justify-items: center;

  touch-action: none;
  user-select: none;
`;

export const BottomCard = styled.div`
  ${cardBase}
  z-index: 0;
  bottom: ${BOTTOM_GAP}px;
  width: 300px;

  height: clamp(0px, calc(var(--card-h) - ${HEIGHT_DIFF}px), var(--card-h));

  opacity: 0.9;
  border-color: #5aa469;
`;

export const TopCard = styled.div`
  ${cardBase}
  z-index: 1;
  bottom: ${BOTTOM_GAP + STACK_OFFSET}px;
  width: 400px;

  border-color: #4ea1d3;
`;
