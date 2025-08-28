import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import TabletBlock from './components/TabletBlock/TabletBlock';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TabletBlock />
  </StrictMode>
);
