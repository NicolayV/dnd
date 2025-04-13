import styled from 'styled-components';

interface TransientSheetProps {
  $sheetOffset: number;
  $swipeOffset: number;
}

export const Sheet = styled.div<TransientSheetProps>(
  ({ $sheetOffset, $swipeOffset }) => ({
    boxSizing: 'border-box',
    zIndex: 10000,

    position: 'absolute',

    height: `calc(100% + ${$sheetOffset}px - ${$swipeOffset}px)`,
    width: '100%',

    borderRadius: '0 0 40px 40px',
    background: '#fff',
    touchAction: 'none',

    display: 'flex',
    flexDirection: 'column',

    willChange: 'transform',
  })
);

export const Shadow = styled.div(() => ({
  zIndex: 1000,
  position: 'absolute',

  height: '100%',
  borderRadius: '0 0 40px 40px',
  backgroundColor: '#22252a',

  willChange: 'transform',
}));
