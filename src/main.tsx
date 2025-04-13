import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import StickerBlock from './pages/StickerBlock/StickerBlock.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StickerBlock />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
