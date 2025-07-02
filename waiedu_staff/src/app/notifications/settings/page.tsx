'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

export default function NotificationSettingsPage() {
  const router = useRouter();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    desktopNotifications: true,
    soundEnabled: true,
    quietHours: {
      enabled: false,
      startTime: '22:00',
      endTime: '08:00'
    },
    categories: {
      support: true,
      internal: true,
      announcement: true,
      maintenance: true,
      marketing: false
    },
    frequency: 'instant', // instant, hourly, daily
    language: 'vi',
    autoMarkAsRead: false,
    showPreview: true
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    router.push('/login');
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert('Cài đặt đã được lưu thành công!');
    setIsSaving(false);
  };

  const handleReset = () => {
    if (confirm('Bạn có muốn đặt lại tất cả cài đặt về mặc định?')) {
      setSettings({
        emailNotifications: true,
        pushNotifications: true,
        smsNotifications: false,
        desktopNotifications: true,
        soundEnabled: true,
        quietHours: {
          enabled: false,
          startTime: '22:00',
          endTime: '08:00'
        },
        categories: {
          support: true,
          internal: true,
          announcement: true,
          maintenance: true,
          marketing: false
        },
        frequency: 'instant',
        language: 'vi',
        autoMarkAsRead: false,
        showPreview: true
      });
    }
  };

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
              <span className="text-gray-300">Cài đặt thông báo</span>
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
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button variant="outline" onClick={() => router.push('/notifications')} className="flex items-center space-x-2">
            <span>←</span>
            <span>Quay lại thông báo</span>
          </Button>
        </div>

        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Cài đặt thông báo</h1>
            <p className="mt-2 text-gray-600">Tùy chỉnh cách bạn nhận và quản lý thông báo</p>
          </div>

          {/* Notification Methods */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/>
              </svg>
              Phương thức nhận thông báo
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Email</h3>
                  <p className="text-sm text-gray-500">Nhận thông báo qua email</p>
                </div>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.emailNotifications}
                    onChange={(e) => setSettings({...settings, emailNotifications: e.target.checked})}
                    className="form-checkbox h-5 w-5 text-blue-600 rounded"
                  />
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Push Notifications</h3>
                  <p className="text-sm text-gray-500">Thông báo đẩy trên trình duyệt</p>
                </div>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.pushNotifications}
                    onChange={(e) => setSettings({...settings, pushNotifications: e.target.checked})}
                    className="form-checkbox h-5 w-5 text-blue-600 rounded"
                  />
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">SMS</h3>
                  <p className="text-sm text-gray-500">Tin nhắn SMS cho thông báo quan trọng</p>
                </div>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.smsNotifications}
                    onChange={(e) => setSettings({...settings, smsNotifications: e.target.checked})}
                    className="form-checkbox h-5 w-5 text-blue-600 rounded"
                  />
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Desktop</h3>
                  <p className="text-sm text-gray-500">Thông báo trên desktop</p>
                </div>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.desktopNotifications}
                    onChange={(e) => setSettings({...settings, desktopNotifications: e.target.checked})}
                    className="form-checkbox h-5 w-5 text-blue-600 rounded"
                  />
                </label>
              </div>
            </div>
          </Card>

          {/* Quiet Hours */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
              </svg>
              Giờ yên tĩnh
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Kích hoạt giờ yên tĩnh</h3>
                  <p className="text-sm text-gray-500">Tắt thông báo trong khoảng thời gian cụ thể</p>
                </div>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.quietHours.enabled}
                    onChange={(e) => setSettings({
                      ...settings,
                      quietHours: {...settings.quietHours, enabled: e.target.checked}
                    })}
                    className="form-checkbox h-5 w-5 text-blue-600 rounded"
                  />
                </label>
              </div>

              {settings.quietHours.enabled && (
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Từ</label>
                    <Input
                      type="time"
                      value={settings.quietHours.startTime}
                      onChange={(e) => setSettings({
                        ...settings,
                        quietHours: {...settings.quietHours, startTime: e.target.value}
                      })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Đến</label>
                    <Input
                      type="time"
                      value={settings.quietHours.endTime}
                      onChange={(e) => setSettings({
                        ...settings,
                        quietHours: {...settings.quietHours, endTime: e.target.value}
                      })}
                    />
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Categories */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
              </svg>
              Danh mục thông báo
            </h2>
            
            <div className="space-y-4">
              {Object.entries(settings.categories).map(([category, enabled]) => (
                <div key={category} className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900 capitalize">
                      {category === 'support' ? 'Hỗ trợ' :
                       category === 'internal' ? 'Nội bộ' :
                       category === 'announcement' ? 'Thông báo' :
                       category === 'maintenance' ? 'Bảo trì' :
                       category === 'marketing' ? 'Marketing' : category}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {category === 'support' ? 'Yêu cầu hỗ trợ từ khách hàng' :
                       category === 'internal' ? 'Thông báo nội bộ công ty' :
                       category === 'announcement' ? 'Thông báo chính thức' :
                       category === 'maintenance' ? 'Thông báo bảo trì hệ thống' :
                       category === 'marketing' ? 'Thông báo marketing và khuyến mãi' : ''}
                    </p>
                  </div>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={enabled}
                      onChange={(e) => setSettings({
                        ...settings,
                        categories: {...settings.categories, [category]: e.target.checked}
                      })}
                      className="form-checkbox h-5 w-5 text-blue-600 rounded"
                    />
                  </label>
                </div>
              ))}
            </div>
          </Card>

          {/* General Settings */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/>
              </svg>
              Cài đặt chung
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Âm thanh thông báo</h3>
                  <p className="text-sm text-gray-500">Phát âm thanh khi có thông báo mới</p>
                </div>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.soundEnabled}
                    onChange={(e) => setSettings({...settings, soundEnabled: e.target.checked})}
                    className="form-checkbox h-5 w-5 text-blue-600 rounded"
                  />
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Tự động đánh dấu đã đọc</h3>
                  <p className="text-sm text-gray-500">Đánh dấu đã đọc khi mở thông báo</p>
                </div>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.autoMarkAsRead}
                    onChange={(e) => setSettings({...settings, autoMarkAsRead: e.target.checked})}
                    className="form-checkbox h-5 w-5 text-blue-600 rounded"
                  />
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Hiển thị preview</h3>
                  <p className="text-sm text-gray-500">Hiển thị đoạn preview trong danh sách</p>
                </div>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.showPreview}
                    onChange={(e) => setSettings({...settings, showPreview: e.target.checked})}
                    className="form-checkbox h-5 w-5 text-blue-600 rounded"
                  />
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tần suất nhận thông báo</label>
                <select
                  value={settings.frequency}
                  onChange={(e) => setSettings({...settings, frequency: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="instant">Ngay lập tức</option>
                  <option value="hourly">Mỗi giờ</option>
                  <option value="daily">Hàng ngày</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ngôn ngữ</label>
                <select
                  value={settings.language}
                  onChange={(e) => setSettings({...settings, language: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="vi">Tiếng Việt</option>
                  <option value="en">English</option>
                </select>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-between">
            <Button variant="outline" onClick={handleReset} className="text-red-600 border-red-300 hover:bg-red-50">
              Đặt lại mặc định
            </Button>
            
            <div className="space-x-3">
              <Button variant="outline" onClick={() => router.push('/notifications')}>
                Hủy
              </Button>
              <Button onClick={handleSave} disabled={isSaving} className="bg-blue-600 hover:bg-blue-700">
                {isSaving ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                    Đang lưu...
                  </>
                ) : (
                  'Lưu cài đặt'
                )}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
