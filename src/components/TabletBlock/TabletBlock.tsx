import React, { useState } from 'react';
import { useDrag } from '@use-gesture/react';
import * as S from './styles';

const SWIPE_Y_PX = 30;

const TabletBlock = () => {
  // Верхняя карта — первый элемент, нижняя — второй
  const [stack, setStack] = useState([
    { id: 'A', title: 'bottom card' },
    { id: 'B', title: 'bottom card' },
  ]);

  const [top, bottom] = stack;

  const bindTopSwipe = useDrag(
    ({ last, movement: [, my] }) => {
      if (!last) return; // нам важно только отпускание
      const passed = Math.abs(my) >= SWIPE_Y_PX;
      if (passed) {
        // свайп засчитан — меняем карты местами
        setStack(([t, b]) => [b, t]);
      }
      // если меньше порога — ничего не делаем
    },
    {
      axis: 'y', // только по Y
      filterTaps: true, // игнорируем простые тапы
      pointer: { touch: true }, // фокус на тач
    }
  );

  return (
    <S.Container>
      {/* Нижняя карта */}
      <S.OuterBlock aria-label="bottom card">{bottom.title}</S.OuterBlock>

      {/* Верхняя карта — на неё навешиваем свайп */}
      <S.InnerBlock aria-label="top card" {...bindTopSwipe()}>
        {top.title}
      </S.InnerBlock>
    </S.Container>
  );
};

export default TabletBlock;
