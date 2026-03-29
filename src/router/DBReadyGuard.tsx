// DB 초기화 완료 전까지 앱 렌더를 차단하는 가드
// 미초기화 상태의 컴포넌트가 DB에 접근하는 버그를 원천 차단

import { useEffect, type ReactNode } from 'react';
import { getDB } from '@/db/client';
import { seedIfNeeded } from '@/db/seed';
import { useAppStore } from '@/store/appStore';
import { useUserStore } from '@/store/userStore';

interface DBReadyGuardProps {
  children: ReactNode;
}

export function DBReadyGuard({ children }: DBReadyGuardProps) {
  const isDBReady = useAppStore((s) => s.isDBReady);
  const setDBReady = useAppStore((s) => s.setDBReady);
  const loadProfile = useUserStore((s) => s.loadProfile);

  useEffect(() => {
    // DB 초기화 → 시드 → 프로필 로드 순서로 실행
    (async () => {
      try {
        await getDB();        // IndexedDB 스키마 생성/마이그레이션
        await seedIfNeeded(); // 최초 실행 시 마스터 데이터 시드
        await loadProfile();  // 사용자 프로필 불러오기
        setDBReady(true);     // 준비 완료 신호
      } catch (error) {
        // 초기화 실패 시 콘솔에 기록 후 재시도 유도
        console.error('DB 초기화 실패:', error);
        setDBReady(true); // 실패해도 앱은 열어서 사용자가 재시도할 수 있도록 함
      }
    })();
  }, [setDBReady, loadProfile]);  // eslint-disable-line react-hooks/exhaustive-deps

  // DB가 준비되기 전에는 로딩 화면 표시
  if (!isDBReady) {
    return (
      <div
        style={{
          height: '100dvh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0f0720',
          color: '#a78bfa',
          gap: 16,
        }}
      >
        <div style={{ fontSize: 48 }}>✦</div>
        <p style={{ fontSize: 16, opacity: 0.7 }}>타로 카드를 준비하는 중...</p>
      </div>
    );
  }

  return <>{children}</>;
}
