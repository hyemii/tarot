import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';

// 전역 스타일 — 모바일 기기에 최적화된 기본값 설정
const style = document.createElement('style');
style.textContent = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
  body { overscroll-behavior: none; -webkit-tap-highlight-color: transparent; }
  ::-webkit-scrollbar { width: 0; }
`;
document.head.appendChild(style);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
