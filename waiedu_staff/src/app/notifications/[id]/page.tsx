'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';

interface Notification {
  id: number;
  from: string;
  fromEmail: string;
  subject: string;
  preview: string;
  content: string;
  time: string;
  fullTime: string;
  isRead: boolean;
  priority: 'high' | 'normal';
  category: string;
}

export default function NotificationDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [notification, setNotification] = useState<Notification | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal states
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [showImportantModal, setShowImportantModal] = useState(false);

  // Task form data
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    priority: 'normal' as 'high' | 'normal' | 'low',
    dueDate: '',
    assignedTo: '',
    tags: [] as string[],
    notes: ''
  });

  // Calendar form data
  const [calendarData, setCalendarData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    duration: '60',
    location: '',
    attendees: [] as string[],
    reminder: '15',
    recurrence: 'none' as 'none' | 'daily' | 'weekly' | 'monthly'
  });

  // Important note data
  const [importantNote, setImportantNote] = useState({
    reason: '',
    tags: [] as string[],
    reminder: false,
    reminderDate: '',
    notes: ''
  });

  // Mock data - same as notifications page
  const mockNotifications: Notification[] = [
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
      category: 'announcement'
    },
    {
      id: 4,
      from: 'IT',
      fromEmail: 'it@waiedu.com',
      subject: 'Bảo trì hệ thống cuối tuần',
      preview: 'Thông báo: Hệ thống sẽ được bảo trì vào cuối tuần này (30/06 - 01/07). Dự kiến downtime 4 giờ...',
      content: 'Thông báo: Hệ thống sẽ được bảo trì vào cuối tuần này (30/06 - 01/07).\n\nThời gian bảo trì:\n- Bắt đầu: 30/06/2025 22:00\n- Kết thúc: 01/07/2025 02:00\n- Dự kiến downtime: 4 giờ\n\nCác hệ thống bị ảnh hưởng:\n- Website chính\n- Hệ thống LMS\n- Email server\n- Database backup\n\nVui lòng lưu lại công việc và đăng xuất trước 22:00 ngày 30/06.\n\nCảm ơn sự hợp tác!',
      time: '6h',
      fullTime: '29/06/2025 10:15',
      isRead: true,
      priority: 'normal',
      category: 'maintenance'
    },
    {
      id: 5,
      from: 'Marketing',
      fromEmail: 'marketing@waiedu.com',
      subject: 'Campaign Summer Sale 2025',
      preview: 'Team Marketing xin thông báo kế hoạch campaign Summer Sale 2025 sẽ được triển khai từ ngày 15/07...',
      content: 'Team Marketing xin thông báo kế hoạch campaign Summer Sale 2025:\n\nThời gian: 15/07 - 31/08/2025\n\nƯu đãi:\n- Giảm 30% toàn bộ khóa học\n- Tặng 1 tháng Premium membership\n- Quà tặng cho 100 khách hàng đầu tiên\n\nKênh triển khai:\n- Facebook Ads\n- Google Ads\n- Email Marketing\n- TikTok\n- Landing page riêng\n\nTarget: 500 học viên mới\nBudget: 200 triệu VND\n\nPhân công nhiệm vụ sẽ được gửi riêng cho từng bộ phận.',
      time: '1d',
      fullTime: '28/06/2025 16:45',
      isRead: false,
      priority: 'normal',
      category: 'marketing'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Load notification detail
  useEffect(() => {
    const loadNotification = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const notificationId = parseInt(params.id as string);
        const foundNotification = mockNotifications.find(n => n.id === notificationId);
        
        if (!foundNotification) {
          setError('Không tìm thấy thông báo này.');
          return;
        }
        
        setNotification(foundNotification);
      } catch (err) {
        setError('Có lỗi xảy ra khi tải thông báo. Vui lòng thử lại.');
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      loadNotification();
    }
  }, [params.id]);

  const handleLogout = () => {
    router.push('/login');
  };

  const handleGoBack = () => {
    router.back();
  };

  const handleReply = () => {
    // Navigate to compose page with reply context
    const replyData = {
      type: 'reply',
      originalId: notification?.id,
      to: notification?.fromEmail,
      subject: `Re: ${notification?.subject}`,
      originalContent: notification?.content
    };
    
    // Store reply data in localStorage for compose page to use
    localStorage.setItem('composeData', JSON.stringify(replyData));
    router.push('/notifications/compose');
  };

  const handleForward = () => {
    // Navigate to compose page with forward context
    const forwardData = {
      type: 'forward',
      originalId: notification?.id,
      subject: `Fwd: ${notification?.subject}`,
      originalContent: notification?.content,
      originalFrom: notification?.from,
      originalDate: notification?.fullTime
    };
    
    // Store forward data in localStorage for compose page to use
    localStorage.setItem('composeData', JSON.stringify(forwardData));
    router.push('/notifications/compose');
  };

  const handleDelete = () => {
    if (confirm('Bạn có chắc chắn muốn xóa thông báo này?')) {
      // In real app, this would call API to delete
      alert('Thông báo đã được xóa thành công!');
      router.push('/notifications');
    }
  };

  const handleArchive = () => {
    if (confirm('Bạn có muốn lưu trữ thông báo này?')) {
      // In real app, this would move notification to archived folder
      alert('Thông báo đã được lưu trữ!');
      router.push('/notifications');
    }
  };

  const handlePrint = () => {
    // Print functionality
    window.print();
  };

  const handleCreateTask = () => {
    // Initialize task data from notification
    setTaskData({
      title: notification?.subject || '',
      description: notification?.content || '',
      priority: notification?.priority === 'high' ? 'high' : 'normal',
      dueDate: '',
      assignedTo: '',
      tags: [notification?.category || ''],
      notes: `Tạo từ thông báo #${notification?.id}`
    });
    setShowTaskModal(true);
  };

  const handleAddToCalendar = () => {
    // Initialize calendar data from notification
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    setCalendarData({
      title: notification?.subject || '',
      description: notification?.content || '',
      date: tomorrow.toISOString().split('T')[0],
      time: '09:00',
      duration: '60',
      location: '',
      attendees: [notification?.fromEmail || ''],
      reminder: '15',
      recurrence: 'none'
    });
    setShowCalendarModal(true);
  };

  const handleMarkImportant = () => {
    if (notification?.priority === 'high') {
      // Already important, show options to unmark or add note
      setImportantNote({
        reason: 'Bỏ đánh dấu quan trọng',
        tags: [],
        reminder: false,
        reminderDate: '',
        notes: ''
      });
    } else {
      // Not important, show options to mark as important
      setImportantNote({
        reason: '',
        tags: ['quan-trong'],
        reminder: false,
        reminderDate: '',
        notes: ''
      });
    }
    setShowImportantModal(true);
  };

  // Submit handlers
  const handleTaskSubmit = () => {
    // In real app, this would call API
    console.log('Creating task:', taskData);
    alert(`Đã tạo nhiệm vụ "${taskData.title}" thành công!`);
    setShowTaskModal(false);
    // Reset form
    setTaskData({
      title: '',
      description: '',
      priority: 'normal',
      dueDate: '',
      assignedTo: '',
      tags: [],
      notes: ''
    });
  };

  const handleCalendarSubmit = () => {
    // In real app, this would call calendar API
    console.log('Adding to calendar:', calendarData);
    alert(`Đã thêm "${calendarData.title}" vào lịch ngày ${calendarData.date} lúc ${calendarData.time}!`);
    setShowCalendarModal(false);
    // Reset form
    setCalendarData({
      title: '',
      description: '',
      date: '',
      time: '',
      duration: '60',
      location: '',
      attendees: [],
      reminder: '15',
      recurrence: 'none'
    });
  };

  const handleImportantSubmit = () => {
    // In real app, this would update notification in database
    if (notification) {
      const isCurrentlyImportant = notification.priority === 'high';
      const newPriority = isCurrentlyImportant ? 'normal' : 'high';
      
      console.log('Updating importance:', {
        notificationId: notification.id,
        newPriority,
        note: importantNote
      });
      
      // Update local state
      setNotification((prev: Notification | null) => prev ? {
        ...prev,
        priority: newPriority
      } : null);
      
      alert(`Thông báo đã được ${isCurrentlyImportant ? 'bỏ đánh dấu' : 'đánh dấu'} quan trọng!`);
    }
    
    setShowImportantModal(false);
    // Reset form
    setImportantNote({
      reason: '',
      tags: [],
      reminder: false,
      reminderDate: '',
      notes: ''
    });
  };

  if (!notification) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <span className="text-6xl mb-4 block">📭</span>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Không tìm thấy thông báo
            </h3>
            <p className="text-gray-500 mb-4">
              Thông báo này có thể đã bị xóa hoặc không tồn tại
            </p>
            <Button onClick={() => router.push('/notifications')}>
              Quay lại danh sách
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gray-900 text-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left side */}
            <div className="flex items-center space-x-4">
              <span className="text-lg font-semibold">WaiEdu Staff</span>
              <span className="text-gray-300">|</span>
              <span className="text-gray-300">Chi tiết thông báo</span>
            </div>
            
            {/* Right side */}
            <div className="flex items-center space-x-6">
              {/* User info */}
              <div className="text-sm">
                <div className="text-gray-300">Nguyen Van A (NV001)</div>
                <div className="text-gray-400">Phòng IT</div>
              </div>
              
              {/* Current time */}
              <div className="text-sm text-gray-300">
                {currentTime.toLocaleString('vi-VN')}
              </div>
              
              {/* Logout button */}
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
      <div className="bg-blue-900 text-white py-2 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap inline-flex">
          <span className="mx-8 inline-flex items-center">
            <svg className="w-4 h-4 mr-2 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 1.414L10.586 9.5 9.293 10.793a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd"/>
            </svg>
            Chúc mừng WaiEdu đạt 10,000 học viên! Cảm ơn sự đóng góp của tất cả nhân viên!
          </span>
          <span className="mx-8 inline-flex items-center">
            <svg className="w-4 h-4 mr-2 text-blue-300" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
            </svg>
            Khóa học mới "Python for AI" sẽ ra mắt vào tuần tới
          </span>
          <span className="mx-8 inline-flex items-center">
            <svg className="w-4 h-4 mr-2 text-green-300" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
            </svg>
            Mục tiêu Q3: Tăng trưởng 200% - Cùng nhau phấn đấu!
          </span>
          <span className="mx-8 inline-flex items-center">
            <svg className="w-4 h-4 mr-2 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 1.414L10.586 9.5 9.293 10.793a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd"/>
            </svg>
            Chúc mừng WaiEdu đạt 10,000 học viên! Cảm ơn sự đóng góp của tất cả nhân viên!
          </span>
          <span className="mx-8 inline-flex items-center">
            <svg className="w-4 h-4 mr-2 text-blue-300" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
            </svg>
            Khóa học mới "Python for AI" sẽ ra mắt vào tuần tới
          </span>
          <span className="mx-8 inline-flex items-center">
            <svg className="w-4 h-4 mr-2 text-green-300" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
            </svg>
            Mục tiêu Q3: Tăng trưởng 200% - Cùng nhau phấn đấu!
          </span>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button variant="outline" onClick={handleGoBack} className="flex items-center space-x-2">
            <span>←</span>
            <span>Quay lại</span>
          </Button>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-center">
              <svg className="w-6 h-6 text-red-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-red-800 font-medium">{error}</p>
                <div className="mt-3 flex space-x-3">
                  <Button 
                    onClick={() => window.location.reload()} 
                    variant="outline" 
                    size="sm" 
                    className="text-red-700 border-red-300 hover:bg-red-50"
                  >
                    Thử lại
                  </Button>
                  <Button 
                    onClick={handleGoBack} 
                    variant="outline" 
                    size="sm"
                    className="text-gray-700 border-gray-300 hover:bg-gray-50"
                  >
                    Quay lại danh sách
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && !error && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-8">
              <div className="text-center">
                <svg className="animate-spin h-8 w-8 text-blue-600 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 3.5a6.5 6.5 0 106.5 6.5h-2a4.5 4.5 0 11-4.5-4.5V3.5z"/>
                </svg>
                <p className="text-gray-600">Đang tải chi tiết thông báo...</p>
              </div>
            </div>
          </div>
        )}

        {/* Notification Detail */}
        {!isLoading && !error && notification && (
        <>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {/* Source Badge */}
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  notification.from === 'Khách hàng' ? 'bg-green-100 text-green-800' :
                  notification.from === 'HR' ? 'bg-orange-100 text-orange-800' :
                  notification.from === 'Ban Giám đốc' ? 'bg-purple-100 text-purple-800' :
                  notification.from === 'IT' ? 'bg-gray-100 text-gray-800' :
                  notification.from === 'Marketing' ? 'bg-pink-100 text-pink-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {notification.from}
                </span>

                {/* Priority */}
                {notification.priority === 'high' && (
                  <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <title>Ưu tiên cao</title>
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/>
                  </svg>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="outline" onClick={handleReply} className="hover:bg-blue-50 hover:text-blue-700">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414L2.586 8.707a1 1 0 010-1.414L6.293 3.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Trả lời
                </Button>
                <Button size="sm" variant="outline" onClick={handleForward} className="hover:bg-green-50 hover:text-green-700">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.293 3.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 9H9a5 5 0 00-5 5v2a1 1 0 11-2 0v-2a7 7 0 017-7h5.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Chuyển tiếp
                </Button>
                <Button size="sm" variant="outline" onClick={handleMarkImportant} className={`hover:bg-yellow-50 hover:text-yellow-700 ${notification?.priority === 'high' ? 'bg-yellow-50 text-yellow-700' : ''}`}>
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {notification?.priority === 'high' ? 'Bỏ quan trọng' : 'Quan trọng'}
                </Button>
                <Button size="sm" variant="outline" onClick={handleArchive} className="hover:bg-purple-50 hover:text-purple-700">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                    <path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                  Lưu trữ
                </Button>
                <Button size="sm" variant="outline" onClick={handlePrint} className="hover:bg-gray-50 hover:text-gray-700">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zM5 14v2h6v-2H5z" clipRule="evenodd" />
                  </svg>
                  In
                </Button>
                <Button size="sm" variant="outline" onClick={handleDelete} className="text-red-600 hover:bg-red-50 hover:text-red-700">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  Xóa
                </Button>
              </div>
            </div>
          </div>

          {/* Subject and Meta */}
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h1 className="text-2xl font-bold text-gray-900 mb-3">
              {notification.subject}
            </h1>
            
            <div className="flex items-center text-sm text-gray-600 space-x-4">
              <div>
                <span className="font-medium">Từ:</span> {notification.from} ({notification.fromEmail})
              </div>
              <div>
                <span className="font-medium">Thời gian:</span> {notification.fullTime}
              </div>
              <div>
                <span className="font-medium">Trạng thái:</span> 
                <span className={`ml-1 ${notification.isRead ? 'text-gray-600' : 'text-blue-600 font-medium'}`}>
                  {notification.isRead ? 'Đã đọc' : 'Chưa đọc'}
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-6">
            <div className="prose max-w-none">
              {notification.content.split('\n').map((line: string, index: number) => (
                <p key={index} className={`${line.trim() === '' ? 'mb-4' : 'mb-2'} text-gray-700 leading-relaxed`}>
                  {line || '\u00A0'}
                </p>
              ))}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Thông báo #{notification.id} • Danh mục: {notification.category}
              </div>
              
              <div className="flex items-center space-x-2">
                <Button size="sm" onClick={handleReply} className="bg-blue-600 hover:bg-blue-700">
                  Trả lời
                </Button>
                <Button size="sm" variant="outline" onClick={handleForward}>
                  Chuyển tiếp
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Actions */}
        <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Thao tác liên quan</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" onClick={handleCreateTask} className="flex items-center space-x-2 hover:bg-blue-50 hover:text-blue-700">
              <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
              <span>Tạo nhiệm vụ</span>
            </Button>
            
            <Button variant="outline" onClick={handleAddToCalendar} className="flex items-center space-x-2 hover:bg-green-50 hover:text-green-700">
              <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              <span>Thêm vào lịch</span>
            </Button>
            
            <Button variant="outline" onClick={handleMarkImportant} className={`flex items-center space-x-2 hover:bg-yellow-50 hover:text-yellow-700 ${notification?.priority === 'high' ? 'bg-yellow-50 text-yellow-700' : ''}`}>
              <svg className="w-4 h-4 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>{notification?.priority === 'high' ? 'Bỏ đánh dấu' : 'Đánh dấu quan trọng'}</span>
            </Button>
          </div>
        </div>
        </>
        )}
      </main>

      {/* Task Creation Modal */}
      {showTaskModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm animate-modalBackdrop">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100 animate-modalScale hover-lift">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
              <h3 className="text-xl font-bold text-gray-900 flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3 hover-lift">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
                  </svg>
                </div>
                Tạo nhiệm vụ mới
              </h3>
              <button 
                onClick={() => setShowTaskModal(false)}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2 transition-all-smooth hover-lift"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
                </svg>
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 animate-fadeIn">
                <div className="flex items-start space-x-2">
                  <svg className="w-5 h-5 text-blue-600 mt-0.5 animate-pulse-important" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                  </svg>
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-1">Dựa trên thông báo:</p>
                    <p className="italic">"{notification?.subject}"</p>
                  </div>
                </div>
              </div>

              <div className="animate-fadeIn" style={{animationDelay: '0.1s'}}>
                <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <svg className="w-4 h-4 mr-2 text-gray-500 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  Tiêu đề nhiệm vụ *
                </label>
                <input
                  type="text"
                  value={taskData.title}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTaskData({...taskData, title: e.target.value})}
                  placeholder="Nhập tiêu đề nhiệm vụ..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all-smooth hover:border-blue-400"
                />
              </div>
              
              <div className="animate-fadeIn" style={{animationDelay: '0.2s'}}>
                <label className="block text-sm font-semibold text-gray-700 mb-2 items-center">
                  <svg className="w-4 h-4 mr-2 text-gray-500 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd"/>
                  </svg>
                  Mô tả
                </label>
                <textarea
                  value={taskData.description}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setTaskData({...taskData, description: e.target.value})}
                  placeholder="Mô tả chi tiết nhiệm vụ..."
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all-smooth resize-none hover:border-blue-400"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn" style={{animationDelay: '0.3s'}}>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 items-center">
                    <svg className="w-4 h-4 mr-2 text-gray-500 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/>
                    </svg>
                    Độ ưu tiên
                  </label>
                  <select
                    value={taskData.priority}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setTaskData({...taskData, priority: e.target.value as 'high' | 'normal' | 'low'})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all-smooth hover:border-blue-400"
                  >
                    <option value="low">🟢 Thấp</option>
                    <option value="normal">🟡 Bình thường</option>
                    <option value="high">🔴 Cao</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 items-center">
                    <svg className="w-4 h-4 mr-2 text-gray-500 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                    </svg>
                    Hạn hoàn thành
                  </label>
                  <input
                    type="date"
                    value={taskData.dueDate}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTaskData({...taskData, dueDate: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all-smooth hover:border-blue-400"
                  />
                </div>
              </div>
              
              <div className="animate-fadeIn" style={{animationDelay: '0.4s'}}>
                <label className="block text-sm font-semibold text-gray-700 mb-2 items-center">
                  <svg className="w-4 h-4 mr-2 text-gray-500 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                  </svg>
                  Giao cho
                </label>
                <input
                  type="text"
                  value={taskData.assignedTo}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTaskData({...taskData, assignedTo: e.target.value})}
                  placeholder="Email hoặc tên người được giao nhiệm vụ..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all-smooth hover:border-blue-400"
                />
              </div>
              
              <div className="animate-fadeIn" style={{animationDelay: '0.5s'}}>
                <label className="block text-sm font-semibold text-gray-700 mb-2 items-center">
                  <svg className="w-4 h-4 mr-2 text-gray-500 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"/>
                  </svg>
                  Ghi chú
                </label>
                <textarea
                  value={taskData.notes}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setTaskData({...taskData, notes: e.target.value})}
                  placeholder="Ghi chú thêm..."
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all-smooth resize-none hover:border-blue-400"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
              <Button 
                variant="outline" 
                onClick={() => setShowTaskModal(false)}
                className="px-6 py-2 hover:bg-gray-100 transition-all-smooth hover-lift"
              >
                Hủy
              </Button>
              <Button 
                onClick={handleTaskSubmit} 
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg transition-all-smooth hover-lift"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd"/>
                </svg>
                Tạo nhiệm vụ
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Calendar Modal */}
      {showCalendarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm animate-modalBackdrop">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100 animate-modalScale hover-lift">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-green-50 to-emerald-50">
              <h3 className="text-xl font-bold text-gray-900 flex items-center">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3 hover-lift">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                  </svg>
                </div>
                Thêm vào lịch
              </h3>
              <button 
                onClick={() => setShowCalendarModal(false)}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2 transition-all-smooth hover-lift"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
                </svg>
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 animate-fadeIn">
                <div className="flex items-start space-x-2">
                  <svg className="w-5 h-5 text-green-600 mt-0.5 animate-pulse-important" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                  </svg>
                  <div className="text-sm text-green-800">
                    <p className="font-medium mb-1">Tạo sự kiện từ thông báo:</p>
                    <p className="italic">"{notification?.subject}"</p>
                  </div>
                </div>
              </div>

              <div className="animate-fadeIn" style={{animationDelay: '0.1s'}}>
                <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <svg className="w-4 h-4 mr-2 text-gray-500 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  Tiêu đề sự kiện *
                </label>
                <input
                  type="text"
                  value={calendarData.title}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCalendarData({...calendarData, title: e.target.value})}
                  placeholder="Nhập tiêu đề sự kiện..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all-smooth hover:border-green-400"
                />
              </div>
              
              <div className="animate-fadeIn" style={{animationDelay: '0.2s'}}>
                <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <svg className="w-4 h-4 mr-2 text-gray-500 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd"/>
                  </svg>
                  Mô tả
                </label>
                <textarea
                  value={calendarData.description}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setCalendarData({...calendarData, description: e.target.value})}
                  placeholder="Mô tả chi tiết sự kiện..."
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all-smooth resize-none hover:border-green-400"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn" style={{animationDelay: '0.3s'}}>
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <svg className="w-4 h-4 mr-2 text-gray-500 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                    </svg>
                    Ngày
                  </label>
                  <input
                    type="date"
                    value={calendarData.date}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCalendarData({...calendarData, date: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all-smooth hover:border-green-400"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 items-center">
                    <svg className="w-4 h-4 mr-2 text-gray-500 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                    </svg>
                    Giờ
                  </label>
                  <input
                    type="time"
                    value={calendarData.time}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCalendarData({...calendarData, time: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all-smooth hover:border-green-400"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn" style={{animationDelay: '0.4s'}}>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 items-center">
                    <svg className="w-4 h-4 mr-2 text-gray-500 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
                    </svg>
                    Thời lượng
                  </label>
                  <select
                    value={calendarData.duration}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCalendarData({...calendarData, duration: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all-smooth hover:border-green-400"
                  >
                    <option value="15">⏱️ 15 phút</option>
                    <option value="30">⏱️ 30 phút</option>
                    <option value="60">⏱️ 1 giờ</option>
                    <option value="120">⏱️ 2 giờ</option>
                    <option value="240">⏱️ 4 giờ</option>
                    <option value="480">📅 Cả ngày</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 items-center">
                    <svg className="w-4 h-4 mr-2 text-gray-500 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2L3 7v11a2 2 0 002 2h4v-6h2v6h4a2 2 0 002-2V7l-7-5z"/>
                    </svg>
                    Nhắc nhở trước
                  </label>
                  <select
                    value={calendarData.reminder}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCalendarData({...calendarData, reminder: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all-smooth hover:border-green-400"
                  >
                    <option value="0">🔕 Không nhắc</option>
                    <option value="5">🔔 5 phút trước</option>
                    <option value="15">🔔 15 phút trước</option>
                    <option value="30">🔔 30 phút trước</option>
                    <option value="60">🔔 1 giờ trước</option>
                    <option value="1440">🔔 1 ngày trước</option>
                  </select>
                </div>
              </div>
              
              <div className="animate-fadeIn" style={{animationDelay: '0.5s'}}>
                <label className="block text-sm font-semibold text-gray-700 mb-2 items-center">
                  <svg className="w-4 h-4 mr-2 text-gray-500 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                  </svg>
                  Địa điểm
                </label>
                <input
                  type="text"
                  value={calendarData.location}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCalendarData({...calendarData, location: e.target.value})}
                  placeholder="Nhập địa điểm tổ chức..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all-smooth hover:border-green-400"
                />
              </div>
              
              <div className="animate-fadeIn" style={{animationDelay: '0.6s'}}>
                <label className="block text-sm font-semibold text-gray-700 mb-2 items-center">
                  <svg className="w-4 h-4 mr-2 text-gray-500 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd"/>
                  </svg>
                  Lặp lại
                </label>
                <select
                  value={calendarData.recurrence}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCalendarData({...calendarData, recurrence: e.target.value as 'none' | 'daily' | 'weekly' | 'monthly'})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all-smooth hover:border-green-400"
                >
                  <option value="none">🚫 Không lặp</option>
                  <option value="daily">📅 Hàng ngày</option>
                  <option value="weekly">📅 Hàng tuần</option>
                  <option value="monthly">📅 Hàng tháng</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
              <Button 
                variant="outline" 
                onClick={() => setShowCalendarModal(false)}
                className="px-6 py-2 hover:bg-gray-100 transition-all-smooth hover-lift"
              >
                Hủy
              </Button>
              <Button 
                onClick={handleCalendarSubmit} 
                className="px-6 py-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-lg transition-all-smooth hover-lift"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd"/>
                </svg>
                Thêm vào lịch
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Important Modal */}
      {showImportantModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm animate-modalBackdrop">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full transform transition-all duration-300 scale-100 animate-modalScale hover-lift">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-yellow-50 to-amber-50">
              <h3 className="text-xl font-bold text-gray-900 flex items-center">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-3 hover-lift">
                  <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                </div>
                {notification?.priority === 'high' ? 'Bỏ đánh dấu quan trọng' : 'Đánh dấu quan trọng'}
              </h3>
              <button 
                onClick={() => setShowImportantModal(false)}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2 transition-all-smooth hover-lift"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
                </svg>
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Current Status */}
              <div className={`${notification?.priority === 'high' ? 'bg-yellow-50 border-yellow-200' : 'bg-gray-50 border-gray-200'} border rounded-lg p-4 animate-fadeIn`}>
                <div className="flex items-center space-x-2">
                  <svg className={`w-5 h-5 ${notification?.priority === 'high' ? 'text-yellow-600 animate-pulse-important' : 'text-gray-500'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  <div className="text-sm">
                    <p className="font-medium text-gray-900">
                      Trạng thái hiện tại: 
                      <span className={`ml-1 ${notification?.priority === 'high' ? 'text-yellow-700' : 'text-gray-600'}`}>
                        {notification?.priority === 'high' ? 'Đã đánh dấu quan trọng' : 'Chưa đánh dấu quan trọng'}
                      </span>
                    </p>
                    <p className="text-gray-600 mt-1">
                      Thông báo: "{notification?.subject}"
                    </p>
                  </div>
                </div>
              </div>

              <div className="animate-fadeIn" style={{animationDelay: '0.1s'}}>
                <label className="block text-sm font-semibold text-gray-700 mb-2 items-center">
                  <svg className="w-4 h-4 mr-2 text-gray-500 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                  </svg>
                  {notification?.priority === 'high' ? 'Lý do bỏ đánh dấu' : 'Lý do đánh dấu quan trọng'}
                </label>
                <textarea
                  value={importantNote.reason}
                  onChange={(e) => setImportantNote({...importantNote, reason: e.target.value})}
                  placeholder={notification?.priority === 'high' ? 'Tại sao bỏ đánh dấu quan trọng?' : 'Tại sao thông báo này quan trọng?'}
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all-smooth resize-none hover:border-yellow-400"
                />
              </div>
              
              {notification?.priority !== 'high' && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-4 animate-fadeIn" style={{animationDelay: '0.2s'}}>
                  <div className="flex items-center justify-between">
                    <label className="flex items-center space-x-3 cursor-pointer hover-lift">
                      <input
                        type="checkbox"
                        id="reminder"
                        checked={importantNote.reminder}
                        onChange={(e) => setImportantNote({...importantNote, reminder: e.target.checked})}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 transition-all-smooth"
                      />
                      <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 2L3 7v11a2 2 0 002 2h4v-6h2v6h4a2 2 0 002-2V7l-7-5z"/>
                        </svg>
                        <span className="text-sm font-medium text-blue-800">Thiết lập nhắc nhở</span>
                      </div>
                    </label>
                  </div>
                  
                  {importantNote.reminder && (
                    <div className="mt-3 animate-fadeIn">
                      <label className="block text-sm font-medium text-blue-700 mb-2 items-center">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                        </svg>
                        Ngày và giờ nhắc nhở
                      </label>
                      <input
                        type="datetime-local"
                        value={importantNote.reminderDate}
                        onChange={(e) => setImportantNote({...importantNote, reminderDate: e.target.value})}
                        className="w-full p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all-smooth hover:border-blue-400"
                      />
                    </div>
                  )}
                </div>
              )}
              
              <div className="animate-fadeIn" style={{animationDelay: '0.3s'}}>
                <label className="block text-sm font-semibold text-gray-700 mb-2 items-center">
                  <svg className="w-4 h-4 mr-2 text-gray-500 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd"/>
                  </svg>
                  Ghi chú thêm
                </label>
                <textarea
                  value={importantNote.notes}
                  onChange={(e) => setImportantNote({...importantNote, notes: e.target.value})}
                  placeholder="Ghi chú thêm về việc đánh dấu này..."
                  rows={2}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all-smooth resize-none hover:border-yellow-400"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
              <Button 
                variant="outline" 
                onClick={() => setShowImportantModal(false)}
                className="px-6 py-2 hover:bg-gray-100 transition-all-smooth hover-lift"
              >
                Hủy
              </Button>
              <Button 
                onClick={handleImportantSubmit} 
                className={`px-6 py-2 shadow-lg transition-all-smooth hover-lift ${notification?.priority === 'high' 
                  ? "bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800" 
                  : "bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800"
                }`}
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                {notification?.priority === 'high' ? 'Bỏ đánh dấu' : 'Đánh dấu quan trọng'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
