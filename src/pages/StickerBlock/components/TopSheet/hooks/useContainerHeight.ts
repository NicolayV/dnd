import { useEffect, useState } from 'react';

export const useContainerHeight = (
  ref: React.RefObject<HTMLDivElement | null>
) => {
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleResize = () => {
      setHeight(element.clientHeight);
    };

    const observer = new ResizeObserver(handleResize);
    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return height;
};
