// 앱 전역 상태 — 온라인/오프라인 여부, DB 초기화 상태 관리

import { create } from 'zustand';

interface AppStore {
  // 현재 네트워크 연결 상태
  isOnline: boolean;
  // IndexedDB 초기화 및 데이터 로드 완료 여부
  isDBReady: boolean;
  setOnline: (v: boolean) => void;
  setDBReady: (v: boolean) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  isOnline: navigator.onLine,
  isDBReady: false,
  setOnline: (v) => set({ isOnline: v }),
  setDBReady: (v) => set({ isDBReady: v }),
}));
