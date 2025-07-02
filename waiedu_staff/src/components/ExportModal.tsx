'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  exportToCSV, 
  exportToJSON, 
  exportToExcel, 
  exportToPDF,
  getExportSummary,
  type ExportNotification 
} from '@/lib/exportUtils';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: ExportNotification[];
  selectedIds?: number[];
}

export default function ExportModal({ 
  isOpen, 
  onClose, 
  notifications, 
  selectedIds = [] 
}: ExportModalProps) {
  const [exportFormat, setExportFormat] = useState<'csv' | 'json' | 'excel' | 'pdf'>('csv');
  const [exportScope, setExportScope] = useState<'all' | 'selected' | 'filtered'>('all');
  const [includeContent, setIncludeContent] = useState(true);
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen) return null;

  const dataToExport = exportScope === 'selected' 
    ? notifications.filter(n => selectedIds.includes(n.id))
    : notifications;

  const summary = getExportSummary(dataToExport);

  const handleExport = async () => {
    if (dataToExport.length === 0) {
      alert('Không có dữ liệu để xuất');
      return;
    }

    setIsExporting(true);

    try {
      // Xử lý dữ liệu dựa trên lựa chọn
      const processedData = includeContent 
        ? dataToExport 
        : dataToExport.map(n => ({ ...n, content: n.content.substring(0, 100) + '...' }));

      const filename = `thong-bao-${new Date().toISOString().split('T')[0]}`;

      switch (exportFormat) {
        case 'csv':
          exportToCSV(processedData, filename);
          break;
        case 'json':
          exportToJSON(processedData, filename);
          break;
        case 'excel':
          exportToExcel(processedData, filename);
          break;
        case 'pdf':
          exportToPDF(processedData, filename);
          break;
      }

      // Đóng modal sau khi xuất thành công
      setTimeout(() => {
        onClose();
      }, 1000);

    } catch (error) {
      console.error('Lỗi khi xuất dữ liệu:', error);
      alert('Có lỗi xảy ra khi xuất dữ liệu');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md animate-fadeIn">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Xuất danh sách thông báo
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              disabled={isExporting}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Export Scope */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Phạm vi xuất
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="exportScope"
                  value="all"
                  checked={exportScope === 'all'}
                  onChange={(e) => setExportScope(e.target.value as any)}
                  className="mr-2"
                />
                <span className="text-sm">Tất cả thông báo ({notifications.length})</span>
              </label>
              {selectedIds.length > 0 && (
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="exportScope"
                    value="selected"
                    checked={exportScope === 'selected'}
                    onChange={(e) => setExportScope(e.target.value as any)}
                    className="mr-2"
                  />
                  <span className="text-sm">Thông báo đã chọn ({selectedIds.length})</span>
                </label>
              )}
            </div>
          </div>

          {/* Export Format */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Định dạng xuất
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: 'csv', label: 'CSV', desc: 'Excel, Google Sheets' },
                { value: 'excel', label: 'Excel', desc: 'Microsoft Excel' },
                { value: 'json', label: 'JSON', desc: 'Dữ liệu JSON' },
                { value: 'pdf', label: 'PDF', desc: 'In PDF' }
              ].map((format) => (
                <label key={format.value} className="flex flex-col p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="exportFormat"
                      value={format.value}
                      checked={exportFormat === format.value}
                      onChange={(e) => setExportFormat(e.target.value as any)}
                      className="mr-2"
                    />
                    <span className="font-medium text-sm">{format.label}</span>
                  </div>
                  <span className="text-xs text-gray-500 ml-5">{format.desc}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Options */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Tùy chọn
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={includeContent}
                onChange={(e) => setIncludeContent(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm">Bao gồm nội dung đầy đủ</span>
            </label>
            <p className="text-xs text-gray-500 mt-1 ml-5">
              Nếu không chọn, chỉ xuất 100 ký tự đầu
            </p>
          </div>

          {/* Summary */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-sm text-gray-900 mb-2">Tóm tắt dữ liệu xuất:</h4>
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
              <div>Tổng số: {summary.total}</div>
              <div>Chưa đọc: {summary.unread}</div>
              <div>Ưu tiên cao: {summary.high}</div>
              <div>Danh mục: {summary.categories}</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isExporting}
          >
            Hủy
          </Button>
          <Button
            onClick={handleExport}
            disabled={isExporting || dataToExport.length === 0}
            className="flex items-center"
          >
            {isExporting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Đang xuất...
              </>
            ) : (
              <>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Xuất dữ liệu
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
