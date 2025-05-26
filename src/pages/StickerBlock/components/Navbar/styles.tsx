import styled from 'styled-components';

export const Navbar = styled.div(() => ({
  marginTop: 'auto',
  padding: '16px 20px',
  display: 'flex',

  '& > div': {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
}));

export const OpenBtn = styled.button(() => ({
  width: '44px',
  height: '44px',
  borderRadius: '80px',
}));

export const ConfirmBtn = styled.button(() => ({
  width: '100px',
  height: '44px',
  borderRadius: '80px',
  alignSelf: 'flex-end',
}));

export const DeleteBtnWrap = styled.div(() => ({
  alignSelf: 'center',
}));

export const DeleteBtn = styled.div(() => ({
  width: '44px',
  height: '44px',
  borderRadius: '80px',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));
