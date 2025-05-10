import styled from 'styled-components';

export const Navbar = styled.div(() => ({
  marginTop: 'auto',
  paddingTop: '16px',

  display: 'flex',
  flexDirection: 'column',
  paddingBottom: '24px',
}));

export const BtnToolbar = styled.div(() => ({
  marginTop: 'auto',
  padding: '0 20px',

  display: 'flex',
  justifyContent: 'space-between',

  '& > :first-child': {
    width: '44px',
    height: '44px',
    borderRadius: '80px',
  },

  '& > :last-child': {
    width: '100px',
    height: '44px',
    borderRadius: '80px',
  },
}));
