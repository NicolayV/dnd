import { useEffect, useRef, useState } from 'react';
import { DndContext, DragEndEvent, Modifier, UniqueIdentifier, useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

interface Position {
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
  
const SESSION_STORAGE_KEY = 'positions';

const defaultPositions: Record<UniqueIdentifier, Position> = {
  img1: { x: 10, y: 10 },
  img2: { x: 10, y: 30 },
};

// Модификатор, ограничивающий перетаскивание, чтобы элемент не выходил за границы контейнера
const restrictToPartialOverflow: Modifier = ({ transform, activeNodeRect, containerNodeRect }) => {
	if (!activeNodeRect || !containerNodeRect) return transform;
  
	const visibleFraction = 0.4;
	const origCenterX = activeNodeRect.left + activeNodeRect.width / 2;
	const origCenterY = activeNodeRect.top + activeNodeRect.height / 2;
  
	// Вычисляем допустимые границы для центра элемента с использованием right и bottom
	const allowedMinCenterX = containerNodeRect.left + visibleFraction * activeNodeRect.width;
	const allowedMaxCenterX = containerNodeRect.right + (1 - visibleFraction) * activeNodeRect.width;
	const allowedMinCenterY = containerNodeRect.top + visibleFraction * activeNodeRect.height;
	const allowedMaxCenterY = containerNodeRect.bottom + (1 - visibleFraction) * activeNodeRect.height;
  
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

// Вспомогательная функция для расчёта новых процентных координат
const calculatePercentagePosition = (
	prevPosition: Position,
	delta: { x: number; y: number },
	containerWidth: number,
	containerHeight: number
  ): Position => ({
	x: Number((prevPosition.x + (delta.x * 100) / containerWidth).toFixed(6)),
	y: Number((prevPosition.y + (delta.y * 100) / containerHeight).toFixed(6)),
  });

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
    touchAction: 'none', // важно для dnd-kit на мобильных
    cursor: 'grab',
	
	userSelect: 'none', // запрет выделения	
    WebkitUserSelect: 'none', // запрет выделять длинным тапом в тч Safari
    WebkitTouchCallout: 'none', // Блокирует iOS long-press меню	
	pointerEvents: 'auto', // на случай если переопределит родитель
  	};

  return <img 
  			ref={setNodeRef} 
			src={src} 
			style={style} 
			alt={alt} 
			className={className}
			{...listeners} 
			{...attributes}

			draggable={false} // отключаем нативный drag
  			onContextMenu={(e) => e.preventDefault()} // блокирует правый клик / long-press
  		/>;
};

function App() {
  const dragContainerRef = useRef<HTMLDivElement>(null);

  const [positions, setPositions] = useState<Record<UniqueIdentifier, Position>>(() => {
    const stored = sessionStorage.getItem(SESSION_STORAGE_KEY);
    return stored ? JSON.parse(stored) : defaultPositions;
  });

  useEffect(() => {
    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(positions));
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
      <DndContext onDragEnd={onDragEnd} modifiers={[restrictToPartialOverflow]}>
        <div 
			ref={dragContainerRef} 
			className="container"
			
			onContextMenu={(e) => e.preventDefault()} // блокирует long-press меню
			onTouchStart={(e) => e.preventDefault()} // предотвращает системные жесты, выделение
			style={{
			  userSelect: 'none', // запрет выделения
			  WebkitUserSelect: 'none', // для iOS Safari
			  WebkitTouchCallout: 'none', // запрет long-press меню
			  touchAction: 'none', // важно для dnd-kit
			}}
		>
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

      <PositionsPanel img1={positions.img1} img2={positions.img2} />
	</div>
  )
}

export default App