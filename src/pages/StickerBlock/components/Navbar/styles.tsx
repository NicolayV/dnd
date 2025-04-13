import styled from 'styled-components';

export const Navbar = styled.div(() => ({
  marginTop: 'auto',
  paddingTop: '16px',

  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
}));

export const BtnToolbar = styled.div(() => ({
  marginTop: 'auto',
  padding: '0 20px',

  display: 'flex',
  justifyContent: 'space-between',

  '& > :first-child': {
    width: '44px',
    height: '44px',
  },

  '& > :last-child': {
    width: '100px',
    height: '44px',
  },
}));

export const HomeIndicator = styled.div(() => ({
  height: '20px',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  '& > div': {
    border: '2px solid grey',
    width: '80px',
  },
}));
