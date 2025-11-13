import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { ZoomCard } from './components/cardZoom/cardZoom';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ZoomCard />
  </StrictMode>
);
