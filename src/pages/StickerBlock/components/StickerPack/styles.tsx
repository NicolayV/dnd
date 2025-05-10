import styled from 'styled-components';

export const Board = styled.div(() => ({
  height: '100%',
  width: '100%',

  marginTop: '20px',
  padding: '0 16px',

  display: 'flex',
  flexWrap: 'wrap',
  alignContent: 'flex-start',
  justifyContent: 'center',
  gap: '8px',

  overflow: 'auto',
}));

export const CommonImg = styled.img(() => ({
  height: '114px',
  width: '114px',
}));
