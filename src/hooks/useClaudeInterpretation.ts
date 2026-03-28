// Claude AI 해석 훅 — 스트리밍 상태 관리 및 AbortController를 통한 취소 처리

import { useState, useRef, useEffect, useCallback } from 'react';
import { streamInterpretation, type InterpretationRequest } from '@/services/claudeService';

// 해석 생성의 진행 단계
type InterpretationStatus = 'idle' | 'streaming' | 'done' | 'error';

interface UseClaudeInterpretationReturn {
  // Claude가 생성한 누적 텍스트
  interpretation: string;
  // 현재 진행 단계
  status: InterpretationStatus;
  // 에러 발생 시 메시지
  error: string | null;
  // 해석 생성 트리거 — 버튼에 연결
  generate: (request: InterpretationRequest) => void;
}

// .env의 VITE_CLAUDE_API_KEY를 읽어 반환
// API 키가 없거나 플레이스홀더 상태이면 null 반환
function getApiKey(): string | null {
  const key = import.meta.env.VITE_CLAUDE_API_KEY as string | undefined;
  if (!key || key.startsWith('여기에')) return null;
  return key;
}

export function useClaudeInterpretation(): UseClaudeInterpretationReturn {
  const [interpretation, setInterpretation] = useState('');
  const [status, setStatus] = useState<InterpretationStatus>('idle');
  const [error, setError] = useState<string | null>(null);

  // AbortController를 ref로 보관하여 재렌더 시 참조가 유지되도록 함
  const abortControllerRef = useRef<AbortController | null>(null);

  // 컴포넌트 언마운트 시 진행 중인 스트리밍 요청 취소
  // 페이지를 벗어날 때 불필요한 API 비용 방지
  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  const generate = useCallback(async (request: InterpretationRequest) => {
    const apiKey = getApiKey();
    if (!apiKey) {
      setError('.env 파일에 VITE_CLAUDE_API_KEY를 설정해주세요.');
      setStatus('error');
      return;
    }

    // 이전 요청이 진행 중이면 취소하고 새로 시작
    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    // 상태 초기화 후 스트리밍 시작
    setInterpretation('');
    setError(null);
    setStatus('streaming');

    try {
      for await (const chunk of streamInterpretation(request, apiKey, controller.signal)) {
        // AbortError가 발생하면 루프가 종료되므로 별도 체크 불필요
        setInterpretation((prev) => prev + chunk);
      }
      setStatus('done');
    } catch (err) {
      // AbortError는 사용자가 의도적으로 취소한 경우이므로 에러로 처리하지 않음
      if (err instanceof DOMException && err.name === 'AbortError') return;

      const message = err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.';
      setError(message);
      setStatus('error');
    }
  }, []);

  return { interpretation, status, error, generate };
}
