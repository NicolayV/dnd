import { useState } from 'react';
import { useDrag } from '@use-gesture/react';
import * as S from './styles';

const SWIPE_Y_PX = 30;
const config = {
  axis: 'y',
  filterTaps: true, // игнорируем простые тапы
  pointer: { touch: true }, // фокус на тач
} as const;

const cardMap = {
  topCard: { title: 'top card' },
  bottomCard: { title: 'bottom card' },
};

const TabletBlockV1 = () => {
  const [isActive, setIsActive] = useState<boolean>(true);

  const bindTopSwipe = useDrag(({ last, movement: [, my] }) => {
    if (!last) return;

    const passed = Math.abs(my) >= SWIPE_Y_PX;
    if (passed) {
      setIsActive((p) => !p);
    }
  }, config);

  return (
    <S.Container>
      <S.CardWrapper>
        <S.TopCard
          $isActive={isActive}
          onClick={() => {
            setIsActive((p) => !p);
          }}
        >
          {cardMap.topCard.title}
        </S.TopCard>

        <S.BottomCard
          $isActive={!isActive}
          onClick={() => {
            setIsActive((p) => !p);
          }}
          // {...(isActive ? bindTopSwipe() : undefined)}
        >
          {cardMap.bottomCard.title}
        </S.BottomCard>
      </S.CardWrapper>
    </S.Container>
  );
};

export default TabletBlockV1;
