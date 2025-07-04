import img from './img3.png';
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

const Fallback3 = () => {
  const [styles, api] = useSpring(() => ({
    transform: 'scale(1)',
    config: { duration: 800, easing: (t) => t },
  }));

  useEffect(() => {
    api.start({
      to: async (next) => {
        while (true) {
          await next({ transform: 'scale(1.2)' });
          await next({ transform: 'scale(1)' });
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

export default Fallback3;
