// 카드 ID를 실제 이미지 파일 경로로 변환하는 유틸리티
// 실제 이미지 파일명 규칙에 맞게 URL을 생성

// 메이저 아르카나: /images/major/00-fool.jpg 형식
const MAJOR_FILE_NAMES: Record<number, string> = {
  0: '00-fool',
  1: '01-magician',
  2: '02-high-priestess',
  3: '03-empress',
  4: '04-emperor',
  5: '05-hierophant',
  6: '06-lovers',
  7: '07-chariot',
  8: '08-strength',
  9: '09-hermit',
  10: '10-wheel-of-fortune',
  11: '11-justice',
  12: '12-hanged-man',
  13: '13-death',
  14: '14-temperance',
  15: '15-devil',
  16: '16-tower',
  17: '17-star',
  18: '18-moon',
  19: '19-sun',
  20: '20-judgement',
  21: '21-world',
};

// 마이너 아르카나 순서 번호: /images/minor/cups/01-ace-of-cups.jpg 형식
const MINOR_CARD_FILE_NAMES: Record<number, string> = {
  1: '01-ace',
  2: '02-two',
  3: '03-three',
  4: '04-four',
  5: '05-five',
  6: '06-six',
  7: '07-seven',
  8: '08-eight',
  9: '09-nine',
  10: '10-ten',
  11: '11-page',
  12: '12-knight',
  13: '13-queen',
  14: '14-king',
};

// 수트별 파일명 접미사
const SUIT_SUFFIXES: Record<string, string> = {
  cups: 'of-cups',
  wands: 'of-wands',
  swords: 'of-swords',
  pentacles: 'of-pentacles',
};

// 카드 ID로 이미지 URL 반환
// major_0 → /images/major/00-fool.jpg
// minor_cups_1 → /images/minor/cups/01-ace-of-cups.jpg
export function getCardImageUrl(cardId: string): string {
  if (cardId.startsWith('major_')) {
    const number = parseInt(cardId.replace('major_', ''), 10);
    const fileName = MAJOR_FILE_NAMES[number];
    return fileName ? `/images/major/${fileName}.jpg` : '/images/placeholder.jpg';
  }

  if (cardId.startsWith('minor_')) {
    // minor_cups_1 형태에서 수트와 번호 추출
    const parts = cardId.split('_'); // ['minor', 'cups', '1']
    const suit = parts[1];
    const number = parseInt(parts[2], 10);
    const cardName = MINOR_CARD_FILE_NAMES[number];
    const suitSuffix = SUIT_SUFFIXES[suit];
    if (cardName && suitSuffix) {
      return `/images/minor/${suit}/${cardName}-${suitSuffix}.jpg`;
    }
  }

  return '/images/placeholder.jpg';
}
