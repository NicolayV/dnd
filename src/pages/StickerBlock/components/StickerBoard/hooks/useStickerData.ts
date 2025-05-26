import { useState } from 'react';

import reactLogo from '../../../assets/react.svg';
import clever from '../../../assets/clever.png';
import hands from '../../../assets/hands.png';

export interface StickerData {
  id: string;
  x: number;
  y: number;
  scale: number;
  rotateZ: number;
  src: string;
}
export const stickersData: StickerData[] = [
  {
    id: '1',
    x: 60.93,
    y: 80.91,
    scale: 1,
    rotateZ: 0,
    src: reactLogo,
  },
  {
    id: '2',
    x: 65.93,
    y: 89.91,
    scale: 1,
    rotateZ: 0,
    src: clever,
  },
  {
    id: '3',
    x: 65.93,
    y: 79.91,
    scale: 1,
    rotateZ: 0,
    src: hands,
  },
];

const STICKER_DATA_KEY = 'sticker_data';
const getStoredStickerDataList = (): StickerData[] => {
  try {
    const data = sessionStorage.getItem(STICKER_DATA_KEY);
    return data ? JSON.parse(data) : stickersData;
  } catch {
    return stickersData;
  }
};

const saveStoredStickerDataList = (dataList: StickerData[]) => {
  sessionStorage.setItem(STICKER_DATA_KEY, JSON.stringify(dataList));
};

export const useStickerData = () => {
  const [stickerDataList, setStickerDataList] = useState<StickerData[]>(() =>
    getStoredStickerDataList()
  );

  const addSticker = (stickerData: StickerData) => {
    const newData = [...stickerDataList, stickerData];

    setStickerDataList(newData);
    saveStoredStickerDataList(newData);
  };

  const updSticker = (stickerData: StickerData, idx: number) => {
    const newData = stickerDataList.map((st, i) =>
      i === idx ? stickerData : st
    );

    setStickerDataList(newData);
    saveStoredStickerDataList(newData);
  };

  const deleteSticker = (idx: number) => {
    console.log('before', stickerDataList);

    const newData = stickerDataList.filter((_, i) => i !== idx);
    console.log('after', newData);

    setStickerDataList(newData);
    saveStoredStickerDataList(newData);
  };

  return {
    stickerDataList,
    addSticker,
    updSticker,
    deleteSticker,
  };
};
