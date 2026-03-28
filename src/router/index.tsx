// 앱 전체 라우팅 설정 — React Router v6 createBrowserRouter 사용

import { createBrowserRouter, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { AppLayout } from '@/layouts/AppLayout';
import { DBReadyGuard } from './DBReadyGuard';

// 코드 스플리팅: 각 페이지를 지연 로드하여 초기 번들 크기 최소화
const HomePage = lazy(() => import('@/pages/Home/HomePage'));
const LibraryPage = lazy(() => import('@/pages/Library/LibraryPage'));
const CardDetailPage = lazy(() => import('@/pages/Library/CardDetailPage'));
const ReadingPage = lazy(() => import('@/pages/Reading/ReadingPage'));
const ReadingSessionPage = lazy(() => import('@/pages/Reading/ReadingSessionPage'));
const ReadingResultPage = lazy(() => import('@/pages/Reading/ReadingResultPage'));
const ReadingHistoryPage = lazy(() => import('@/pages/Reading/ReadingHistoryPage'));
const LearningPage = lazy(() => import('@/pages/Learning/LearningPage'));
const SpreadLessonPage = lazy(() => import('@/pages/Learning/SpreadLessonPage'));
const ProfilePage = lazy(() => import('@/pages/Profile/ProfilePage'));

// 지연 로드 중 표시할 로딩 플레이스홀더
function PageLoader() {
  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#a78bfa',
        fontSize: 32,
      }}
    >
      ✦
    </div>
  );
}

// 페이지를 Suspense로 감싸는 헬퍼 함수
function page(element: JSX.Element) {
  return <Suspense fallback={<PageLoader />}>{element}</Suspense>;
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <DBReadyGuard>
        <AppLayout />
      </DBReadyGuard>
    ),
    children: [
      { index: true,                              element: page(<HomePage />) },
      { path: 'library',                          element: page(<LibraryPage />) },
      { path: 'library/:cardId',                  element: page(<CardDetailPage />) },
      { path: 'reading',                          element: page(<ReadingPage />) },
      { path: 'reading/session/:spreadId',        element: page(<ReadingSessionPage />) },
      { path: 'reading/result/:sessionId',        element: page(<ReadingResultPage />) },
      { path: 'reading/history',                  element: page(<ReadingHistoryPage />) },
      { path: 'learning',                         element: page(<LearningPage />) },
      { path: 'learning/:spreadId',               element: page(<SpreadLessonPage />) },
      { path: 'profile',                          element: page(<ProfilePage />) },
      // 정의되지 않은 경로는 홈으로 리다이렉트
      { path: '*',                                element: <Navigate to="/" replace /> },
    ],
  },
]);
