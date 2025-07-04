import img from './img3.png';
import styled, { keyframes, css } from 'styled-components';

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
`;

const Container = styled.div(() => ({
  boxSizing: 'border-box',
  width: '100vw',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const ImgCard = styled.img`
  box-sizing: border-box;
  width: 100px;
  height: 100px;
  border: 1px solid red;
  ${css`
    animation: ${pulse} 1.6s linear infinite;
  `}
`;

const Fallback3a = () => {
  return (
    <Container>
      <ImgCard src={img} alt="pulsing-img" />
    </Container>
  );
};

export default Fallback3a;
