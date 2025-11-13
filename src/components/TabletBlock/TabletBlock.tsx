import { ReactNode, useState } from 'react';
// import { useDrag } from '@use-gesture/react';
import * as S from './stylesClaude';

// const SWIPE_Y_PX = 30;
// const config = {
//   axis: 'y',
//   filterTaps: true, // игнорируем простые тапы
//   pointer: { touch: true }, // фокус на тач
// } as const;

interface TabletBlockProps {
  topCard: ReactNode;
  bottomCard: ReactNode;
}

const TabletBlock: React.FC<TabletBlockProps> = ({ topCard, bottomCard }) => {
  const [isActive, setIsActive] = useState<boolean>(true);

  //   const bindTopSwipe = useDrag(({ last, movement: [, my] }) => {
  //     if (!last) return;

  //     const passed = Math.abs(my) >= SWIPE_Y_PX;
  //     if (passed) {
  //       setIsActive((p) => !p);
  //     }
  //   }, config);

  const handleToggle = () => {
    setIsActive((p) => !p);
  };

  return (
    <S.Container>
      <S.CardWrapper>
        <S.TopCard $isActive={isActive} onClick={handleToggle}>
          {topCard}
        </S.TopCard>

        <S.BottomCard
          $isActive={!isActive}
          onClick={handleToggle}
          // {...(isActive ? bindTopSwipe() : undefined)}
        >
          {bottomCard}
        </S.BottomCard>
      </S.CardWrapper>
    </S.Container>
  );
};

export default TabletBlock;
