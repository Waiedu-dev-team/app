'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

interface StatisticData {
  totalNotifications: number;
  unreadNotifications: number;
  readNotifications: number;
  archivedNotifications: number;
  deletedNotifications: number;
  highPriorityNotifications: number;
  normalPriorityNotifications: number;
  lowPriorityNotifications: number;
  templateUsage: TemplateUsage[];
  categoryStats: CategoryStats[];
  monthlyTrends: MonthlyTrend[];
  responseRates: ResponseRate[];
  userActivity: UserActivity[];
}

interface TemplateUsage {
  templateName: string;
  usageCount: number;
  percentage: number;
}

interface CategoryStats {
  category: string;
  count: number;
  percentage: number;
  color: string;
}

interface MonthlyTrend {
  month: string;
  sent: number;
  read: number;
  responded: number;
}

interface ResponseRate {
  type: string;
  rate: number;
  trend: 'up' | 'down' | 'stable';
}

interface UserActivity {
  userName: string;
  department: string;
  totalSent: number;
  totalRead: number;
  responseRate: number;
}

export default function NotificationStatisticsPage() {
  const router = useRouter();
  const [stats, setStats] = useState<StatisticData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('30days');
  const [selectedView, setSelectedView] = useState('overview');

  // Mock data
  const mockStats: StatisticData = {
    totalNotifications: 1247,
    unreadNotifications: 86,
    readNotifications: 1045,
    archivedNotifications: 98,
    deletedNotifications: 18,
    highPriorityNotifications: 124,
    normalPriorityNotifications: 987,
    lowPriorityNotifications: 136,
    templateUsage: [
      { templateName: 'Thông báo họp định kỳ', usageCount: 245, percentage: 35.2 },
      { templateName: 'Chào mừng nhân viên mới', usageCount: 156, percentage: 22.4 },
      { templateName: 'Thông báo bảo trì hệ thống', usageCount: 98, percentage: 14.1 },
      { templateName: 'Thông báo nghỉ lễ', usageCount: 87, percentage: 12.5 },
      { templateName: 'Thông báo training', usageCount: 110, percentage: 15.8 }
    ],
    categoryStats: [
      { category: 'HR', count: 423, percentage: 33.9, color: '#3B82F6' },
      { category: 'IT', count: 298, percentage: 23.9, color: '#10B981' },
      { category: 'Meeting', count: 267, percentage: 21.4, color: '#F59E0B' },
      { category: 'Training', count: 156, percentage: 12.5, color: '#EF4444' },
      { category: 'General', count: 103, percentage: 8.3, color: '#8B5CF6' }
    ],
    monthlyTrends: [
      { month: 'Jan', sent: 98, read: 89, responded: 67 },
      { month: 'Feb', sent: 112, read: 98, responded: 78 },
      { month: 'Mar', sent: 134, read: 123, responded: 89 },
      { month: 'Apr', sent: 156, read: 142, responded: 98 },
      { month: 'May', sent: 189, read: 167, responded: 123 },
      { month: 'Jun', sent: 234, read: 198, responded: 145 }
    ],
    responseRates: [
      { type: 'Tỷ lệ đọc', rate: 83.8, trend: 'up' },
      { type: 'Tỷ lệ phản hồi', rate: 62.4, trend: 'up' },
      { type: 'Thời gian phản hồi TB', rate: 4.2, trend: 'down' },
      { type: 'Tỷ lệ hoàn thành nhiệm vụ', rate: 78.9, trend: 'stable' }
    ],
    userActivity: [
      { userName: 'Nguyễn Văn A', department: 'IT', totalSent: 45, totalRead: 423, responseRate: 89.2 },
      { userName: 'Trần Thị B', department: 'HR', totalSent: 67, totalRead: 378, responseRate: 92.1 },
      { userName: 'Lê Văn C', department: 'Marketing', totalSent: 23, totalRead: 298, responseRate: 76.5 },
      { userName: 'Phạm Thị D', department: 'Finance', totalSent: 34, totalRead: 234, responseRate: 84.3 },
      { userName: 'Hoàng Văn E', department: 'Operations', totalSent: 56, totalRead: 189, responseRate: 88.7 }
    ]
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStats(mockStats);
      setIsLoading(false);
    }, 1000);
  }, [selectedPeriod]);

  const getReadPercentage = (stats: StatisticData) => {
    return ((stats.readNotifications / stats.totalNotifications) * 100).toFixed(1);
  };

  const getUnreadPercentage = (stats: StatisticData) => {
    return ((stats.unreadNotifications / stats.totalNotifications) * 100).toFixed(1);
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd"/>
        </svg>;
      case 'down':
        return <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd"/>
        </svg>;
      default:
        return <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
        </svg>;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Đang tải thống kê...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gray-900 text-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => router.push('/notifications')}
                className="text-gray-300 hover:text-white"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd"/>
                </svg>
              </button>
              <span className="text-lg font-semibold">WaiEdu Staff</span>
              <span className="text-gray-300">|</span>
              <span className="text-gray-300">Thống kê thông báo</span>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="text-sm">
                <div className="text-gray-300">Nguyen Van A (NV001)</div>
                <div className="text-gray-400">Phòng IT</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                <svg className="w-8 h-8 mr-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                Thống kê Thông báo
              </h1>
              <p className="text-gray-600 mt-1">
                Phân tích hiệu quả và xu hướng sử dụng thông báo
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="7days">7 ngày qua</option>
                <option value="30days">30 ngày qua</option>
                <option value="90days">3 tháng qua</option>
                <option value="365days">1 năm qua</option>
              </select>
              
              <Button 
                onClick={() => window.print()}
                variant="outline"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd"/>
                </svg>
                Xuất báo cáo
              </Button>
            </div>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Tổng thông báo</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalNotifications.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Đã đọc</p>
                <p className="text-2xl font-bold text-gray-900">{stats.readNotifications.toLocaleString()}</p>
                <p className="text-sm text-green-600">{getReadPercentage(stats)}%</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Chưa đọc</p>
                <p className="text-2xl font-bold text-gray-900">{stats.unreadNotifications.toLocaleString()}</p>
                <p className="text-sm text-yellow-600">{getUnreadPercentage(stats)}%</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/>
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Ưu tiên cao</p>
                <p className="text-2xl font-bold text-gray-900">{stats.highPriorityNotifications.toLocaleString()}</p>
                <p className="text-sm text-red-600">{((stats.highPriorityNotifications / stats.totalNotifications) * 100).toFixed(1)}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Category Distribution */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Phân bố theo danh mục</h3>
            <div className="space-y-4">
              {stats.categoryStats.map((category, index) => (
                <div key={index} className="flex items-center">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-900">{category.category}</span>
                      <span className="text-sm text-gray-500">{category.count} ({category.percentage}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${category.percentage}%`,
                          backgroundColor: category.color
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Response Rates */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tỷ lệ phản hồi</h3>
            <div className="space-y-4">
              {stats.responseRates.map((rate, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {getTrendIcon(rate.trend)}
                    <span className="text-sm font-medium text-gray-900">{rate.type}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-gray-900">
                      {rate.rate}
                      {rate.type.includes('Thời gian') ? ' giờ' : '%'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Monthly Trends */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Xu hướng theo tháng</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tháng</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Đã gửi</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Đã đọc</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Đã phản hồi</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tỷ lệ đọc</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {stats.monthlyTrends.map((trend, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{trend.month}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{trend.sent}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{trend.read}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{trend.responded}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {((trend.read / trend.sent) * 100).toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Template Usage */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Sử dụng template</h3>
          <div className="space-y-4">
            {stats.templateUsage.map((template, index) => (
              <div key={index} className="flex items-center">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900">{template.templateName}</span>
                    <span className="text-sm text-gray-500">{template.usageCount} lần ({template.percentage}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${template.percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Hoạt động người dùng</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Người dùng</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phòng ban</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Đã gửi</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Đã đọc</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tỷ lệ phản hồi</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {stats.userActivity.map((user, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.userName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.department}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.totalSent}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.totalRead}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.responseRate}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
