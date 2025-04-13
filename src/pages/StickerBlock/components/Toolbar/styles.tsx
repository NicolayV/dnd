import styled from 'styled-components';

export const Toolbar = styled.div(() => ({
  width: '100%',
  marginTop: '100px',
  padding: '12px 20px',

  display: 'flex',
  justifyContent: 'space-between',

  '& > button': {
    width: '40px',
    height: '40px',
    borderRadius: '80px',
  },
}));
