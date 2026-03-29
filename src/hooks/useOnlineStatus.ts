// 네트워크 연결 상태를 감지하여 앱 스토어에 반영하는 훅

import { useEffect } from 'react';
import { useAppStore } from '@/store/appStore';

export function useOnlineStatus() {
  const setOnline = useAppStore((s) => s.setOnline);

  useEffect(() => {
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);
    // 탭 전환 후 돌아왔을 때 실제 네트워크 상태를 재확인
    const handleVisibility = () => {
      if (!document.hidden) setOnline(navigator.onLine);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    document.addEventListener('visibilitychange', handleVisibility);

    // 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [setOnline]);
}
