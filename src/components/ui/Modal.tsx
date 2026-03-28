// 모달 다이얼로그 — 카드 상세 팝업, 노트 입력 등에 사용

import { useEffect, type ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  // 모달이 열려 있는 동안 배경 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 500,
        display: 'flex',
        alignItems: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.7)',
      }}
      onClick={onClose}
    >
      {/* 클릭 이벤트가 배경으로 전파되지 않도록 차단 */}
      <div
        style={{
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          backgroundColor: '#1e1040',
          borderRadius: '16px 16px 0 0',
          padding: '24px 20px',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 상단 드래그 핸들 */}
        <div
          style={{
            width: 36,
            height: 4,
            borderRadius: 2,
            backgroundColor: 'rgba(255,255,255,0.2)',
            margin: '0 auto 16px',
          }}
        />
        {title && (
          <h2
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: 'white',
              marginBottom: 16,
              textAlign: 'center',
            }}
          >
            {title}
          </h2>
        )}
        {children}
      </div>
    </div>
  );
}
