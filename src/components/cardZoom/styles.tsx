import styled from 'styled-components';
import imgFrog from './sticker_121.png';

export const Container = styled.div`
  display: flex;
  align-items: center;

  height: 100%;
  width: 100%;

  justify-content: center;

  background: #fff;
`;

export const Card = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  background-image: url(${imgFrog});
  background-size: cover;
  border-radius: 5px;
  box-shadow: 0px 10px 30px -5px rgba(0, 0, 0, 0.3);
  will-change: transform;
  border: 10px solid white;
  cursor: grab;
  touch-action: none;
  user-select: none;
  -webkit-user-select: none;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-size: 22px;
  padding: 20px;
  text-align: center;
  color: #ffffffaa;
`;
