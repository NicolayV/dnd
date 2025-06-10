import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { animated, SpringValue } from '@react-spring/web';

export const Wrapper = styled.div(() => ({
  zIndex: 80,
  position: 'absolute',
  height: '100%',
  willChange: 'transform',
}));

const AnimatedWrapper = animated(Wrapper);

interface TopSheetProps {
  children: React.ReactNode;
  y: SpringValue<number>;
  curtainContainerRef: React.RefObject<HTMLDivElement | null>;
  navbarOpen: boolean;
  topSheetDirection: number;
}

const CardLayoutWrapper: React.FC<TopSheetProps> = ({
  children,
  y,
  curtainContainerRef,
  navbarOpen,
  topSheetDirection,
}) => {
  const [width, setWidth] = useState<number | null>(null);

  useEffect(() => {
    if (curtainContainerRef.current) {
      setWidth(curtainContainerRef.current.getBoundingClientRect().width);
    }
  }, []);

  const animatedStyle = {
    backgroundColor: y.to([-100, 0], ['#191B1F', '#22252A'], 'clamp'),
    width: width
      ? y.to([-100, 0], [`${width}px`, `${width - 32}px`], 'clamp')
      : 'calc(100% - 32px)', // 32px right and left margin
    marginLeft: y.to([-100, 0], ['0px', '16px'], 'clamp'),
    borderRadius: y.to([-100, 0], ['0px', '40px'], 'clamp'),
    transform:
      navbarOpen || (!navbarOpen && topSheetDirection === 0)
        ? y.to([-52, 0], ['translateY(-90px)', 'translateY(0px)'])
        : 'unset',
  };

  return (
    <AnimatedWrapper
      style={{
        ...animatedStyle,
      }}
    >
      {children}
    </AnimatedWrapper>
  );
};

export default CardLayoutWrapper;
