import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'lenis/dist/lenis.css';
import './index.css';
import App from './App.jsx';
import SmoothScroll from './components/SmoothScroll/SmoothScroll.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <SmoothScroll />
        <App />
    </StrictMode>
);
