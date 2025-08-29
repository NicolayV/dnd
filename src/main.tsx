import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import TabletBlockV1 from './components/TabletBlockV1/TabletBlockV1';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TabletBlockV1 />
  </StrictMode>
);
