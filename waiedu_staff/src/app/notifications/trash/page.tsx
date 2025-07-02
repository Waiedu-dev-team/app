'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface DeletedNotification {
  id: number;
  from: string;
  fromEmail: string;
  subject: string;
  preview: string;
  content: string;
  time: string;
  fullTime: string;
  deletedDate: string;
  priority: 'high' | 'normal';
  category: string;
}

export default function TrashNotificationsPage() {
  const router = useRouter();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedNotifications, setSelectedNotifications] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 5;

  // Mock deleted notifications data
  const deletedNotifications: DeletedNotification[] = [
    {
      id: 201,
      from: 'Spam Bot',
      fromEmail: 'noreply@suspicious.com',
      subject: 'Chúc mừng! Bạn đã trúng 1 tỷ VND!',
      preview: 'Chúc mừng bạn đã trúng giải đặc biệt 1 tỷ VND từ chương trình khuyến mãi của chúng tôi...',
      content: 'Chúc mừng bạn đã trúng giải đặc biệt 1 tỷ VND!\n\nĐể nhận giải, vui lòng cung cấp:\n- Số CMND\n- Mật khẩu ngân hàng\n- Mã pin ATM\n\nLiên hệ ngay: 0999.xxx.xxx',
      time: '3 ngày',
      fullTime: '26/06/2025 08:30',
      deletedDate: '26/06/2025 08:31',
      priority: 'normal',
      category: 'spam'
    },
    {
      id: 202,
      from: 'Ex-Employee',
      fromEmail: 'angry@former.com',
      subject: 'Phản hồi không hài lòng về chính sách',
      preview: 'Tôi rất không hài lòng về cách công ty đối xử với nhân viên cũ...',
      content: 'Tôi rất không hài lòng về cách công ty đối xử với nhân viên cũ. Chính sách bồi thường không công bằng và HR làm việc không chuyên nghiệp.\n\nTôi sẽ tố cáo lên cơ quan chức năng nếu không được giải quyết thỏa đáng.',
      time: '5 ngày',
      fullTime: '24/06/2025 15:45',
      deletedDate: '24/06/2025 16:00',
      priority: 'normal',
      category: 'complaint'
    },
    {
      id: 203,
      from: 'Competitor',
      fromEmail: 'info@competitor.com',
      subject: 'Đề xuất hợp tác đặc biệt',
      preview: 'Chúng tôi muốn đề xuất một hợp tác đặc biệt có thể mang lại lợi ích cho cả hai bên...',
      content: 'Chúng tôi là đối thủ cạnh tranh nhưng muốn đề xuất hợp tác.\n\nNội dung:\n- Chia sẻ danh sách khách hàng\n- Thống nhất giá cả\n- Phân chia thị trường\n\nĐây là cơ hội tốt để cùng thống trị thị trường.',
      time: '1 tuần',
      fullTime: '22/06/2025 10:20',
      deletedDate: '22/06/2025 10:25',
      priority: 'normal',
      category: 'suspicious'
    },
    {
      id: 204,
      from: 'Virus Alert',
      fromEmail: 'security@fake-bank.com',
      subject: 'Cảnh báo bảo mật tài khoản ngân hàng',
      preview: 'Tài khoản ngân hàng của bạn đang có dấu hiệu bất thường. Vui lòng xác minh ngay...',
      content: 'CẢNH BÁO BẢO MẬT!\n\nTài khoản ngân hàng của bạn có hoạt động đáng ngờ.\n\nClick vào link sau để xác minh:\nhttp://fake-bank-security.malware.com\n\nNếu không xác minh trong 24h, tài khoản sẽ bị khóa vĩnh viễn.',
      time: '2 tuần',
      fullTime: '15/06/2025 09:15',
      deletedDate: '15/06/2025 09:16',
      priority: 'high',
      category: 'malware'
    },
    {
      id: 205,
      from: 'Old System',
      fromEmail: 'system@old-waiedu.com',
      subject: 'Test notification - please ignore',
      preview: 'This is a test notification from the old system. Please ignore this message...',
      content: 'This is a test notification from the old system during migration.\n\nTest data:\n- User: test@test.com\n- Date: 2025-01-01\n- Status: TEST\n\nPlease ignore this message.',
      time: '3 tuần',
      fullTime: '08/06/2025 14:30',
      deletedDate: '08/06/2025 14:35',
      priority: 'normal',
      category: 'test'
    },
    {
      id: 206,
      from: 'Disgruntled Customer',
      fromEmail: 'hate@waiedu.com',
      subject: 'Khiếu nại dịch vụ tệ',
      preview: 'Dịch vụ của các bạn quá tệ! Tôi đã mất tiền mà không học được gì...',
      content: 'Dịch vụ của WaiEdu quá tệ!\n\n- Giảng viên không có tâm\n- Nội dung lỗi thời\n- Hỗ trợ chậm chạp\n- Lừa đảo học viên\n\nTôi sẽ đăng lên mạng xã hội để mọi người biết!',
      time: '1 tháng',
      fullTime: '29/05/2025 16:45',
      deletedDate: '29/05/2025 17:00',
      priority: 'normal',
      category: 'complaint'
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
  const filteredNotifications = deletedNotifications.filter(notification => {
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

  const handleEmptyTrash = () => {
    if (confirm('Bạn có chắc chắn muốn xóa vĩnh viễn TẤT CẢ thông báo trong thùng rác? Hành động này không thể hoàn tác.')) {
      if (confirm('Xác nhận lần cuối: Xóa vĩnh viễn tất cả thông báo?')) {
        alert('Đã xóa vĩnh viễn tất cả thông báo trong thùng rác!');
        setSelectedNotifications([]);
      }
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getCategoryName = (category: string) => {
    const categories: { [key: string]: string } = {
      spam: 'Spam',
      complaint: 'Khiếu nại',
      suspicious: 'Đáng ngờ',
      malware: 'Mã độc',
      test: 'Test',
      support: 'Hỗ trợ',
      internal: 'Nội bộ',
      announcement: 'Thông báo',
      maintenance: 'Bảo trì',
      marketing: 'Marketing'
    };
    return categories[category] || category;
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
              <span className="text-gray-300">Thùng rác</span>
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
            <svg className="w-8 h-8 mr-3 text-red-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd"/>
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
            </svg>
            Thùng rác
          </h1>
          <p className="mt-2 text-gray-600">Quản lý các thông báo đã bị xóa</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <Input
                type="text"
                placeholder="Tìm kiếm trong thùng rác..."
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
                <option value="all">Tất cả loại</option>
                <option value="spam">Spam</option>
                <option value="complaint">Khiếu nại</option>
                <option value="suspicious">Đáng ngờ</option>
                <option value="malware">Mã độc</option>
                <option value="test">Test</option>
              </select>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {selectedNotifications.length > 0 && (
                <span className="text-sm text-gray-600">
                  Đã chọn {selectedNotifications.length} thông báo
                </span>
              )}
            </div>
            
            <div className="flex items-center space-x-3">
              {selectedNotifications.length > 0 && (
                <>
                  <Button size="sm" onClick={handleRestore} className="bg-green-600 hover:bg-green-700">
                    Khôi phục
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleDeletePermanently} className="text-red-600 border-red-300 hover:bg-red-50">
                    Xóa vĩnh viễn
                  </Button>
                </>
              )}
              
              <Button 
                size="sm" 
                variant="outline" 
                onClick={handleEmptyTrash}
                className="text-red-600 border-red-300 hover:bg-red-50"
                disabled={filteredNotifications.length === 0}
              >
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd"/>
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                </svg>
                Dọn sạch thùng rác
              </Button>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-8">
              <div className="text-center">
                <svg className="animate-spin h-8 w-8 text-blue-600 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 3.5a6.5 6.5 0 106.5 6.5h-2a4.5 4.5 0 11-4.5-4.5V3.5z"/>
                </svg>
                <p className="text-gray-600">Đang tải thùng rác...</p>
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
                    <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd"/>
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Thùng rác trống
                  </h3>
                  <p className="text-gray-500 mb-4">
                    {searchTerm ? 'Không tìm thấy thông báo nào phù hợp với từ khóa tìm kiếm.' : 'Không có thông báo nào trong thùng rác.'}
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
                          notification.category === 'spam' ? 'bg-red-100 text-red-800' :
                          notification.category === 'complaint' ? 'bg-orange-100 text-orange-800' :
                          notification.category === 'suspicious' ? 'bg-yellow-100 text-yellow-800' :
                          notification.category === 'malware' ? 'bg-red-100 text-red-900' :
                          notification.category === 'test' ? 'bg-gray-100 text-gray-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {notification.from}
                        </span>

                        {/* Category Badge */}
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          notification.category === 'spam' ? 'bg-red-100 text-red-700' :
                          notification.category === 'complaint' ? 'bg-orange-100 text-orange-700' :
                          notification.category === 'suspicious' ? 'bg-yellow-100 text-yellow-700' :
                          notification.category === 'malware' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {getCategoryName(notification.category)}
                        </span>

                        {/* Priority */}
                        {notification.priority === 'high' && (
                          <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/>
                          </svg>
                        )}

                        {/* Deleted Badge */}
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-600">
                          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd"/>
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                          </svg>
                          Đã xóa
                        </span>
                      </div>

                      <div className="text-sm text-gray-500">
                        {notification.time}
                      </div>
                    </div>

                    <div className="mt-2">
                      <h3 className="text-lg font-medium text-gray-900 line-through">
                        {notification.subject}
                      </h3>
                      <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                        {notification.preview}
                      </p>
                    </div>

                    <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                      <div>
                        Xóa: {notification.deletedDate}
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
                          onClick={() => {
                            if (confirm('Bạn có chắc chắn muốn xóa vĩnh viễn thông báo này?')) {
                              alert('Thông báo đã được xóa vĩnh viễn!');
                            }
                          }}
                          className="text-red-600 border-red-300 hover:bg-red-50"
                        >
                          Xóa vĩnh viễn
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
