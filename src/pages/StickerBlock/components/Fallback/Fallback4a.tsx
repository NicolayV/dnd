import img from './img4.png';
import styled, { keyframes, css } from 'styled-components';

const flickerOpacity = keyframes`
  0%, 100% { opacity: 1; }
  50%  { opacity: 0.8; }
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
    animation: ${flickerOpacity} 2s linear infinite;
  `}
`;

const Fallback4a = () => {
  return (
    <Container>
      <ImgCard src={img} />
    </Container>
  );
};

export default Fallback4a;
