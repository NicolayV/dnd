import styled from 'styled-components';

export const Container = styled.div(() => ({
  width: '100%',
  height: '100%',

  position: 'relative',
  overflow: 'hidden',
  borderRadius: '0 0 40px 40px',
}));

export const Card = styled.div(() => ({
  border: '1px solid grey',
  width: '100px',
  height: '100px',

  position: 'absolute',
  cursor: 'grab',

  willChange: 'transform',

  touchAction: 'none',
  userSelect: 'none',
  WebkitUserSelect: 'none',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const Img = styled.img(() => ({
  width: '100%',
  height: '100%',

  WebkitUserDrag: 'none',
}));
