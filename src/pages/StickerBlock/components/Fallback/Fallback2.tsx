import img from './img2.png';
import styled from 'styled-components';
import { animated, useSpring } from '@react-spring/web';

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

const Fallback2 = () => {
  const stylesImg = useSpring({
    from: { rotate: 360 },
    to: [
      { rotate: 315 },
      { rotate: 270 },
      { rotate: 225 },
      { rotate: 180 },
      { rotate: 135 },
      { rotate: 90 },
      { rotate: 45 },
      { rotate: 0 },
    ],
    loop: true,
    config: { mass: 1, tension: 28, friction: 8 },
  });

  return (
    <Container>
      <AnimatedImg src={img} style={stylesImg} />
    </Container>
  );
};

export default Fallback2;
