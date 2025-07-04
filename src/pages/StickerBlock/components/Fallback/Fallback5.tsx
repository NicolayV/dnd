import img from './img5.png';
import styled from 'styled-components';
import { animated, useSpring } from '@react-spring/web';
import { useEffect } from 'react';

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

const Fallback5 = () => {
  const [styles, api] = useSpring(() => ({
    transform: 'scaleX(1)',
    config: { mass: 1, tension: 100, friction: 15 },
  }));

  useEffect(() => {
    api.start({
      to: async (next) => {
        while (true) {
          await next({ transform: 'scaleX(0.8)' });
          await next({ transform: 'scaleX(1)' });
        }
      },
    });
  }, [api]);

  return (
    <Container>
      <AnimatedImg src={img} style={styles} />
    </Container>
  );
};

export default Fallback5;
