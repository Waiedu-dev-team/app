// Utility functions for exporting data

export interface ExportNotification {
  id: number;
  title: string;
  content: string;
  sender: string;
  recipient: string;
  priority: 'high' | 'normal' | 'low';
  status: 'read' | 'unread';
  createdAt: string;
  category: string;
  tags: string[];
}

// Export to CSV
export const exportToCSV = (data: ExportNotification[], filename: string = 'notifications') => {
  const csvContent = [
    // Header
    ['ID', 'Tiêu đề', 'Nội dung', 'Người gửi', 'Người nhận', 'Mức độ ưu tiên', 'Trạng thái', 'Ngày tạo', 'Danh mục', 'Thẻ'].join(','),
    // Data rows
    ...data.map(notification => [
      notification.id,
      `"${notification.title.replace(/"/g, '""')}"`,
      `"${notification.content.replace(/"/g, '""')}"`,
      `"${notification.sender.replace(/"/g, '""')}"`,
      `"${notification.recipient.replace(/"/g, '""')}"`,
      notification.priority === 'high' ? 'Cao' : notification.priority === 'normal' ? 'Bình thường' : 'Thấp',
      notification.status === 'read' ? 'Đã đọc' : 'Chưa đọc',
      notification.createdAt,
      `"${notification.category.replace(/"/g, '""')}"`,
      `"${notification.tags.join(', ').replace(/"/g, '""')}"`
    ].join(','))
  ].join('\n');

  downloadFile(csvContent, `${filename}.csv`, 'text/csv;charset=utf-8;');
};

// Export to JSON
export const exportToJSON = (data: ExportNotification[], filename: string = 'notifications') => {
  const jsonContent = JSON.stringify(data, null, 2);
  downloadFile(jsonContent, `${filename}.json`, 'application/json');
};

// Export to Excel (simplified as CSV with Excel-specific formatting)
export const exportToExcel = (data: ExportNotification[], filename: string = 'notifications') => {
  // Add BOM for proper UTF-8 handling in Excel
  const BOM = '\uFEFF';
  const csvContent = BOM + [
    // Header với tiếng Việt
    ['ID', 'Tiêu đề', 'Nội dung', 'Người gửi', 'Người nhận', 'Mức độ ưu tiên', 'Trạng thái', 'Ngày tạo', 'Danh mục', 'Thẻ'].join('\t'),
    // Data rows
    ...data.map(notification => [
      notification.id,
      notification.title.replace(/\t/g, ' '),
      notification.content.replace(/\t/g, ' ').replace(/\n/g, ' '),
      notification.sender.replace(/\t/g, ' '),
      notification.recipient.replace(/\t/g, ' '),
      notification.priority === 'high' ? 'Cao' : notification.priority === 'normal' ? 'Bình thường' : 'Thấp',
      notification.status === 'read' ? 'Đã đọc' : 'Chưa đọc',
      notification.createdAt,
      notification.category.replace(/\t/g, ' '),
      notification.tags.join(', ').replace(/\t/g, ' ')
    ].join('\t'))
  ].join('\n');

  downloadFile(csvContent, `${filename}.xls`, 'application/vnd.ms-excel;charset=utf-8;');
};

// Export to PDF (simplified - would need a PDF library for proper implementation)
export const exportToPDF = (data: ExportNotification[], filename: string = 'notifications') => {
  // For now, we'll create an HTML representation that can be printed to PDF
  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Danh sách thông báo</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        h1 { color: #333; border-bottom: 2px solid #ddd; padding-bottom: 10px; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f5f5f5; font-weight: bold; }
        .priority-high { color: #dc2626; font-weight: bold; }
        .priority-normal { color: #059669; }
        .priority-low { color: #6b7280; }
        .status-unread { font-weight: bold; }
        @media print {
            body { margin: 0; }
            table { font-size: 12px; }
        }
    </style>
</head>
<body>
    <h1>Danh sách thông báo</h1>
    <p>Xuất ngày: ${new Date().toLocaleString('vi-VN')}</p>
    <p>Tổng số: ${data.length} thông báo</p>
    
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Tiêu đề</th>
                <th>Người gửi</th>
                <th>Người nhận</th>
                <th>Mức độ ưu tiên</th>
                <th>Trạng thái</th>
                <th>Ngày tạo</th>
                <th>Danh mục</th>
            </tr>
        </thead>
        <tbody>
            ${data.map(notification => `
                <tr>
                    <td>${notification.id}</td>
                    <td>${notification.title}</td>
                    <td>${notification.sender}</td>
                    <td>${notification.recipient}</td>
                    <td class="priority-${notification.priority}">
                        ${notification.priority === 'high' ? 'Cao' : notification.priority === 'normal' ? 'Bình thường' : 'Thấp'}
                    </td>
                    <td class="${notification.status === 'unread' ? 'status-unread' : ''}">
                        ${notification.status === 'read' ? 'Đã đọc' : 'Chưa đọc'}
                    </td>
                    <td>${new Date(notification.createdAt).toLocaleString('vi-VN')}</td>
                    <td>${notification.category}</td>
                </tr>
            `).join('')}
        </tbody>
    </table>
</body>
</html>`;

  // Open in new window for printing
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();
    // Auto print after a short delay
    setTimeout(() => {
      printWindow.print();
    }, 500);
  }
};

// Helper function to download file
const downloadFile = (content: string, filename: string, contentType: string) => {
  const blob = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.style.display = 'none';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
};

// Get summary statistics for export
export const getExportSummary = (data: ExportNotification[]) => {
  const total = data.length;
  const unread = data.filter(n => n.status === 'unread').length;
  const high = data.filter(n => n.priority === 'high').length;
  const categories = Array.from(new Set(data.map(n => n.category)));
  
  return {
    total,
    unread,
    read: total - unread,
    high,
    normal: data.filter(n => n.priority === 'normal').length,
    low: data.filter(n => n.priority === 'low').length,
    categories: categories.length,
    uniqueCategories: categories
  };
};
