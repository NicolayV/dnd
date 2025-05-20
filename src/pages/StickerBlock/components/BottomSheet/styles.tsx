import styled from 'styled-components';

interface TransientSheetProps {
  $sheetOffset: number;
  $zIndex: number;
}

export const Sheet = styled.div<TransientSheetProps>(
  ({ $sheetOffset, $zIndex }) => ({
    boxSizing: 'border-box',
    zIndex: $zIndex,

    position: 'absolute',

    height: `calc(100% - ${$sheetOffset}px)`,
    width: '100%',

    borderRadius: '40px 40px 0 0',
    background: '#191b1f',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: '50px',

    willChange: 'transform',

    touchAction: 'none',
    userSelect: 'none',
    WebkitUserSelect: 'none',
    WebkitUserDrag: 'none',

    WebkitOverflowScrolling: 'touch',
    scrollbarGutter: 'stable both-edges',
  })
);

export const SheetHandler = styled.div(() => ({
  position: 'absolute',

  width: '100%',
  height: '40px',
  paddingTop: '8px',

  transform: 'translateY(-20px)',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',

  touchAction: 'none',
  willChange: 'transform',

  '&::before': {
    content: '""',
    border: '2px solid #191B1F',
    width: '50px',
    height: '4px',
    borderRadius: '4px',

    touchAction: 'none',
    willChange: 'transform',
  },
})); // TODO check styles for unless touch rules
