import styled from 'styled-components';

export const RootContainer = styled.div(() => ({
  boxSizing: 'border-box',

  width: '100vw',
  height: '100dvh',

  display: 'flex',
  justifyContent: 'center',
}));

export const CurtainContainer = styled.div(() => ({
  boxSizing: 'border-box',

  width: '100%',
  height: '100%',

  position: 'relative',

  overflow: 'hidden',

  display: 'flex',
  flexDirection: 'column',

  backgroundColor: '#101114',

  '@media screen and (min-width: 768px)': {
    maxWidth: '767px',
  },
}));
