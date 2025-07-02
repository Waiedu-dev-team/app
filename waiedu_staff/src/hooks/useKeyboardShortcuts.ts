'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface KeyboardShortcut {
  key: string;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  action: () => void;
  description: string;
}

interface UseKeyboardShortcutsProps {
  shortcuts: KeyboardShortcut[];
  enabled?: boolean;
}

export function useKeyboardShortcuts({ shortcuts, enabled = true }: UseKeyboardShortcutsProps) {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Don't trigger shortcuts when user is typing in inputs
      const target = event.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        return;
      }

      for (const shortcut of shortcuts) {
        const ctrlMatch = shortcut.ctrlKey === undefined || shortcut.ctrlKey === event.ctrlKey;
        const shiftMatch = shortcut.shiftKey === undefined || shortcut.shiftKey === event.shiftKey;
        const altMatch = shortcut.altKey === undefined || shortcut.altKey === event.altKey;
        const keyMatch = shortcut.key.toLowerCase() === event.key.toLowerCase();

        if (ctrlMatch && shiftMatch && altMatch && keyMatch) {
          event.preventDefault();
          shortcut.action();
          break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts, enabled]);
}

// Global keyboard shortcuts for the app
export function useGlobalKeyboardShortcuts() {
  const router = useRouter();

  const shortcuts: KeyboardShortcut[] = [
    {
      key: 'h',
      description: 'Về trang chủ',
      action: () => router.push('/home')
    },
    {
      key: 'n',
      description: 'Danh sách thông báo',
      action: () => router.push('/notifications')
    },
    {
      key: 'c',
      ctrlKey: true,
      description: 'Soạn thông báo mới',
      action: () => router.push('/notifications/compose')
    },
    {
      key: 's',
      ctrlKey: true,
      description: 'Cài đặt',
      action: () => router.push('/notifications/settings')
    },
    {
      key: 'a',
      description: 'Thông báo đã lưu trữ',
      action: () => router.push('/notifications/archived')
    },
    {
      key: 't',
      description: 'Thùng rác',
      action: () => router.push('/notifications/trash')
    },
    {
      key: '?',
      shiftKey: true,
      description: 'Hiển thị phím tắt',
      action: () => {
        // This will be handled by the component that uses this hook
      }
    }
  ];

  return shortcuts;
}

// Keyboard shortcuts for notification list
export function useNotificationListShortcuts(callbacks: {
  onSelectAll?: () => void;
  onDelete?: () => void;
  onArchive?: () => void;
  onMarkAsRead?: () => void;
  onRefresh?: () => void;
}) {
  const shortcuts: KeyboardShortcut[] = [
    {
      key: 'a',
      ctrlKey: true,
      description: 'Chọn tất cả',
      action: () => callbacks.onSelectAll?.()
    },
    {
      key: 'Delete',
      description: 'Xóa các mục đã chọn',
      action: () => callbacks.onDelete?.()
    },
    {
      key: 'e',
      description: 'Lưu trữ các mục đã chọn',
      action: () => callbacks.onArchive?.()
    },
    {
      key: 'm',
      description: 'Đánh dấu đã đọc',
      action: () => callbacks.onMarkAsRead?.()
    },
    {
      key: 'r',
      description: 'Làm mới danh sách',
      action: () => callbacks.onRefresh?.()
    },
    {
      key: 'F5',
      description: 'Làm mới trang',
      action: () => window.location.reload()
    }
  ];

  return shortcuts;
}

// Keyboard shortcuts for notification detail
export function useNotificationDetailShortcuts(callbacks: {
  onReply?: () => void;
  onForward?: () => void;
  onDelete?: () => void;
  onArchive?: () => void;
  onMarkImportant?: () => void;
  onPrint?: () => void;
  onBack?: () => void;
}) {
  const shortcuts: KeyboardShortcut[] = [
    {
      key: 'r',
      description: 'Trả lời',
      action: () => callbacks.onReply?.()
    },
    {
      key: 'f',
      description: 'Chuyển tiếp',
      action: () => callbacks.onForward?.()
    },
    {
      key: 'Delete',
      description: 'Xóa thông báo',
      action: () => callbacks.onDelete?.()
    },
    {
      key: 'e',
      description: 'Lưu trữ',
      action: () => callbacks.onArchive?.()
    },
    {
      key: 'i',
      description: 'Đánh dấu quan trọng',
      action: () => callbacks.onMarkImportant?.()
    },
    {
      key: 'p',
      ctrlKey: true,
      description: 'In thông báo',
      action: () => callbacks.onPrint?.()
    },
    {
      key: 'Escape',
      description: 'Quay lại',
      action: () => callbacks.onBack?.()
    }
  ];

  return shortcuts;
}
