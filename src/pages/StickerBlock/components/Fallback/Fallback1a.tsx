import img from './img1.png';

import styled from 'styled-components';
import { animated, useSpring } from '@react-spring/web';
import { useEffect, useRef } from 'react';

const Container = styled.div(() => ({
  boxSizing: 'border-box',
  width: '100vw',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const ImgCard = styled.img(() => ({
  boxSizing: 'border-box',
  width: '100px',
  height: '100px',
  border: '1px solid red',
}));
const AnimatedImg = animated(ImgCard);

const Fallback1a = () => {
  const [styles, api] = useSpring(() => ({
    from: { rotate: 0 },
    config: { mass: 1, tension: 100, friction: 15 },
  }));

  const angleRef = useRef(0);

  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  useEffect(() => {
    let cancelled = false;

    const animate = async () => {
      while (!cancelled) {
        angleRef.current = angleRef.current += 45;
        api.start({ rotate: angleRef.current });
        await sleep(800);
      }
    };

    animate();

    return () => {
      cancelled = true;
    };
  }, [api]);

  return (
    <Container>
      <AnimatedImg src={img} style={styles} />
    </Container>
  );
};

export default Fallback1a;
