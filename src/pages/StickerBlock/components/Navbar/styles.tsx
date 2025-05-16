import styled from 'styled-components';

export const Navbar = styled.div(() => ({
  marginTop: 'auto',
  padding: '16px 0',

  display: 'flex',
  flexDirection: 'column',
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
