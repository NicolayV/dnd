import img from './img5.png';
import styled, { keyframes, css } from 'styled-components';

const squashX = keyframes`
  0%, 100% { transform: scaleX(1); }
  50%  { transform: scaleX(0.8); }
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
    animation: ${squashX} 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  `}
`;

const Fallback5a = () => {
  return (
    <Container>
      <ImgCard src={img} alt="scale-x" />
    </Container>
  );
};

export default Fallback5a;
