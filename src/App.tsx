import { useEffect, useRef, useState } from 'react';
import { DndContext, DragEndEvent, Modifier, UniqueIdentifier, useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

export interface Position {
  x: number;
  y: number;
}

interface DraggableImageProps {
  id: string;
  src: string;
  position: Position;
  className?: string;
  alt?: string;
}

// Модификатор, ограничивающий перетаскивание, чтобы элемент не выходил за границы контейнера
const restrictToPartialOverflow: Modifier = ({ transform, activeNodeRect, containerNodeRect }) => {
	if (!activeNodeRect || !containerNodeRect) return transform;

	// Значение видимости: какая доля элемента должна оставаться внутри контейнера
	const visibleFraction = 0.4; 
	
	// Исходный центр элемента (учитывая, что позиционирование по центру)
	const origCenterX = activeNodeRect.left + activeNodeRect.width / 2;
	const origCenterY = activeNodeRect.top + activeNodeRect.height / 2;
	
	const containerWidth = containerNodeRect.width;
	const containerHeight = containerNodeRect.height;
	
	// Допустимые границы для центра элемента
	const allowedMinCenterX = containerNodeRect.left + visibleFraction * activeNodeRect.width;
	const allowedMaxCenterX = containerNodeRect.left + containerWidth + (1 - visibleFraction) * activeNodeRect.width;
	const allowedMinCenterY = containerNodeRect.top + visibleFraction * activeNodeRect.height;
	const allowedMaxCenterY = containerNodeRect.top + containerHeight + (1 - visibleFraction) * activeNodeRect.height;
	
	const newCenterX = origCenterX + transform.x;
	const newCenterY = origCenterY + transform.y;
	
	const clampedCenterX = Math.min(Math.max(newCenterX, allowedMinCenterX), allowedMaxCenterX);
	const clampedCenterY = Math.min(Math.max(newCenterY, allowedMinCenterY), allowedMaxCenterY);
	
	return {
	  x: clampedCenterX - origCenterX,
	  y: clampedCenterY - origCenterY,
	  scaleX: transform.scaleX,
	  scaleY: transform.scaleY,
	};
  };
  
  

const LOCAL_STORAGE_KEY = 'positions';

const defaultPositions: Record<UniqueIdentifier, Position> = {
  img1: { x: 0, y: 0 },
  img2: { x: 0, y: 0 },
};

// Вспомогательная функция для расчёта новых процентных координат
const calculatePercentagePosition = (
  prevPosition: Position,
  delta: { x: number; y: number },
  containerWidth: number,
  containerHeight: number
): Position => {
  // Переводим предыдущие координаты из процентов в пиксели
  const prevXInPixels = (prevPosition.x / 100) * containerWidth;
  const prevYInPixels = (prevPosition.y / 100) * containerHeight;

  // Добавляем смещение в пикселях
  const newXInPixels = prevXInPixels + delta.x;
  const newYInPixels = prevYInPixels + delta.y;

  // Пересчитываем обратно в проценты
  return {
    x: Number(((newXInPixels / containerWidth) * 100).toFixed(6)),
    y: Number(((newYInPixels / containerHeight) * 100).toFixed(6)),
  };
};

const PositionsPanel: React.FC<{ img1: Position; img2: Position }> = ({ img1, img2 }) => (
  <div className="info">
    <p>{`img1: x[${Math.trunc(img1.x)}] y[${Math.trunc(img1.y)}]`}</p>
    <p>{`img2: x[${Math.trunc(img2.x)}] y[${Math.trunc(img2.y)}]`}</p>
  </div>
);

const DraggableImage: React.FC<DraggableImageProps> = ({ id, src, position, className, alt }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
  const computedTransform = transform ? CSS.Transform.toString(transform) : '';
  const finalTransform = `translate(-50%, -50%) ${computedTransform}`;

  const style: React.CSSProperties = {
    position: 'absolute',
    left: `${position.x}%`,
    top: `${position.y}%`,
    transform: finalTransform,
    touchAction: 'none',
    cursor: 'grab',
  };

  return <img ref={setNodeRef} src={src} style={style} alt={alt} className={className} {...listeners} {...attributes} />;
};

function App() {
  const dragContainerRef = useRef<HTMLDivElement>(null);

  const [positions, setPositions] = useState<Record<UniqueIdentifier, Position>>(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    return stored ? JSON.parse(stored) : defaultPositions;
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(positions));
  }, [positions]);

  const onDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;
    const container = dragContainerRef.current;

    if (!container) return;
    const { clientWidth, clientHeight } = container;

    setPositions((prev) => ({
      ...prev,
      [active.id]: calculatePercentagePosition(prev[active.id], delta, clientWidth, clientHeight),
    }));
  };

  return (
    <div className="wrapper">
      <PositionsPanel img1={positions.img1} img2={positions.img2} />

      <DndContext onDragEnd={onDragEnd} modifiers={[restrictToPartialOverflow]}>
        <div ref={dragContainerRef} className="container">
          <DraggableImage
            id="img1"
            src={viteLogo}
            position={positions.img1}
            className="logo"
            alt="viteLogo"
          />

          <DraggableImage
            id="img2"
            src={reactLogo}
            position={positions.img2}
            className="logo"
            alt="reactLogo"
          />

          <div className="box1">1</div>
          <div className="box2">2</div>
          <div className="box3">3</div>
          <div className="box4">4</div>
          <div className="box5">5</div>
        </div>
	  </DndContext>
	</div>
  )
}

export default App