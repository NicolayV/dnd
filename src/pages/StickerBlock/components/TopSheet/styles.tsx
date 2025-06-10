import styled from 'styled-components';

interface TransientSheetProps {
  $sheetOffset: number;
  $swipeOffset: number;
  $zIndex: number;
}

export const Sheet = styled.div<TransientSheetProps>(
  ({ $sheetOffset, $swipeOffset, $zIndex }) => ({
    boxSizing: 'border-box',
    zIndex: $zIndex,

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
