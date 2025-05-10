import React, { useState, useEffect } from 'react';
import { useInView } from '@react-spring/web';

interface LazyImageProps {
  src: string;
  placeholder: string;
  id: string;
  onClick: (id: string) => void;
  alt?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  placeholder,
  id,
  onClick,
  alt = 'image',
}) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [ref, inView] = useInView({
    rootMargin: '100px',
    once: true,
  });

  useEffect(() => {
    if (inView && !isLoaded) {
      const img = new Image();
      img.src = src;
      img.onload = () => setIsLoaded(true);
    }
  }, [inView, src, isLoaded]);

  return (
    <img
      ref={ref}
      src={isLoaded ? src : placeholder}
      alt={alt}
      loading="lazy"
      style={{ cursor: 'pointer' }}
      onClick={() => onClick(id)}
    />
  );
};

export default LazyImage;
