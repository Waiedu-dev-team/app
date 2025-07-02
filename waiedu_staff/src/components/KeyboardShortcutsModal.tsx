'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const shortcuts = [
  {
    category: 'Điều hướng',
    items: [
      { key: 'H', description: 'Về trang chủ' },
      { key: 'N', description: 'Danh sách thông báo' },
      { key: 'Ctrl + C', description: 'Soạn thông báo mới' },
      { key: 'Ctrl + S', description: 'Cài đặt' },
      { key: 'A', description: 'Thông báo đã lưu trữ' },
      { key: 'T', description: 'Thùng rác' },
      { key: 'Shift + ?', description: 'Hiển thị phím tắt' }
    ]
  },
  {
    category: 'Danh sách thông báo',
    items: [
      { key: 'Ctrl + A', description: 'Chọn tất cả' },
      { key: 'Delete', description: 'Xóa các mục đã chọn' },
      { key: 'E', description: 'Lưu trữ các mục đã chọn' },
      { key: 'M', description: 'Đánh dấu đã đọc' },
      { key: 'R', description: 'Làm mới danh sách' },
      { key: 'F5', description: 'Làm mới trang' }
    ]
  },
  {
    category: 'Chi tiết thông báo',
    items: [
      { key: 'R', description: 'Trả lời' },
      { key: 'F', description: 'Chuyển tiếp' },
      { key: 'Delete', description: 'Xóa thông báo' },
      { key: 'E', description: 'Lưu trữ' },
      { key: 'I', description: 'Đánh dấu quan trọng' },
      { key: 'Ctrl + P', description: 'In thông báo' },
      { key: 'Escape', description: 'Quay lại' }
    ]
  },
  {
    category: 'Chung',
    items: [
      { key: 'Ctrl + Z', description: 'Hoàn tác' },
      { key: 'Ctrl + Y', description: 'Làm lại' },
      { key: 'Ctrl + F', description: 'Tìm kiếm' },
      { key: 'Escape', description: 'Đóng modal/dialog' }
    ]
  }
];

export default function KeyboardShortcutsModal({ isOpen, onClose }: KeyboardShortcutsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <h3 className="text-xl font-bold text-gray-900 flex items-center">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M9 12a1 1 0 01-1-1V5a1 1 0 112 0v6a1 1 0 01-1 1zM9 15a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"/>
                <path fillRule="evenodd" d="M9 2a8 8 0 100 16A8 8 0 009 2zM7 9a2 2 0 114 0 2 2 0 01-4 0z" clipRule="evenodd"/>
              </svg>
            </div>
            Phím tắt hệ thống
          </h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
            </svg>
          </button>
        </div>
        
        <div className="p-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-2">
              <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
              </svg>
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">Lưu ý:</p>
                <p>Phím tắt chỉ hoạt động khi bạn không đang nhập liệu trong ô text hoặc textarea.</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {shortcuts.map((category, categoryIndex) => (
              <div key={categoryIndex} className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
                  </svg>
                  {category.category}
                </h4>
                <div className="space-y-2">
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center justify-between py-2 px-3 bg-white rounded-md border border-gray-200">
                      <span className="text-sm text-gray-700">{item.description}</span>
                      <div className="flex items-center space-x-1">
                        {item.key.split(' + ').map((keyPart, keyIndex) => (
                          <span key={keyIndex} className="inline-flex items-center">
                            {keyIndex > 0 && <span className="text-gray-400 mx-1">+</span>}
                            <kbd className="inline-flex items-center px-2 py-1 bg-gray-100 border border-gray-300 rounded text-xs font-mono text-gray-700">
                              {keyPart}
                            </kbd>
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <svg className="w-5 h-5 text-yellow-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
              </svg>
              <div className="text-sm text-yellow-800">
                <p className="font-medium mb-1">Mẹo sử dụng:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Bấm <kbd className="px-1 py-0.5 bg-yellow-100 border border-yellow-300 rounded text-xs">Shift + ?</kbd> bất kỳ lúc nào để xem lại phím tắt</li>
                  <li>Sử dụng <kbd className="px-1 py-0.5 bg-yellow-100 border border-yellow-300 rounded text-xs">Tab</kbd> để di chuyển giữa các phần tử</li>
                  <li>Bấm <kbd className="px-1 py-0.5 bg-yellow-100 border border-yellow-300 rounded text-xs">Escape</kbd> để đóng modal hoặc hủy thao tác</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
          <Button 
            onClick={onClose}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
          >
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
            </svg>
            Đã hiểu
          </Button>
        </div>
      </div>
    </div>
  );
}
