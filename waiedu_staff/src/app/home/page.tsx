'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import TaskStatusBadge from '@/components/tasks/TaskStatusBadge';
import TaskPriorityIcon from '@/components/tasks/TaskPriorityIcon';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/layout/Header';
import { tasksAPI, Task } from '@/lib/tasks';

export default function HomePage() {
  const router = useRouter();
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  


  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const fetchedTasks = await tasksAPI.getTasks();
        setTasks(fetchedTasks);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Mock data for notifications
  const notifications = [
    { id: 1, title: 'Yêu cầu phê duyệt nghỉ phép', from: 'HR', time: '5 phút trước', isRead: false, priority: 'high' },
    { id: 2, title: 'Báo cáo tháng hoàn thành', from: 'Ban Giám đốc', time: '1 giờ trước', isRead: false, priority: 'normal' },
    { id: 3, title: 'Cập nhật hệ thống vào cuối tuần', from: 'IT', time: '3 giờ trước', isRead: true, priority: 'normal' },
    { id: 4, title: 'Sự kiện team building tháng tới', from: 'HR', time: '1 ngày trước', isRead: true, priority: 'low' },
    { id: 5, title: 'Khảo sát độ hài lòng nhân viên', from: 'HR', time: '2 ngày trước', isRead: true, priority: 'normal' },
  ];

  // Mock data for announcements
  const announcements = [
    "Chúc mừng sinh nhật các nhân viên trong tháng!",
    "Bảo trì hệ thống từ 2AM-4AM Chủ Nhật.",
    "Đừng quên nộp báo cáo tuần trước 5PM Thứ Sáu.",
    "Chương trình training kỹ năng mới sắp diễn ra.",
  ];



  const handleTaskClick = (id: string) => {
    router.push(`/tasks/${id}`);
  };

  const handleNotificationClick = (id: number) => {
    router.push(`/notifications/${id}`);
  };

  // Dummy delete functions for UI demo
  const handleDeleteTask = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    alert(`Xóa task ${id}`);
  };
  const handleDeleteNotification = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    alert(`Xóa thông báo ${id}`);
  };



  // Get recent tasks for dashboard
  const recentTasks = tasks.slice(0, 5);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Header />

        {/* Announcement Ticker */}
        <div className="bg-blue-800 text-white py-2 overflow-hidden">
          <div className="flex whitespace-nowrap animate-marquee">
            {announcements.map((announcement, index) => (
              <span key={index} className="flex items-center px-8 text-sm">
                <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                {announcement}
              </span>
            ))}
            {/* Duplicate for seamless loop */}
            {announcements.map((announcement, index) => (
              <span key={`duplicate-${index}`} className="flex items-center px-8 text-sm">
                <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                {announcement}
              </span>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-10 py-8 min-h-screen overflow-visible relative">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Chào mừng trở lại, {user?.fullName}!</h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 overflow-visible relative">
            <div className="bg-white rounded-lg p-8 min-h-[550px] overflow-visible relative">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <span>Công việc gần đây</span>
                    <span className="ml-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                      {recentTasks.filter(t => t.status !== 'done' && t.status !== 'cancelled').length} đang thực hiện
                    </span>
                  </div>
                </h2>
                <Button variant="outline" size="sm" onClick={() => router.push('/tasks')} className="hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-all duration-200">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Xem tất cả
                </Button>
              </div>
              {isLoading && <p className="text-center text-gray-500">Đang tải công việc...</p>}
              {error && <p className="text-center text-red-500">Lỗi: {error}</p>}
              {!isLoading && !error && (
                <div className="space-y-1.5 max-h-[480px] overflow-y-auto overflow-x-visible scrollbar-hide -mx-2 mt-2.5 relative">
                  {recentTasks.map((task, index) => {
                    const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'done' && task.status !== 'cancelled';
                    return (
                      <div key={task.id} className={`group relative p-1.5 mx-2 rounded-md border cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:z-50 z-10 ${task.status === 'todo' || task.status === 'in_progress' ? 'border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100' : 'border-gray-200 bg-white hover:bg-gray-50'}`} onClick={() => handleTaskClick(String(task.id))}>
                        <div className="absolute -top-1 -left-1 w-3.5 h-3.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-xs font-bold text-white z-10">
                          {index + 1}
                        </div>
                        <button onClick={(e) => handleDeleteTask(String(task.id), e)} className="absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-100 transition-all duration-200 text-gray-400 hover:text-red-500 p-0.5 hover:bg-red-50 rounded z-10" title="Xóa task">
                          <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                        <div className="pr-4 pl-6">
                          <div className="flex items-center justify-between mb-1.5">
                            <div className="flex items-center space-x-1">
                              <TaskPriorityIcon priority={task.priority} size="sm" />
                              <TaskStatusBadge status={task.status} size="sm" />
                              {isOverdue && (
                                <div className="inline-flex items-center px-1 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800 border border-red-200">
                                  <svg className="w-2 h-2 mr-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clipRule="evenodd" />
                                  </svg>
                                  Quá hạn
                                </div>
                              )}
                            </div>
                            <div className="flex items-center text-xs text-gray-500 bg-gray-100 px-1 py-0.5 rounded">
                              <svg className="w-2 h-2 mr-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                              </svg>
                              #{task.id}
                            </div>
                          </div>
                          <h4 className={`text-xs leading-4 mb-1 line-clamp-1 ${task.status === 'todo' || task.status === 'in_progress' ? 'font-semibold text-gray-900' : 'font-medium text-gray-700'}`}>
                            {task.title}
                          </h4>
                          <div className="mb-1">
                            <div className="flex items-center justify-between text-xs text-gray-600 mb-0.5">
                              <div className="flex items-center">
                                <svg className="w-2 h-2 mr-0.5" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span className="text-xs">{task.progress}%</span>
                              </div>
                              <div className="flex items-center">
                                <svg className="w-2 h-2 mr-0.5" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                </svg>
                                <span className={`text-xs ${isOverdue ? 'text-red-600 font-medium' : ''}`}>
                                  {new Date(task.dueDate).toLocaleDateString('vi-VN')}
                                </span>
                              </div>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1 overflow-hidden">
                              <div className={`h-1 rounded-full transition-all duration-500 ease-out ${task.progress === 100 ? 'bg-gradient-to-r from-green-400 to-green-600' : task.progress >= 70 ? 'bg-gradient-to-r from-blue-400 to-blue-600' : task.progress >= 40 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' : 'bg-gradient-to-r from-gray-400 to-gray-500'}`} style={{ width: `${task.progress}%` }} />
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-xs text-gray-600">
                              <div className="w-3 h-3 bg-gray-200 rounded-full flex items-center justify-center mr-1">
                                <svg className="w-1.5 h-1.5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                </svg>
                              </div>
                              <span className="font-medium truncate">{task.assignedTo}</span>
                            </div>
                            <div className="flex items-center text-xs text-gray-500">
                              <svg className="w-2.5 h-2.5 mr-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                              </svg>
                              <span className="capitalize">{task.category}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
              {recentTasks.length === 0 && (
                <div className="text-center text-gray-500 py-12">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg className="w-10 h-10 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-lg font-medium text-gray-700 mb-1">Không có task nào</p>
                  <p className="text-sm text-gray-500 mb-4">Bắt đầu tạo task đầu tiên của bạn</p>
                  <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-none" onClick={() => router.push('/tasks/create')}>
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Tạo Task Mới
                  </Button>
                </div>
              )}
            </div>
            <div className="grid grid-rows-2 gap-8 overflow-visible relative">
              <div className="bg-white rounded-lg p-8 min-h-[260px] overflow-visible relative">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                      </svg>
                    </div>
                    <div>
                      <span>Thông báo mới</span>
                      {notifications.filter(n => !n.isRead).length > 0 && (
                        <span className="ml-3 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                          {notifications.filter(n => !n.isRead).length} chưa đọc
                        </span>
                      )}
                    </div>
                  </h3>
                  <Button variant="outline" size="sm" onClick={() => router.push('/notifications')} className="hover:bg-orange-50 hover:border-orange-300 hover:text-orange-600 transition-all duration-200">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Xem tất cả
                  </Button>
                </div>
                <div className="space-y-3 max-h-80 overflow-y-auto overflow-x-visible scrollbar-hide -mx-2 relative">
                  {notifications.slice(0, 5).map((notification, index) => (
                    <div key={notification.id} className={`group relative p-3 mx-2 rounded-lg border cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:z-50 z-10 ${!notification.isRead ? 'border-orange-200 bg-gradient-to-r from-orange-50 to-yellow-50 hover:from-orange-100 hover:to-yellow-100' : 'border-gray-200 bg-white hover:bg-gray-50'}`} onClick={() => handleNotificationClick(notification.id)}>
                      <div className="absolute -top-1 -left-1 w-5 h-5 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-xs font-bold text-white z-10">
                        {index + 1}
                      </div>
                      <button onClick={(e) => handleDeleteNotification(notification.id, e)} className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-200 text-gray-400 hover:text-red-500 p-1 hover:bg-red-50 rounded-lg z-10" title="Xóa thông báo">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                      <div className="pr-6 pl-6">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <div className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${notification.from === 'Khách hàng' ? 'bg-green-100 text-green-800 border-green-200' : notification.from === 'HR' ? 'bg-orange-100 text-orange-800 border-orange-200' : notification.from === 'Ban Giám đốc' ? 'bg-purple-100 text-purple-800 border-purple-200' : notification.from === 'IT' ? 'bg-gray-100 text-gray-800 border-gray-200' : 'bg-blue-100 text-blue-800 border-blue-200'}`}>
                              <svg className="w-2.5 h-2.5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                              </svg>
                              {notification.from}
                            </div>
                            {notification.priority === 'high' && (
                              <div className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
                                <svg className="w-2.5 h-2.5 mr-0.5" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                Ưu tiên
                              </div>
                            )}
                          </div>
                          <div className="flex items-center text-xs text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded-full">
                            <svg className="w-2.5 h-2.5 mr-0.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clipRule="evenodd" />
                            </svg>
                            {notification.time}
                          </div>
                        </div>
                        <h4 className={`text-sm leading-5 line-clamp-1 ${!notification.isRead ? 'font-semibold text-gray-900' : 'font-medium text-gray-700'}`}>
                          {notification.title}
                        </h4>
                        {!notification.isRead && (
                          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-orange-500 to-red-500 rounded-r"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                {notifications.length === 0 && (
                  <div className="text-center text-gray-500 py-12">
                    <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                      <svg className="w-10 h-10 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                      </svg>
                    </div>
                    <p className="text-lg font-medium text-gray-700 mb-1">Không có thông báo mới</p>
                    <p className="text-sm text-gray-500">Bạn đã xem hết tất cả thông báo</p>
                  </div>
                )}
              </div>
              <div className="bg-white rounded-lg p-6 min-h-[270px] overflow-visible relative">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                    </svg>
                  </div>
                  Truy cập nhanh
                </h3>
                <p className="text-gray-600 mb-6 text-sm">
                  Các chức năng thường dùng và báo cáo
                </p>
                <div className="grid grid-cols-1 gap-3">
                  <Button variant="outline" className="w-full justify-start p-4 h-auto hover:bg-green-50 hover:border-green-300 transition-all duration-200" onClick={() => router.push('/tasks/create')}>
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="text-left">
                        <div className="font-medium text-gray-900">Tạo Task Mới</div>
                        <div className="text-xs text-gray-500">Thêm công việc mới</div>
                      </div>
                    </div>
                  </Button>
                  <Button variant="outline" className="w-full justify-start p-4 h-auto hover:bg-orange-50 hover:border-orange-300 transition-all duration-200" onClick={() => router.push('/notifications/compose')}>
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      </div>
                      <div className="text-left">
                        <div className="font-medium text-gray-900">Soạn Thông Báo</div>
                        <div className="text-xs text-gray-500">Gửi thông báo mới</div>
                      </div>
                    </div>
                  </Button>
                  <Button variant="outline" className="w-full justify-start p-4 h-auto hover:bg-purple-50 hover:border-purple-300 transition-all duration-200" onClick={() => router.push('/notifications/statistics')}>
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                          <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                        </svg>
                      </div>
                      <div className="text-left">
                        <div className="font-medium text-gray-900">Xem Thống Kê</div>
                        <div className="text-xs text-gray-500">Báo cáo và phân tích</div>
                      </div>
                    </div>
                  </Button>
                  <Button variant="outline" className="w-full justify-start p-4 h-auto hover:bg-green-50 hover:border-green-300 transition-all duration-200" onClick={() => router.push('/customers/create')}>
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                        </svg>
                      </div>
                      <div className="text-left">
                        <div className="font-medium text-gray-900">Tạo Tài Khoản Khách Hàng</div>
                        <div className="text-xs text-gray-500">Thêm khách hàng doanh nghiệp</div>
                      </div>
                    </div>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                  </svg>
                </div>
                <div>
                  <span>Thống kê hoạt động</span>
                  <p className="text-sm text-gray-600 font-normal mt-1">Tổng quan về hiệu suất và tiến độ công việc</p>
                </div>
              </h2>
              <Button variant="outline" onClick={() => router.push('/notifications/statistics')} className="hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-600 transition-all duration-200">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Chi tiết
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-600 text-sm font-medium">Tổng Tasks</p>
                    <p className="text-2xl font-bold text-blue-900">{tasks.length}</p>
                    <p className="text-xs text-blue-600">Tất cả công việc</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-200 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-600 text-sm font-medium">Hoàn thành</p>
                    <p className="text-2xl font-bold text-green-900">
                      {tasks.filter(t => t.status === 'done').length}
                    </p>
                    <p className="text-xs text-green-600">Đã xong</p>
                  </div>
                  <div className="w-12 h-12 bg-green-200 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-yellow-600 text-sm font-medium">Đang thực hiện</p>
                    <p className="text-2xl font-bold text-yellow-900">
                      {tasks.filter(t => t.status === 'in_progress').length}
                    </p>
                    <p className="text-xs text-yellow-600">Đang làm</p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-200 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-600 text-sm font-medium">Thông báo</p>
                    <p className="text-2xl font-bold text-purple-900">{notifications.length}</p>
                    <p className="text-xs text-purple-600">
                      {notifications.filter(n => !n.isRead).length} chưa đọc
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-purple-200 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 border border-gray-200">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">Biểu đồ hiệu suất</h3>
                <p className="text-gray-500 mb-4">Biểu đồ thống kê tiến độ công việc theo thời gian sẽ được hiển thị tại đây</p>
                <Button variant="outline" onClick={() => router.push('/notifications/statistics')} className="hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-600">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Xem báo cáo chi tiết
                </Button>
              </div>
            </div>
          </div>


        </main>
      </div>
    </ProtectedRoute>
  );
} 