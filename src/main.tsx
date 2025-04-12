import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter,  Routes, Route } from "react-router";
import './index.css'
import App from './pages/DnDBase/DnDBase.tsx'
import GestureDnd from './pages/GestureDnd/GestureDnd.tsx';
import GestureBottomSheet from './pages/GestureBottomSheet/GestureBottomSheet.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
	<BrowserRouter>
	<Routes>
	<Route path="/" element={<GestureBottomSheet />} />
	<Route path="/0" element={<GestureDnd />} />
	<Route path="/1" element={<App />} />
	</Routes>
	</BrowserRouter>
  </StrictMode>,
)
