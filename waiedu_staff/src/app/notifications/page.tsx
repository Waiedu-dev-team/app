'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ExportModal from '@/components/ExportModal';
import type { ExportNotification } from '@/lib/exportUtils';

export default function NotificationsPage() {
  const router = useRouter();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedNotifications, setSelectedNotifications] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Items per page
  const [showExportModal, setShowExportModal] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      from: 'Khách hàng',
      fromEmail: 'customer@example.com',
      subject: 'Yêu cầu hỗ trợ khóa học AI',
      preview: 'Chào bạn, tôi đang gặp khó khăn trong việc truy cập vào khóa học AI cơ bản. Bạn có thể hỗ trợ tôi kiểm tra lại tài khoản không?',
      content: 'Chào bạn,\n\nTôi đang gặp khó khăn trong việc truy cập vào khóa học AI cơ bản. Mặc dù đã thanh toán từ tuần trước nhưng hệ thống vẫn hiển thị "Chưa có quyền truy cập".\n\nBạn có thể hỗ trợ tôi kiểm tra lại tài khoản không?\n\nCảm ơn bạn!',
      time: '2h',
      fullTime: '29/06/2025 14:30',
      isRead: false,
      priority: 'high',
      category: 'support'
    },
    {
      id: 2,
      from: 'HR',
      fromEmail: 'hr@waiedu.com',
      subject: 'Thông báo lịch training tháng 7',
      preview: 'Kính gửi toàn thể nhân viên, Phòng HR xin thông báo lịch training kỹ năng mềm trong tháng 7/2025...',
      content: 'Kính gửi toàn thể nhân viên,\n\nPhòng HR xin thông báo lịch training kỹ năng mềm trong tháng 7/2025:\n\n- Ngày 05/07: Communication Skills\n- Ngày 12/07: Time Management\n- Ngày 19/07: Leadership Basics\n- Ngày 26/07: Teamwork\n\nĐịa điểm: Phòng họp tầng 3\nThời gian: 9h00 - 17h00\n\nVui lòng xác nhận tham gia trước ngày 01/07.\n\nTrân trọng!',
      time: '5h',
      fullTime: '29/06/2025 11:30',
      isRead: false,
      priority: 'normal',
      category: 'internal'
    },
    {
      id: 3,
      from: 'Ban Giám đốc',
      fromEmail: 'ceo@waiedu.com',
      subject: 'Kế hoạch mở rộng thị trường Q3',
      preview: 'Các bạn thân mến, Sau khi đánh giá kết quả kinh doanh Q2, Ban Giám đốc quyết định triển khai kế hoạch mở rộng...',
      content: 'Các bạn thân mến,\n\nSau khi đánh giá kết quả kinh doanh Q2 vượt trội (tăng trưởng 150% so với cùng kỳ), Ban Giám đốc quyết định triển khai kế hoạch mở rộng thị trường trong Q3:\n\n1. Mở 2 chi nhánh mới tại Hà Nội và Đà Nẵng\n2. Tuyển dụng thêm 50 nhân viên\n3. Ra mắt 5 khóa học mới\n4. Đầu tư vào AI và automation\n\nChúng ta sẽ có cuộc họp chi tiết vào thứ 2 tuần sau.\n\nCảm ơn sự đóng góp của tất cả mọi người!',
      time: '1d',
      fullTime: '28/06/2025 09:15',
      isRead: true,
      priority: 'high',
      category: 'internal'
    },
    {
      id: 4,
      from: 'IT',
      fromEmail: 'it@waiedu.com',
      subject: 'Bảo trì server vào cuối tuần',
      preview: 'Thông báo bảo trì hệ thống: Phòng IT sẽ tiến hành bảo trì server chính vào cuối tuần này...',
      content: 'Thông báo bảo trì hệ thống:\n\nPhòng IT sẽ tiến hành bảo trì server chính vào cuối tuần này (01-02/07/2025) để nâng cấp hệ thống.\n\nThời gian dự kiến:\n- Bắt đầu: 01/07 22:00\n- Kết thúc: 02/07 06:00\n\nTrong thời gian này, các dịch vụ sau sẽ tạm ngừng:\n- Website chính\n- Hệ thống học online\n- Email nội bộ\n\nVui lòng lưu ý và sắp xếp công việc phù hợp.\n\nMọi thắc mắc liên hệ ext.123.',
      time: '2d',
      fullTime: '27/06/2025 16:45',
      isRead: true,
      priority: 'normal',
      category: 'internal'
    },
    {
      id: 5,
      from: 'Marketing',
      fromEmail: 'marketing@waiedu.com',
      subject: 'Kết quả campaign tháng 6',
      preview: 'Báo cáo kết quả campaign "Học AI - Đón tương lai" tháng 6/2025...',
      content: 'Báo cáo kết quả campaign "Học AI - Đón tương lai" tháng 6/2025:\n\n• Số liệu tổng quan:\n- Reach: 2.5M người\n- Click: 125K\n- Conversion: 3,250 đăng ký\n- ROI: 340%\n\n• Top performing channels:\n1. Facebook Ads: 45% conversion\n2. Google Ads: 35% conversion\n3. LinkedIn: 20% conversion\n\n• So với tháng 5:\n- Reach: +80%\n- Conversion: +120%\n- Cost per lead: -25%\n\nCảm ơn sự hỗ trợ của team Sales!\n\nBáo cáo chi tiết đính kèm.',
      time: '3d',
      fullTime: '26/06/2025 14:20',
      isRead: true,
      priority: 'normal',
      category: 'internal'
    },
    {
      id: 6,
      from: 'Khách hàng',
      fromEmail: 'student@gmail.com',
      subject: 'Phản hồi về khóa học Python',
      preview: 'Cảm ơn WaiEdu về khóa học Python tuyệt vời! Tôi đã học được rất nhiều...',
      content: 'Cảm ơn WaiEdu về khóa học Python tuyệt vời!\n\nTôi đã hoàn thành khóa học Python cơ bản và thực sự ấn tượng với:\n\n• Nội dung được cấu trúc logic\n• Bài tập thực hành phong phú\n• Giảng viên nhiệt tình hỗ trợ\n• Community học tập tích cực\n\nTôi đã có thể apply kiến thức vào dự án công việc ngay.\n\nHy vọng sẽ có thêm nhiều khóa học chất lượng!\n\nRating: 5/5 ★\n\nTrân trọng,\nNguyễn Văn B',
      time: '1w',
      fullTime: '22/06/2025 10:30',
      isRead: true,
      priority: 'normal',
      category: 'feedback'
    }
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulate loading notifications
  useEffect(() => {
    const loadNotifications = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // In real app, this would fetch from API
        // const response = await fetch('/api/notifications');
        // const data = await response.json();
        // setNotifications(data);
        
        setIsLoading(false);
      } catch (err) {
        setError('Không thể tải danh sách thông báo. Vui lòng thử lại.');
        setIsLoading(false);
      }
    };

    loadNotifications();
  }, []);

  // Mock user data
  const userInfo = {
    name: 'Nguyễn Văn A',
    id: 'WE2024001',
    department: 'Phòng Marketing'
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('vi-VN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleLogout = () => {
    console.log('Logging out...');
    router.push('/login');
  };
  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         notification.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         notification.preview.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'unread' && !notification.isRead) ||
                         (selectedFilter === 'read' && notification.isRead) ||
                         (selectedFilter === 'priority' && notification.priority === 'high') ||
                         notification.category === selectedFilter;

    return matchesSearch && matchesFilter;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredNotifications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedNotifications = filteredNotifications.slice(startIndex, endIndex);

  // Reset to page 1 when search or filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedFilter]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of notifications list
    document.getElementById('notifications-container')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectAll = () => {
    if (selectedNotifications.length === paginatedNotifications.length && paginatedNotifications.length > 0) {
      // Deselect all current page notifications
      setSelectedNotifications(prev => 
        prev.filter(id => !paginatedNotifications.some(n => n.id === id))
      );
    } else {
      // Select all current page notifications
      const currentPageIds = paginatedNotifications.map(n => n.id);
      setSelectedNotifications(prev => [
        ...prev.filter(id => !currentPageIds.includes(id)),
        ...currentPageIds
      ]);
    }
  };

  const handleSelectNotification = (id: number) => {
    setSelectedNotifications(prev => 
      prev.includes(id) 
        ? prev.filter(nId => nId !== id)
        : [...prev, id]
    );
  };

  const handleMarkAsRead = async () => {
    try {
      setIsActionLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setNotifications(prev => 
        prev.map(notification => 
          selectedNotifications.includes(notification.id)
            ? { ...notification, isRead: true }
            : notification
        )
      );
      setSelectedNotifications([]);
    } catch (err) {
      alert('Có lỗi xảy ra khi cập nhật trạng thái đọc.');
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleMarkAsUnread = async () => {
    try {
      setIsActionLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setNotifications(prev => 
        prev.map(notification => 
          selectedNotifications.includes(notification.id)
            ? { ...notification, isRead: false }
            : notification
        )
      );
      setSelectedNotifications([]);
    } catch (err) {
      alert('Có lỗi xảy ra khi cập nhật trạng thái chưa đọc.');
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleDeleteSelected = async () => {
    if (!confirm(`Bạn có chắc chắn muốn xóa ${selectedNotifications.length} thông báo đã chọn?`)) {
      return;
    }
    
    try {
      setIsActionLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setNotifications(prev => 
        prev.filter(notification => !selectedNotifications.includes(notification.id))
      );
      setSelectedNotifications([]);
    } catch (err) {
      alert('Có lỗi xảy ra khi xóa thông báo.');
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleNotificationClick = (id: number) => {
    // Mark as read when clicked
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true }
          : notification
      )
    );
    // Navigate to detail page
    router.push(`/notifications/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gray-800 shadow-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => router.push('/home')}
                className="text-gray-300 hover:text-white"
              >
                ← Về trang chủ
              </Button>
              <div>
                <h1 className="text-xl font-semibold text-white">
                  {userInfo.name}
                </h1>
                <p className="text-sm text-gray-300">
                  ID: {userInfo.id} • {userInfo.department}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="text-right">
                <div className="text-lg font-medium text-white">
                  {formatTime(currentTime)}
                </div>
                <div className="text-sm text-gray-300">
                  {formatDate(currentTime)}
                </div>
              </div>
              
              <Button 
                onClick={handleLogout}
                variant="outline" 
                size="sm"
                className="bg-red-600 border-red-600 text-white hover:bg-red-700 hover:border-red-700 hover:text-white"
              >
                Đăng xuất
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error State */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-red-800 font-medium">{error}</p>
                <Button 
                  onClick={() => window.location.reload()} 
                  variant="outline" 
                  size="sm" 
                  className="mt-2 text-red-700 border-red-300 hover:bg-red-50"
                >
                  Thử lại
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading ? (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                  <div className="w-8 h-8 bg-white/30 rounded animate-pulse"></div>
                </div>
                <div>
                  <div className="h-6 bg-white/30 rounded w-32 mb-2 animate-pulse"></div>
                  <div className="h-4 bg-white/20 rounded w-48 animate-pulse"></div>
                </div>
              </div>
            </div>
            
            <div className="px-6 py-8">
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <svg className="animate-spin h-8 w-8 text-blue-600 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 3.5a6.5 6.5 0 106.5 6.5h-2a4.5 4.5 0 11-4.5-4.5V3.5z"/>
                  </svg>
                  <p className="text-gray-600">Đang tải danh sách thông báo...</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Page Header với gradient */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <title>Thông báo</title>
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/>
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Thông báo</h1>
                <p className="text-blue-100 mt-1">
                  Quản lý {notifications.length} thông báo • {notifications.filter(n => !n.isRead).length} chưa đọc
                </p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="px-6 py-6 bg-gray-50 border-b">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                <div className="text-2xl font-bold text-gray-900">{notifications.length}</div>
                <div className="text-sm text-gray-600">Tổng số</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                <div className="text-2xl font-bold text-blue-600">{notifications.filter(n => !n.isRead).length}</div>
                <div className="text-sm text-gray-600">Chưa đọc</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                <div className="text-2xl font-bold text-red-600">{notifications.filter(n => n.priority === 'high').length}</div>
                <div className="text-sm text-gray-600">Ưu tiên cao</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                <div className="text-2xl font-bold text-green-600">{notifications.filter(n => n.category === 'support').length}</div>
                <div className="text-sm text-gray-600">Hỗ trợ KH</div>
              </div>
            </div>
          </div>

          {/* Enhanced Filters and Search */}
          <div className="px-6 py-6 bg-white border-b">
            <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
              {/* Search với icon đẹp hơn */}
              <div className="relative flex-1 max-w-lg">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
                  </svg>
                </div>
                <Input
                  placeholder="Tìm kiếm theo tiêu đề, người gửi hoặc nội dung..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <svg className="h-4 w-4 text-gray-400 hover:text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Enhanced Filter Buttons */}
              <div className="flex gap-2 flex-wrap">
                {[
                  { key: 'all', label: 'Tất cả', count: notifications.length, icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/><path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a1 1 0 001 1h6a1 1 0 001-1V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/></svg>, color: 'blue' },
                  { key: 'unread', label: 'Chưa đọc', count: notifications.filter(n => !n.isRead).length, icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/></svg>, color: 'blue' },
                  { key: 'priority', label: 'Ưu tiên', count: notifications.filter(n => n.priority === 'high').length, icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/></svg>, color: 'red' },
                  { key: 'support', label: 'Hỗ trợ', count: notifications.filter(n => n.category === 'support').length, icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z" clipRule="evenodd"/></svg>, color: 'green' },
                  { key: 'internal', label: 'Nội bộ', count: notifications.filter(n => n.category === 'internal').length, icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm3 2h6v4H7V6z" clipRule="evenodd"/></svg>, color: 'purple' },
                  { key: 'feedback', label: 'Phản hồi', count: notifications.filter(n => n.category === 'feedback').length, icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd"/></svg>, color: 'orange' }
                ].map(filter => (
                  <Button
                    key={filter.key}
                    variant={selectedFilter === filter.key ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedFilter(filter.key)}
                    className={`h-10 px-4 transition-all duration-200 ${
                      selectedFilter === filter.key 
                        ? filter.color === 'blue' ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg' :
                          filter.color === 'red' ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg' :
                          filter.color === 'green' ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg' :
                          filter.color === 'purple' ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg' :
                          filter.color === 'orange' ? 'bg-orange-600 hover:bg-orange-700 text-white shadow-lg' :
                          'bg-blue-600 hover:bg-blue-700 text-white shadow-lg'
                        : filter.color === 'blue' ? 'hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700' :
                          filter.color === 'red' ? 'hover:bg-red-50 hover:border-red-300 hover:text-red-700' :
                          filter.color === 'green' ? 'hover:bg-green-50 hover:border-green-300 hover:text-green-700' :
                          filter.color === 'purple' ? 'hover:bg-purple-50 hover:border-purple-300 hover:text-purple-700' :
                          filter.color === 'orange' ? 'hover:bg-orange-50 hover:border-orange-300 hover:text-orange-700' :
                          'hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700'
                    }`}
                  >
                    <span className="mr-2">{filter.icon}</span>
                    {filter.label} ({filter.count})
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedNotifications.length > 0 && (
            <div className="border-b border-gray-200 px-6 py-3 bg-blue-50">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">
                  Đã chọn {selectedNotifications.length} thông báo
                </span>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={handleMarkAsRead}
                    disabled={isActionLoading}
                    className="border-green-300 text-green-700 hover:bg-green-50 hover:text-green-800 disabled:opacity-50"
                  >
                    {isActionLoading ? (
                      <svg className="w-4 h-4 mr-1 animate-spin" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 3.5a6.5 6.5 0 106.5 6.5h-2a4.5 4.5 0 11-4.5-4.5V3.5z"/>
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                    Đánh dấu đã đọc
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={handleMarkAsUnread}
                    disabled={isActionLoading}
                    className="border-orange-300 text-orange-700 hover:bg-orange-50 hover:text-orange-800 disabled:opacity-50"
                  >
                    {isActionLoading ? (
                      <svg className="w-4 h-4 mr-1 animate-spin" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 3.5a6.5 6.5 0 106.5 6.5h-2a4.5 4.5 0 11-4.5-4.5V3.5z"/>
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                      </svg>
                    )}
                    Đánh dấu chưa đọc
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={handleDeleteSelected}
                    disabled={isActionLoading}
                    className="border-red-300 text-red-700 hover:bg-red-50 hover:text-red-800 disabled:opacity-50"
                  >
                    {isActionLoading ? (
                      <svg className="w-4 h-4 mr-1 animate-spin" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 3.5a6.5 6.5 0 106.5 6.5h-2a4.5 4.5 0 11-4.5-4.5V3.5z"/>
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd" />
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    )}
                    Xóa
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Notifications List */}
          <div id="notifications-container" className="divide-y divide-gray-200">
            {/* Select All Header */}
            <div className="px-6 py-3 bg-gray-50 border-b">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedNotifications.length === paginatedNotifications.length && paginatedNotifications.length > 0}
                  onChange={handleSelectAll}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-3 text-sm text-gray-700">Chọn tất cả</span>
              </label>
            </div>

            {paginatedNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`px-6 py-4 hover:bg-gray-50 transition-colors ${
                  !notification.isRead ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-start space-x-4">
                  {/* Checkbox */}
                  <div onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={selectedNotifications.includes(notification.id)}
                      onChange={() => handleSelectNotification(notification.id)}
                      className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </div>

                  {/* Notification Content - Clickable */}
                  <div 
                    className="flex-1 min-w-0 cursor-pointer"
                    onClick={() => handleNotificationClick(notification.id)}
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      {/* Source Badge */}
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        notification.from === 'Khách hàng' ? 'bg-green-100 text-green-800' :
                        notification.from === 'HR' ? 'bg-orange-100 text-orange-800' :
                        notification.from === 'Ban Giám đốc' ? 'bg-purple-100 text-purple-800' :
                        notification.from === 'IT' ? 'bg-gray-100 text-gray-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {notification.from}
                      </span>

                      {/* Priority */}
                      {notification.priority === 'high' && (
                        <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                          <title>Ưu tiên cao</title>
                          <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/>
                        </svg>
                      )}

                      {/* Read Status */}
                      {!notification.isRead && (
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      )}

                      {/* Time */}
                      <span className="text-sm text-gray-500">
                        {notification.time}
                      </span>
                    </div>

                    {/* Subject */}
                    <h3 className={`text-lg mb-1 ${
                      !notification.isRead ? 'font-semibold text-gray-900' : 'font-medium text-gray-700'
                    }`}>
                      {notification.subject}
                    </h3>

                    {/* Preview */}
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {notification.preview}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-700">
                    Hiển thị {startIndex + 1}-{Math.min(endIndex, filteredNotifications.length)} trong tổng số {filteredNotifications.length} thông báo
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {/* Previous button */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-3 py-1"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Trước
                    </Button>

                    {/* Page numbers */}
                    <div className="flex items-center space-x-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                        // Show current page, first page, last page, and pages around current
                        const shouldShow = 
                          page === 1 || 
                          page === totalPages || 
                          Math.abs(page - currentPage) <= 1;
                          
                        if (!shouldShow) {
                          // Show ellipsis for gaps
                          if (page === 2 && currentPage > 4) {
                            return <span key={page} className="px-2 text-gray-400">...</span>;
                          }
                          if (page === totalPages - 1 && currentPage < totalPages - 3) {
                            return <span key={page} className="px-2 text-gray-400">...</span>;
                          }
                          return null;
                        }

                        return (
                          <Button
                            key={page}
                            variant={page === currentPage ? "default" : "outline"}
                            size="sm"
                            onClick={() => handlePageChange(page)}
                            className={`w-8 h-8 p-0 ${page === currentPage ? 'bg-blue-600 text-white' : ''}`}
                          >
                            {page}
                          </Button>
                        );
                      })}
                    </div>

                    {/* Next button */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1"
                    >
                      Sau
                      <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Empty State */}
            {filteredNotifications.length === 0 && (
              <div className="text-center py-16">
                <div className="mb-6">
                  <svg className="w-24 h-24 text-gray-300 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-3">
                  {searchQuery ? 'Không tìm thấy thông báo' : 'Chưa có thông báo mới'}
                </h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                  {searchQuery ? 
                    `Không có thông báo nào phù hợp với từ khóa "${searchQuery}". Hãy thử tìm kiếm với từ khóa khác hoặc kiểm tra lại bộ lọc.` : 
                    'Hiện tại bạn chưa có thông báo mới nào. Khi có thông báo mới, chúng sẽ xuất hiện ở đây.'
                  }
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  {searchQuery && (
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedFilter('all');
                      }}
                      className="flex items-center space-x-2"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
                      </svg>
                      <span>Xóa bộ lọc</span>
                    </Button>
                  )}
                  
                  <Button 
                    onClick={() => router.push('/notifications/compose')}
                    className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd"/>
                    </svg>
                    <span>Soạn thông báo mới</span>
                  </Button>
                  
                  <Button 
                    variant="outline"
                    onClick={() => router.push('/home')}
                    className="flex items-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
                    </svg>
                    <span>Về trang chủ</span>
                  </Button>
                </div>
                
                {/* Additional tips */}
                <div className="mt-8 bg-blue-50 rounded-lg p-4 max-w-md mx-auto">
                  <h4 className="text-sm font-medium text-blue-800 mb-2">💡 Mẹo hữu ích:</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Kiểm tra các tab "Đã lưu trữ" và "Thùng rác"</li>
                    <li>• Sử dụng bộ lọc theo danh mục để tìm nhanh hơn</li>
                    <li>• Cài đặt thông báo để không bỏ lỡ tin mới</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
        )}
      </main>
    </div>
  );
}
