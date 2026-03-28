// Claude API 스트리밍 서비스 — Fetch + SSE 파싱으로 브라우저에서 직접 호출
// @anthropic-ai/sdk 대신 Fetch를 사용하여 번들 크기와 브라우저 호환성을 확보

import type { TarotCard, TarotSpread, SpreadPosition } from '@/types/tarot';

export interface InterpretationRequest {
  spread: TarotSpread;
  question: string;
  drawnCards: Array<{
    position: SpreadPosition;
    card: TarotCard;
    isReversed: boolean;
  }>;
}

// Claude Messages API 엔드포인트
const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';

// 사용할 Claude 모델 — 빠른 응답과 비용 효율성을 위해 Haiku 사용
const MODEL = 'claude-haiku-4-5-20251001';

// 스프레드/질문/카드 정보를 Claude 프롬프트로 조립
// longMeaning을 포함하여 Claude가 앱의 의미 체계 안에서 해석하도록 앵커링
function buildPrompt(request: InterpretationRequest): string {
  const { spread, question, drawnCards } = request;

  const cardDescriptions = drawnCards
    .map(({ position, card, isReversed }) => {
      const meaning = isReversed ? card.reversed : card.upright;
      return [
        `포지션 ${position.position}: ${position.label}`,
        `  - 포지션 의미: ${position.meaning}`,
        `  - 카드: ${card.koreanName} (${card.englishName}) [${isReversed ? '역방향' : '정방향'}]`,
        `  - 키워드: ${card.keywords.join(', ')}`,
        `  - 카드 의미: ${meaning.longMeaning}`,
      ].join('\n');
    })
    .join('\n\n');

  return [
    '[스프레드 정보]',
    `스프레드: ${spread.koreanName} (${spread.englishName})`,
    `설명: ${spread.description}`,
    '',
    '[질문]',
    question ? `"${question}"` : '질문 없음 (일반 리딩)',
    '',
    '[드로우된 카드]',
    cardDescriptions,
    '',
    '위 카드들을 종합하여 질문에 답하는 타로 해석을 제공해주세요.',
    '각 카드가 포지션 맥락에서 어떤 의미를 가지는지, 카드들 사이의 흐름과 연결성, 그리고 종합 메시지를 자연스러운 산문으로 작성해주세요.',
  ].join('\n');
}

// Claude Fetch 응답의 SSE(Server-Sent Events) 스트림을 파싱하여 텍스트 청크를 yield
// Claude의 SSE 포맷: "data: {type, delta: {text}}" 형태로 전송됨
async function* parseSSEStream(
  reader: ReadableStreamDefaultReader<Uint8Array>
): AsyncGenerator<string> {
  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    // 새로 받은 청크를 버퍼에 누적 (청크 경계에서 SSE 라인이 잘릴 수 있으므로)
    buffer += decoder.decode(value, { stream: true });

    // 완성된 줄 단위로 처리
    const lines = buffer.split('\n');
    // 마지막 줄은 아직 완성되지 않을 수 있으므로 버퍼에 유지
    buffer = lines.pop() ?? '';

    for (const line of lines) {
      // SSE 데이터 라인만 처리 ("data: " 접두사)
      if (!line.startsWith('data: ')) continue;

      const jsonStr = line.slice(6).trim();
      if (jsonStr === '[DONE]') return;

      try {
        const event = JSON.parse(jsonStr);
        // content_block_delta 이벤트에서만 텍스트 청크 추출
        if (
          event.type === 'content_block_delta' &&
          event.delta?.type === 'text_delta' &&
          typeof event.delta.text === 'string'
        ) {
          yield event.delta.text;
        }
      } catch {
        // JSON 파싱 실패 시 해당 줄 무시 (ping 등 비데이터 이벤트)
      }
    }
  }
}

// 타로 리딩 해석을 스트리밍으로 생성하는 제너레이터 함수
// AbortSignal을 받아 컴포넌트 언마운트 시 요청을 즉시 취소할 수 있음
export async function* streamInterpretation(
  request: InterpretationRequest,
  apiKey: string,
  signal: AbortSignal
): AsyncGenerator<string> {
  const response = await fetch(CLAUDE_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      // 브라우저에서 직접 호출 시 CORS를 위해 필요한 헤더
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 1024,
      stream: true,
      system: [
        '당신은 타로 카드 전문 해석가입니다.',
        '사용자는 타로를 공부하는 초급 학습자입니다.',
        '',
        '응답 규칙:',
        '- 한국어로 답하세요.',
        '- 각 카드를 스프레드 포지션 맥락에 맞게 해석하세요.',
        '- 카드 간 연결성과 에너지의 흐름을 자연스럽게 설명하세요.',
        '- 마지막에 종합 메시지를 제공하세요.',
        '- 단정적 예언 대신 가능성과 에너지를 이야기하세요.',
        '- 마크다운 헤딩(#, ##)은 사용하지 말고 흐르는 산문체로 작성하세요.',
        '- 학습자가 이해하기 쉬운 따뜻하고 명확한 언어를 사용하세요.',
      ].join('\n'),
      messages: [
        {
          role: 'user',
          content: buildPrompt(request),
        },
      ],
    }),
    signal,
  });

  if (!response.ok) {
    const errorBody = await response.text().catch(() => '');
    throw new Error(`Claude API 오류 (${response.status}): ${errorBody}`);
  }

  const reader = response.body?.getReader();
  if (!reader) throw new Error('응답 스트림을 읽을 수 없습니다.');

  yield* parseSSEStream(reader);
}
