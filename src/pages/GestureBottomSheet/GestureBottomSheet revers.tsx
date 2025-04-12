import React from 'react'
import { a, useSpring, config } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'

import styles from './styles.module.css'

// Высота листа
const height = 250

const GestureTopSheet: React.FC = () => {
  // Изначально лист открыт, значит y = 0.
  const [{ y }, api] = useSpring(() => ({ y: 0 }))

  // Функция открытия – устанавливает y в 0.
  const open = () => {
    api.start({ y: 0, immediate: false, config: config.stiff })
  }

  // Функция закрытия – перемещает лист вверх за пределы экрана (y = -height).
  // Параметр velocity добавляет динамику анимации.
  const close = (velocity = 0) => {
    api.start({ y: -height, immediate: false, config: { ...config.stiff, velocity } })
  }

  // Обработка жестов – лист можно тянуть только вверх (от 0 к -height).
  const bind = useDrag(
    ({ last, velocity: [, vy], direction: [, dy], offset: [, oy], cancel }) => {
      // Если пользователь пытается тянуть лист вниз (увеличивая y выше 0), отменяем жест.
      if (oy > 70) cancel()

      if (last) {
        // Если лист перемещён вверх более чем на половину высоты или
        // скорость движения вверх (dy отрицательное) достаточно высокая,
        // то закрываем лист, иначе возвращаем в открытое состояние.
        oy < -height * 0.5 || (vy > 0.5 && dy < 0) ? close(vy) : open()
      } else {
        // Во время перетаскивания обновляем положение листа согласно смещению.
        api.start({ y: oy, immediate: true })
      }
    },
    {
      from: () => [0, y.get()],
      filterTaps: true,
      bounds: { bottom: 0, top: -height },
      rubberband: true,
    }
  )

  // Управление видимостью листа: если лист не полностью закрыт, он отображается.
  const display = y.to((py) => (py > -height ? 'block' : 'none'))

  // Дополнительный стиль для фона, который можно применять для эффектов масштабирования или прозрачности.
  const bgStyle = {
    transform: y.to([-height, 0], ['translateY(-8%) scale(1.16)', 'translateY(0px) scale(1.05)']),
    opacity: y.to([-height, 0], [0.4, 1], 'clamp'),
  }

  return (
    <div className="flex" style={{ overflow: 'hidden', position: 'relative', height: '100vh' }}>
      <div className={styles.actionBtn} onClick={open} />
      {/* Используем top вместо bottom для позиционирования листа */}
      <a.div className={styles.sheet} {...bind()} style={{ display, top: y }}>
        <div>top sheet</div>
      </a.div>
    </div>
  )
}

export default GestureTopSheet
