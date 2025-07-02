'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ArchivedNotification {
  id: number;
  from: string;
  fromEmail: string;
  subject: string;
  preview: string;
  content: string;
  time: string;
  fullTime: string;
  archivedDate: string;
  priority: 'high' | 'normal';
  category: string;
}

export default function ArchivedNotificationsPage() {
  const router = useRouter();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedNotifications, setSelectedNotifications] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 5;

  // Mock archived notifications data
  const archivedNotifications: ArchivedNotification[] = [
    {
      id: 101,
      from: 'Marketing',
      fromEmail: 'marketing@waiedu.com',
      subject: 'Báo cáo kết quả campaign Q2/2025',
      preview: 'Kính gửi anh/chị, Marketing team xin gửi báo cáo chi tiết kết quả các campaign trong Q2/2025...',
      content: 'Kính gửi anh/chị,\n\nMarketing team xin gửi báo cáo chi tiết kết quả các campaign trong Q2/2025:\n\n1. Facebook Ads: 2.5M impressions, CTR 3.2%\n2. Google Ads: 1.8M impressions, CTR 4.1%\n3. Content Marketing: 150 bài viết, 500K views\n4. Email Marketing: 50K emails, Open rate 25%\n\nTổng ROI: 250%\nSố học viên mới: 1,200\nDoanh thu: 15 tỷ VND\n\nCảm ơn sự hỗ trợ của tất cả các bộ phận!',
      time: '2 tuần',
      fullTime: '15/06/2025 10:30',
      archivedDate: '20/06/2025 14:15',
      priority: 'normal',
      category: 'marketing'
    },
    {
      id: 102,
      from: 'HR',
      fromEmail: 'hr@waiedu.com',
      subject: 'Kết quả đánh giá hiệu suất Q2',
      preview: 'Thông báo kết quả đánh giá hiệu suất nhân viên quý 2 năm 2025. Anh/chị vui lòng xem chi tiết...',
      content: 'Thông báo kết quả đánh giá hiệu suất nhân viên quý 2 năm 2025.\n\nKết quả đánh giá của anh/chị:\n- Hiệu suất công việc: 4.2/5\n- Tinh thần làm việc: 4.5/5\n- Khả năng teamwork: 4.3/5\n- Sáng tạo và đổi mới: 4.0/5\n\nXếp loại: Xuất sắc\nMức tăng lương: 15%\nThưởng hiệu suất: 5 triệu VND\n\nChúc mừng anh/chị!',
      time: '3 tuần',
      fullTime: '08/06/2025 16:45',
      archivedDate: '10/06/2025 09:20',
      priority: 'high',
      category: 'internal'
    },
    {
      id: 103,
      from: 'IT',
      fromEmail: 'it@waiedu.com',
      subject: 'Hoàn tất nâng cấp hệ thống',
      preview: 'Chúng tôi đã hoàn tất việc nâng cấp hệ thống LMS và website chính. Các tính năng mới...',
      content: 'Chúng tôi đã hoàn tất việc nâng cấp hệ thống LMS và website chính.\n\nCác tính năng mới:\n1. Giao diện người dùng được cải tiến\n2. Tốc độ tải trang nhanh hơn 40%\n3. Hệ thống chat real-time\n4. Mobile app mới\n5. AI assistant tự động\n\nDowntime: 2 giờ (thấp hơn dự kiến)\nBugs phát hiện: 0\nUser satisfaction: 98%\n\nCảm ơn sự kiên nhẫn của mọi người!',
      time: '1 tháng',
      fullTime: '25/05/2025 08:00',
      archivedDate: '27/05/2025 10:30',
      priority: 'normal',
      category: 'maintenance'
    },
    {
      id: 104,
      from: 'Ban Giám đốc',
      fromEmail: 'ceo@waiedu.com',
      subject: 'Thông báo về chính sách WFH mới',
      preview: 'Kể từ tháng 7/2025, công ty sẽ áp dụng chính sách Work From Home linh hoạt mới...',
      content: 'Kể từ tháng 7/2025, công ty sẽ áp dụng chính sách Work From Home linh hoạt mới:\n\n1. WFH tối đa 3 ngày/tuần\n2. Bắt buộc có mặt thứ 2 và thứ 6\n3. Đăng ký WFH trước 1 ngày\n4. Báo cáo công việc hàng ngày\n5. Meeting online tối đa 4 tiếng/ngày\n\nMục tiêu:\n- Cân bằng work-life\n- Tăng hiệu suất làm việc\n- Giảm chi phí vận hành\n- Thu hút nhân tài\n\nChính sách có hiệu lực từ 01/07/2025.',
      time: '5 tuần',
      fullTime: '20/05/2025 14:30',
      archivedDate: '22/05/2025 16:45',
      priority: 'high',
      category: 'announcement'
    },
    {
      id: 105,
      from: 'Customer Support',
      fromEmail: 'support@waiedu.com',
      subject: 'Tổng kết tháng 5: Chất lượng hỗ trợ khách hàng',
      preview: 'Báo cáo chi tiết về chất lượng dịch vụ hỗ trợ khách hàng trong tháng 5/2025...',
      content: 'Báo cáo chi tiết về chất lượng dịch vụ hỗ trợ khách hàng trong tháng 5/2025:\n\nCác chỉ số chính:\n- Tổng số ticket: 2,850\n- Thời gian phản hồi trung bình: 15 phút\n- Tỷ lệ giải quyết lần đầu: 89%\n- Điểm hài lòng khách hàng: 4.7/5\n- Số khiếu nại: 12 (giảm 60% so với tháng 4)\n\nTop vấn đề:\n1. Lỗi đăng nhập (25%)\n2. Thanh toán (20%)\n3. Truy cập khóa học (18%)\n\nCải tiến đã thực hiện:\n- Chatbot AI thông minh hơn\n- FAQ chi tiết hơn\n- Video hướng dẫn\n\nMục tiêu tháng 6: Tăng satisfaction lên 4.8/5',
      time: '6 tuần',
      fullTime: '30/05/2025 17:20',
      archivedDate: '05/06/2025 08:15',
      priority: 'normal',
      category: 'support'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Simulate loading
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    router.push('/login');
  };

  // Filter notifications
  const filteredNotifications = archivedNotifications.filter(notification => {
    const matchesSearch = notification.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.preview.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || notification.category === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  // Pagination
  const totalPages = Math.ceil(filteredNotifications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNotifications = filteredNotifications.slice(startIndex, endIndex);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedNotifications(currentNotifications.map(n => n.id));
    } else {
      setSelectedNotifications([]);
    }
  };

  const handleSelectNotification = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedNotifications([...selectedNotifications, id]);
    } else {
      setSelectedNotifications(selectedNotifications.filter(nId => nId !== id));
    }
  };

  const handleRestore = () => {
    if (selectedNotifications.length === 0) {
      alert('Vui lòng chọn ít nhất một thông báo để khôi phục.');
      return;
    }
    
    if (confirm(`Bạn có muốn khôi phục ${selectedNotifications.length} thông báo đã chọn?`)) {
      alert(`Đã khôi phục ${selectedNotifications.length} thông báo thành công!`);
      setSelectedNotifications([]);
    }
  };

  const handleDeletePermanently = () => {
    if (selectedNotifications.length === 0) {
      alert('Vui lòng chọn ít nhất một thông báo để xóa vĩnh viễn.');
      return;
    }
    
    if (confirm(`Bạn có chắc chắn muốn xóa vĩnh viễn ${selectedNotifications.length} thông báo? Hành động này không thể hoàn tác.`)) {
      alert(`Đã xóa vĩnh viễn ${selectedNotifications.length} thông báo!`);
      setSelectedNotifications([]);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gray-900 text-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <span className="text-lg font-semibold">WaiEdu Staff</span>
              <span className="text-gray-300">|</span>
              <span className="text-gray-300">Thông báo đã lưu trữ</span>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="text-sm">
                <div className="text-gray-300">Nguyen Van A (NV001)</div>
                <div className="text-gray-400">Phòng IT</div>
              </div>
              
              <div className="text-sm text-gray-300">
                {currentTime.toLocaleString('vi-VN')}
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout}
                className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
              >
                Đăng xuất
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Scrolling notification */}
      <div className="bg-blue-900 text-white py-2">
        <div className="animate-marquee whitespace-nowrap">
          <div className="inline-flex items-center space-x-8">
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-2 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 1.414L10.586 9.5 9.293 10.793a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd"/>
              </svg>
              Chúc mừng WaiEdu đạt 10,000 học viên! Cảm ơn sự đóng góp của tất cả nhân viên!
            </span>
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-2 text-blue-300" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
              </svg>
              Khóa học mới "Python for AI" sẽ ra mắt vào tuần tới
            </span>
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-2 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              Mục tiêu Q3: Tăng trưởng 200% - Cùng nhau phấn đấu!
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button variant="outline" onClick={() => router.push('/notifications')} className="flex items-center space-x-2">
            <span>←</span>
            <span>Quay lại thông báo</span>
          </Button>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <svg className="w-8 h-8 mr-3 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z"/>
              <path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd"/>
            </svg>
            Thông báo đã lưu trữ
          </h1>
          <p className="mt-2 text-gray-600">Quản lý các thông báo đã được lưu trữ</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <Input
                type="text"
                placeholder="Tìm kiếm thông báo đã lưu trữ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">Tất cả danh mục</option>
                <option value="support">Hỗ trợ</option>
                <option value="internal">Nội bộ</option>
                <option value="announcement">Thông báo</option>
                <option value="maintenance">Bảo trì</option>
                <option value="marketing">Marketing</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedNotifications.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <span className="text-blue-800">
                Đã chọn {selectedNotifications.length} thông báo
              </span>
              <div className="space-x-3">
                <Button size="sm" onClick={handleRestore} className="bg-green-600 hover:bg-green-700">
                  Khôi phục
                </Button>
                <Button size="sm" variant="outline" onClick={handleDeletePermanently} className="text-red-600 border-red-300 hover:bg-red-50">
                  Xóa vĩnh viễn
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-8">
              <div className="text-center">
                <svg className="animate-spin h-8 w-8 text-blue-600 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 3.5a6.5 6.5 0 106.5 6.5h-2a4.5 4.5 0 11-4.5-4.5V3.5z"/>
                </svg>
                <p className="text-gray-600">Đang tải thông báo đã lưu trữ...</p>
              </div>
            </div>
          </div>
        )}

        {/* Notifications List */}
        {!isLoading && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Table Header */}
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center">
                <label className="inline-flex items-center mr-4">
                  <input
                    type="checkbox"
                    checked={currentNotifications.length > 0 && selectedNotifications.length === currentNotifications.length}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="form-checkbox h-4 w-4 text-blue-600 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Chọn tất cả</span>
                </label>
                <span className="text-sm text-gray-500">
                  Hiển thị {startIndex + 1}-{Math.min(endIndex, filteredNotifications.length)} trong tổng số {filteredNotifications.length} thông báo
                </span>
              </div>
            </div>

            {/* Empty State */}
            {filteredNotifications.length === 0 && (
              <div className="px-6 py-12">
                <div className="text-center">
                  <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z"/>
                    <path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd"/>
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Không có thông báo đã lưu trữ
                  </h3>
                  <p className="text-gray-500 mb-4">
                    {searchTerm ? 'Không tìm thấy thông báo nào phù hợp với từ khóa tìm kiếm.' : 'Chưa có thông báo nào được lưu trữ.'}
                  </p>
                  {searchTerm && (
                    <Button variant="outline" onClick={() => setSearchTerm('')}>
                      Xóa bộ lọc
                    </Button>
                  )}
                </div>
              </div>
            )}

            {/* Notifications */}
            {currentNotifications.map((notification) => (
              <div key={notification.id} className="px-6 py-4 border-b border-gray-200 hover:bg-gray-50">
                <div className="flex items-start space-x-4">
                  <label className="inline-flex items-center mt-1">
                    <input
                      type="checkbox"
                      checked={selectedNotifications.includes(notification.id)}
                      onChange={(e) => handleSelectNotification(notification.id, e.target.checked)}
                      className="form-checkbox h-4 w-4 text-blue-600 rounded"
                    />
                  </label>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {/* Source Badge */}
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          notification.from === 'Marketing' ? 'bg-pink-100 text-pink-800' :
                          notification.from === 'HR' ? 'bg-orange-100 text-orange-800' :
                          notification.from === 'Ban Giám đốc' ? 'bg-purple-100 text-purple-800' :
                          notification.from === 'IT' ? 'bg-gray-100 text-gray-800' :
                          notification.from === 'Customer Support' ? 'bg-green-100 text-green-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {notification.from}
                        </span>

                        {/* Priority */}
                        {notification.priority === 'high' && (
                          <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/>
                          </svg>
                        )}

                        {/* Archived Badge */}
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z"/>
                            <path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd"/>
                          </svg>
                          Đã lưu trữ
                        </span>
                      </div>

                      <div className="text-sm text-gray-500">
                        {notification.time}
                      </div>
                    </div>

                    <div className="mt-2">
                      <h3 className="text-lg font-medium text-gray-900 cursor-pointer hover:text-blue-600"
                          onClick={() => router.push(`/notifications/${notification.id}`)}>
                        {notification.subject}
                      </h3>
                      <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                        {notification.preview}
                      </p>
                    </div>

                    <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                      <div>
                        Lưu trữ: {notification.archivedDate}
                      </div>
                      <div className="flex items-center space-x-4">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            if (confirm('Bạn có muốn khôi phục thông báo này?')) {
                              alert('Thông báo đã được khôi phục thành công!');
                            }
                          }}
                          className="text-green-600 border-green-300 hover:bg-green-50"
                        >
                          Khôi phục
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => router.push(`/notifications/${notification.id}`)}
                          className="hover:bg-gray-50"
                        >
                          Xem chi tiết
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {!isLoading && filteredNotifications.length > 0 && (
          <div className="bg-white px-6 py-4 border-t border-gray-200 rounded-b-lg">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Hiển thị {startIndex + 1}-{Math.min(endIndex, filteredNotifications.length)} trong tổng số {filteredNotifications.length} thông báo
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Trước
                </Button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(page)}
                    className={currentPage === page ? "bg-blue-600 hover:bg-blue-700" : ""}
                  >
                    {page}
                  </Button>
                ))}
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Sau
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
