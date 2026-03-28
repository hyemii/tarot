/**
 * Tarot App Data Models
 * TypeScript interfaces for tarot cards, spreads, readings, and user data
 */

// ============================================================================
// CARD MODELS
// ============================================================================

export interface CardMeaning {
  /** Brief 1-2 line interpretation */
  shortMeaning: string;

  /** Detailed 2-3 sentence explanation */
  longMeaning: string;

  /** Context-specific interpretations */
  context: {
    love?: string;
    career?: string;
    finances?: string;
    spirituality?: string;
  };
}

export interface CardImage {
  /** Image file path or URL */
  url: string;

  /** Base64 data URI for offline storage */
  dataUri?: string;

  /** Alt text for accessibility */
  description: string;
}

export interface TarotCard {
  /** Unique identifier (e.g., "major_0", "minor_cups_1") */
  id: string;

  /** Card number: Major 0-21, Minor 1-14 per suit */
  number: number;

  /** Korean name */
  koreanName: string;

  /** English name */
  englishName: string;

  /** Arcana classification */
  arcana: "major" | "minor";

  /** Suit (Minor cards only) */
  suit?: "cups" | "wands" | "swords" | "pentacles";

  /** Upright (正位置) interpretation */
  upright: CardMeaning;

  /** Reversed (逆位置) interpretation */
  reversed: CardMeaning;

  /** Associated keywords */
  keywords: string[];

  /** Astrology correspondence (Major cards only) */
  astrologySign?: string;

  /** Elemental correspondence (Minor cards) */
  element?: "water" | "fire" | "air" | "earth" | "spirit";

  /** Card image and metadata */
  image: CardImage;

  /** Optional historical/cultural background */
  historicalBackground?: string;

  /** Numerological significance */
  numerology?: number;

  /** Yes/No guidance (optional, useful for Yes/No spread) */
  yesNoGuidance?: "yes" | "no" | "maybe";
}

// ============================================================================
// SPREAD MODELS
// ============================================================================

export interface SpreadPosition {
  /** Position number in spread (1-indexed) */
  position: number;

  /** Korean name of position */
  label: string;

  /** What this position represents */
  meaning: string;

  /** Guiding question to interpret this position */
  guidingQuestion: string;
}

export interface ExampleReading {
  /** Example question posed in this reading */
  question: string;

  /** Cards drawn for this example */
  cards: Array<{
    position: number;
    cardId: string;
    isReversed: boolean;
  }>;

  /** Example interpretation */
  interpretation: string;
}

export interface TarotSpread {
  /** Unique identifier (e.g., "one_card", "celtic_cross") */
  id: string;

  /** Korean name */
  koreanName: string;

  /** English name */
  englishName: string;

  /** Description of when/how to use this spread */
  description: string;

  /** Number of cards used */
  cardCount: number;

  /** Difficulty level 1 (beginner) - 5 (advanced) */
  difficulty: 1 | 2 | 3 | 4 | 5;

  /** Position definitions */
  positions: SpreadPosition[];

  /** SVG or image showing spread layout */
  illustration?: string;

  /** Example readings using this spread */
  exampleReadings?: ExampleReading[];
}

// ============================================================================
// READING SESSION MODELS
// ============================================================================

export interface DrawnCard {
  /** Position in the spread */
  position: number;

  /** Reference to TarotCard.id */
  cardId: string;

  /** Whether card was drawn reversed */
  isReversed: boolean;
}

export interface ReadingSession {
  /** Unique session identifier (UUID) */
  id: string;

  /** Timestamp when reading was conducted */
  timestamp: number;

  /** Reference to TarotSpread.id */
  spreadId: string;

  /** User's question or intent */
  question: string;

  /** Cards drawn in sequence */
  cards: DrawnCard[];

  /** Optional user notes or interpretation */
  userNotes?: string;

  /** Timestamp when saved (can differ from reading time) */
  savedAt: number;
}

// ============================================================================
// USER PROFILE & PREFERENCES
// ============================================================================

export interface CardLearningData {
  /** Timestamp of last view */
  lastViewedAt: number;

  /** Number of times viewed */
  viewCount: number;

  /** Marked as favorite */
  isFavorite: boolean;
}

export interface UserSettings {
  /** UI language */
  language: "ko" | "en";

  /** Preferred card image display size */
  cardImageSize: "small" | "medium" | "large";

  /** Show reversed card indicators */
  showReversedCards: boolean;

  /** Enable daily reminder notifications */
  dailyReminder: boolean;

  /** Daily reminder time (HH:mm format) */
  dailyReminderTime?: string;

  /** Show detailed interpretation guide */
  detailedGuidance: boolean;
}

export interface UserProfile {
  /** IndexedDB 식별자 (항상 'singleton') */
  id?: string;

  /** Last update timestamp */
  lastUpdated: number;

  /** Per-card learning tracking */
  learnedCards: {
    [cardId: string]: CardLearningData;
  };

  /** All saved reading sessions */
  readingSessions: ReadingSession[];

  /** User preferences */
  settings: UserSettings;

  /** Track app version for migration purposes */
  appVersion: string;
}

// ============================================================================
// UI/UTILITY MODELS
// ============================================================================

export interface CardFilter {
  /** Filter by arcana type */
  arcana?: "major" | "minor";

  /** Filter by suit (minor only) */
  suit?: "cups" | "wands" | "swords" | "pentacles";

  /** Filter by keyword */
  keywords?: string[];

  /** Free text search */
  searchTerm?: string;
}

export interface ReadingStats {
  /** Total number of readings performed */
  totalReadings: number;

  /** Total cards learned */
  cardsLearned: number;

  /** Cards marked as favorite */
  favoriteCards: number;

  /** Number of unique spreads used */
  spreadsUsed: number;

  /** Last reading timestamp */
  lastReadingTime?: number;

  /** Streak: days with at least one reading */
  currentStreak: number;

  /** Best streak achieved */
  bestStreak: number;

  /** Major cards learned count */
  majorCardsLearned: number;

  /** Minor cards learned count */
  minorCardsLearned: number;
}

export interface SpreadStats {
  [spreadId: string]: {
    usageCount: number;
    lastUsedAt: number;
  };
}

export interface LoadingState {
  /** Whether app is loading initial data */
  isLoading: boolean;

  /** Current progress (0-100) */
  progress: number;

  /** Status message */
  message: string;

  /** Error message if loading failed */
  error?: string;
}

export interface AppState {
  /** Whether online or offline */
  isOnline: boolean;

  /** Data last synced timestamp (if applicable) */
  lastSyncTime?: number;

  /** Current version of cached data */
  dataVersion: string;
}

// ============================================================================
// CONSTANTS & ENUMS
// ============================================================================

export const SUITS = ["cups", "wands", "swords", "pentacles"] as const;
export type Suit = (typeof SUITS)[number];

export const ELEMENTS: Record<Suit, string> = {
  cups: "water",
  wands: "fire",
  swords: "air",
  pentacles: "earth",
};

export const MINOR_CARD_NAMES = [
  "Ace",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
  "Page",
  "Knight",
  "Queen",
  "King",
] as const;

export const MAJOR_ARCANA_NAMES = [
  "The Fool",
  "The Magician",
  "The High Priestess",
  "The Empress",
  "The Emperor",
  "The Hierophant",
  "The Lovers",
  "The Chariot",
  "Strength",
  "The Hermit",
  "Wheel of Fortune",
  "Justice",
  "The Hanged Man",
  "Death",
  "Temperance",
  "The Devil",
  "The Tower",
  "The Star",
  "The Moon",
  "The Sun",
  "Judgement",
  "The World",
] as const;

export const DEFAULT_USER_SETTINGS: UserSettings = {
  language: "ko",
  cardImageSize: "medium",
  showReversedCards: true,
  dailyReminder: false,
  dailyReminderTime: "08:00",
  detailedGuidance: true,
};

export const DEFAULT_USER_PROFILE: Omit<
  UserProfile,
  "learnedCards" | "readingSessions"
> = {
  lastUpdated: Date.now(),
  settings: DEFAULT_USER_SETTINGS,
  appVersion: "1.0.0",
};
