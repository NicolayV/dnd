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
    touchAction: 'none',

    willChange: 'transform',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: '100px',
  })
);

export const SheetHandler = styled.div(() => ({
  position: 'absolute',

  width: '100%',
  height: '44px',
  paddingTop: '8px',

  transform: 'translateY(-24px)',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',

  '&::before': {
    content: '""',
    border: '4px solid grey',
    width: '80px',
    height: '8px',
    borderRadius: '40px',
  },
}));
