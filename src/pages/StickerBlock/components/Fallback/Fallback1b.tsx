import img from './img1.png';
import styled, { css, keyframes } from 'styled-components';

const steppedRotationSmooth = keyframes`
  0%   { transform: rotate(0deg); }
  12.5% { transform: rotate(45deg); }
  25%  { transform: rotate(90deg); }
  37.5% { transform: rotate(135deg); }
  50%  { transform: rotate(180deg); }
  62.5% { transform: rotate(225deg); }
  75%  { transform: rotate(270deg); }
  87.5% { transform: rotate(315deg); }
  100% { transform: rotate(360deg); }
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
    animation: ${steppedRotationSmooth} 6400ms cubic-bezier(0.22, 1, 0.36, 1)
      infinite;
  `}
`;

const Fallback1b = () => {
  return (
    <Container>
      <ImgCard src={img} alt="rotating" />
    </Container>
  );
};

export default Fallback1b;
