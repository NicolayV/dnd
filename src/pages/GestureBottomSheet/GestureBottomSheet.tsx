/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect, useRef, useState } from 'react';
import { animated, useSpring, config } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';

import styles from './styles.module.css';

const AnimatedDiv = animated.div as React.FC<React.HTMLAttributes<HTMLDivElement>>;


const GestureBottomSheet: React.FC = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!ref.current?.offsetHeight) return;
    setHeight(ref.current.offsetHeight - 50);
  }, []);

  const [{ y }, api] = useSpring<{ y: number }>(() => ({ y: 0 }));

  const open = ({ canceled }: { canceled: boolean }) => {
    api.start({
      y: 0,
      immediate: false,
      config: canceled ? config.gentle : config.stiff,
    });
  };

  const close = (velocity = 0) => {
    api.start({
      y: -height,
      immediate: false,
      config: { ...config.stiff, velocity },
    });
  };

  const bind = useDrag(
    ({ last, velocity: [, vy], direction: [, dy], offset: [, oy], cancel }) => {
      if (oy > 30) cancel();

      if (last) {
        -oy > height * 0.4 || (vy > 0.5 && dy < 0)
          ? close(vy)
          : open({ canceled: true });
      } else {
        api.start({ y: oy, immediate: true });
      }
    },
    {
      from: () => [0, y.get()],
      filterTaps: true,
      bounds: { bottom: 0 },
      rubberband: true,
    }
  );

  const display = y.to((py) => (-py < height ? 'flex' : 'none')) as unknown as React.CSSProperties['display'];
  const transform = y.to((py) => `translateY(${py}px)`) as unknown as React.CSSProperties['transform'];


  return (
    <div className={styles.wrapper}>
      <div className={styles.container} ref={ref}>
        <div className={styles.actionBtn} onClick={() => open({ canceled: false })} />

        <AnimatedDiv
          className={styles.sheet}
          {...bind()}
          style={{ display, top: '-100px', transform }}
        >
          <div>bottom sheet</div>
        </AnimatedDiv>
      </div>
    </div>
  );
};

export default GestureBottomSheet;