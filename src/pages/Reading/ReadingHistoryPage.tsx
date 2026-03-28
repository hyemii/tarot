// 리딩 기록 페이지 — 과거 리딩 세션 목록을 최신 순으로 표시

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { readingRepository } from '@/db/repositories/readingRepository';
import { spreads } from '@/data/spreads';
import type { ReadingSession } from '@/types/tarot';

export default function ReadingHistoryPage() {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState<ReadingSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    readingRepository.getAll().then((all) => {
      setSessions(all);
      setIsLoading(false);
    });
  }, []);

  // 리딩 세션 삭제 후 목록 업데이트
  async function handleDelete(sessionId: string) {
    await readingRepository.delete(sessionId);
    setSessions((prev) => prev.filter((s) => s.id !== sessionId));
  }

  return (
    <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#a78bfa', cursor: 'pointer', fontSize: 14 }}>
          ←
        </button>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: 'white' }}>리딩 기록</h1>
      </div>

      {isLoading ? (
        <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', paddingTop: 40 }}>불러오는 중...</div>
      ) : sessions.length === 0 ? (
        <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', paddingTop: 40, lineHeight: 1.8 }}>
          아직 리딩 기록이 없어요.
          <br />
          <button
            onClick={() => navigate('/reading')}
            style={{ marginTop: 8, background: 'none', border: 'none', color: '#a78bfa', fontSize: 14, cursor: 'pointer', textDecoration: 'underline' }}
          >
            첫 리딩 시작하기
          </button>
        </div>
      ) : (
        // 세션 목록 — 최신 순 정렬은 readingRepository.getAll()에서 처리
        sessions.map((session) => {
          const spread = spreads.find((s) => s.id === session.spreadId);
          const date = new Date(session.timestamp).toLocaleDateString('ko-KR', {
            month: 'long', day: 'numeric',
          });
          const time = new Date(session.timestamp).toLocaleTimeString('ko-KR', {
            hour: '2-digit', minute: '2-digit',
          });

          return (
            <div
              key={session.id}
              style={{
                backgroundColor: '#1e1040',
                borderRadius: 14,
                overflow: 'hidden',
                border: '1px solid rgba(167,139,250,0.1)',
              }}
            >
              <div
                onClick={() => navigate(`/reading/result/${session.id}`)}
                style={{ padding: '14px 16px', cursor: 'pointer' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 15, color: 'white', fontWeight: 600 }}>
                    {spread?.koreanName ?? '리딩'}
                  </span>
                  <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
                    {date} {time}
                  </span>
                </div>
                {session.question ? (
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {session.question}
                  </p>
                ) : (
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>질문 없음</p>
                )}
                {session.userNotes && (
                  <p style={{ fontSize: 11, color: '#a78bfa', marginTop: 4 }}>노트 있음 ✍</p>
                )}
              </div>
              {/* 삭제 버튼 */}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '8px 16px', display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => handleDelete(session.id)}
                  style={{ background: 'none', border: 'none', color: 'rgba(255,100,100,0.6)', fontSize: 12, cursor: 'pointer' }}
                >
                  삭제
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
