import img from './img2.png';
import styled, { css, keyframes } from 'styled-components';

const steppedRotationSmooth = keyframes`
  0%   { transform: rotate(360deg); }
  12.5% { transform: rotate(315deg); }
  25%  { transform: rotate(270deg); }
  37.5% { transform: rotate(225deg); }
  50%  { transform: rotate(180deg); }
  62.5% { transform: rotate(135deg); }
  75%  { transform: rotate(90deg); }
  87.5% { transform: rotate(45deg); }
  100% { transform: rotate(0deg); }
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
    animation: ${steppedRotationSmooth} 7200ms cubic-bezier(0.25, 1, 0.5, 1)
      infinite;
  `}
`;

const Fallback2a = () => {
  return (
    <Container>
      <ImgCard src={img} alt="rotating" />
    </Container>
  );
};

export default Fallback2a;
