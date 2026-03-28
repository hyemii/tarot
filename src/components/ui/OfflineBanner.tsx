// 오프라인 상태일 때 화면 상단에 표시하는 알림 배너

import { useAppStore } from '@/store/appStore';

export function OfflineBanner() {
  const isOnline = useAppStore((s) => s.isOnline);

  // 온라인 상태에서는 배너를 렌더하지 않음
  if (isOnline) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: '#7c3aed',
        color: 'white',
        textAlign: 'center',
        padding: '8px 16px',
        fontSize: '14px',
        fontWeight: 500,
      }}
    >
      오프라인 모드 — 모든 기능을 정상 사용할 수 있습니다
    </div>
  );
}
