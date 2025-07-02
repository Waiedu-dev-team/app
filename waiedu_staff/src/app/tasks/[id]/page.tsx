'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import TaskStatusBadge from '@/components/tasks/TaskStatusBadge';
import TaskPriorityIcon from '@/components/tasks/TaskPriorityIcon';
import TaskForm from '@/components/tasks/TaskForm';
import { Task, TASK_STATUSES, TaskComment, TaskActivity, TaskAttachment } from '@/types/task';
import { mockTasks, mockTaskComments, mockTaskActivities, mockTaskAttachments } from '@/lib/mockTaskData';

export default function TaskDetailPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const taskId = parseInt(params.id as string);
  const editMode = searchParams.get('mode') === 'edit';

  const [task, setTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(editMode);
  const [activeTab, setActiveTab] = useState<'overview' | 'comments' | 'activity' | 'files'>('overview');
  const [newComment, setNewComment] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  // Load task data
  useEffect(() => {
    const timer = setTimeout(() => {
      const foundTask = mockTasks.find(t => t.id === taskId);
      setTask(foundTask || null);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [taskId]);

  const comments: TaskComment[] = mockTaskComments[taskId] || [];
  const activities: TaskActivity[] = mockTaskActivities[taskId] || [];
  const attachments: TaskAttachment[] = mockTaskAttachments[taskId] || [];

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.includes('pdf')) {
      return (
        <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
        </svg>
      );
    }
    if (fileType.includes('image')) {
      return (
        <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
        </svg>
      );
    }
    if (fileType.includes('figma')) {
      return (
        <svg className="w-6 h-6 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
        </svg>
      );
    }
    if (fileType.includes('html')) {
      return (
        <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      );
    }
    return (
      <svg className="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clipRule="evenodd" />
      </svg>
    );
  };

  const handleTaskUpdate = (updates: Partial<Task>) => {
    // In real app, this would call API
    if (task) {
      const updatedTask = {
        ...task,
        ...updates,
        updatedAt: new Date().toISOString()
      };
      setTask(updatedTask);
    }
    setIsEditing(false);
    alert('Task đã được cập nhật thành công!');
  };

  const handleStatusChange = (newStatus: string) => {
    if (task && newStatus !== task.status) {
      const updates = { 
        status: newStatus as any,
        progress: newStatus === 'done' ? 100 : task.progress
      };
      handleTaskUpdate(updates);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    setIsSubmittingComment(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // In real app, would add to state/refetch
    alert('Comment đã được thêm!');
    setNewComment('');
    setIsSubmittingComment(false);
  };

  const handleDelete = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa task này?')) {
      // In real app, call API to delete
      alert('Task đã được xóa!');
      router.push('/tasks');
    }
  };

  const handleDuplicate = () => {
    if (task) {
      // In real app, navigate to create page with prefilled data
      router.push(`/tasks/create?duplicate=${task.id}`);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải thông tin task...</p>
        </div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Task không tồn tại</h2>
          <p className="text-gray-600 mb-6">Task ID {taskId} không được tìm thấy trong hệ thống.</p>
          <Button onClick={() => router.push('/tasks')}>
            ← Quay lại danh sách Tasks
          </Button>
        </div>
      </div>
    );
  }

  const isOverdue = new Date(task.dueDate) < new Date() && 
                   task.status !== 'done' && 
                   task.status !== 'cancelled';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => router.push('/tasks')}
                className="text-white border-white hover:bg-white hover:text-blue-600"
              >
                ← Quay lại
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-white">Task #{task.id}</h1>
                <p className="text-blue-100">Chi tiết và quản lý task</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {!isEditing && (
                <>
                  <Button 
                    variant="outline"
                    onClick={() => setIsEditing(true)}
                    className="text-white border-white hover:bg-white hover:text-blue-600 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                    Chỉnh sửa
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={handleDuplicate}
                    className="text-white border-white hover:bg-white hover:text-blue-600 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                      <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                    </svg>
                    Sao chép
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={handleDelete}
                    className="text-white border-white hover:bg-red-100 hover:text-red-600 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Xóa
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isEditing ? (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Chỉnh sửa Task</h2>
            <TaskForm
              task={task}
              mode="edit"
              onSubmit={handleTaskUpdate}
              onCancel={() => setIsEditing(false)}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Task Info */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <TaskPriorityIcon priority={task.priority} showLabel />
                      <TaskStatusBadge status={task.status} />
                      {isOverdue && (
                        <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full font-medium flex items-center gap-1">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clipRule="evenodd" />
                          </svg>
                          Quá hạn
                        </span>
                      )}
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-3">{task.title}</h1>
                    <p className="text-gray-600 mb-4">{task.description}</p>
                  </div>
                </div>

                {/* Progress */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Tiến độ</span>
                    <span>{task.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${task.progress}%` }}
                    />
                  </div>
                </div>

                {/* Tags */}
                {task.tags.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {task.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quick Status Change */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Thay đổi trạng thái nhanh</h3>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(TASK_STATUSES).map(([status, config]) => (
                      <Button
                        key={status}
                        variant={task.status === status ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handleStatusChange(status)}
                        disabled={task.status === status}
                        className="flex items-center gap-1"
                      >
                        <TaskStatusBadge status={status as any} showIcon={true} size="sm" />
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="bg-white rounded-lg shadow">
                <div className="border-b border-gray-200">
                  <nav className="flex space-x-8 px-6">
                    {[
                      { 
                        id: 'overview', 
                        label: 'Tổng quan', 
                        icon: (
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                            <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                          </svg>
                        ) 
                      },
                      { 
                        id: 'comments', 
                        label: `Comments (${comments.length})`, 
                        icon: (
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                          </svg>
                        ) 
                      },
                      { 
                        id: 'activity', 
                        label: `Hoạt động (${activities.length})`, 
                        icon: (
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                          </svg>
                        ) 
                      },
                      { 
                        id: 'files', 
                        label: `Files (${attachments.length})`, 
                        icon: (
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clipRule="evenodd" />
                          </svg>
                        ) 
                      }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                          activeTab === tab.id
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          {tab.icon}
                          {tab.label}
                        </span>
                      </button>
                    ))}
                  </nav>
                </div>

                <div className="p-6">
                  {activeTab === 'overview' && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Thông tin cơ bản</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Tạo lúc:</span>
                              <span>{formatDateTime(task.createdAt)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Cập nhật:</span>
                              <span>{formatDateTime(task.updatedAt)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Danh mục:</span>
                              <span className="capitalize">{task.category}</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Thời gian</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Ước tính:</span>
                              <span>{task.estimatedHours || 0}h</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Thực tế:</span>
                              <span>{task.actualHours || 0}h</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Hạn chót:</span>
                              <span className={isOverdue ? 'text-red-600 font-medium' : ''}>
                                {new Date(task.dueDate).toLocaleDateString('vi-VN')}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'comments' && (
                    <div className="space-y-6">
                      {/* Add Comment */}
                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-3">Thêm comment</h4>
                        <div className="space-y-3">
                          <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Nhập comment của bạn..."
                            rows={3}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                          />
                          <div className="flex justify-end">
                            <Button 
                              onClick={handleAddComment}
                              disabled={!newComment.trim() || isSubmittingComment}
                              size="sm"
                            >
                              {isSubmittingComment ? 'Đang gửi...' : 'Gửi Comment'}
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Comments List */}
                      <div className="space-y-4">
                        {comments.length > 0 ? (
                          comments.map((comment: TaskComment) => (
                            <div key={comment.id} className="flex gap-3 p-4 border rounded-lg">
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium text-sm">
                                {comment.userName.charAt(0)}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-medium text-gray-900">{comment.userName}</span>
                                  <span className="text-xs text-gray-500">{formatDateTime(comment.createdAt)}</span>
                                </div>
                                <p className="text-gray-700">{comment.content}</p>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-8 text-gray-500">
                            <div className="flex justify-center mb-4">
                              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                                </svg>
                              </div>
                            </div>
                            <p>Chưa có comment nào</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {activeTab === 'activity' && (
                    <div className="space-y-4">
                      {activities.length > 0 ? (
                        activities.map((activity: TaskActivity) => (
                          <div key={activity.id} className="flex gap-3 p-4 border-l-4 border-blue-200 bg-blue-50 rounded-r-lg">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium text-sm">
                              {activity.userName.charAt(0)}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium text-gray-900">{activity.userName}</span>
                                <span className="text-xs text-gray-500">{formatDateTime(activity.createdAt)}</span>
                              </div>
                              <p className="text-gray-700">{activity.description}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          <div className="flex justify-center mb-4">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                              <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                              </svg>
                            </div>
                          </div>
                          <p>Chưa có hoạt động nào</p>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === 'files' && (
                    <div className="space-y-4">
                      {/* Upload Area */}
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <div className="flex justify-center mb-4">
                          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                        <p className="text-gray-600 mb-3">Kéo thả file vào đây hoặc</p>
                        <Button variant="outline" size="sm">
                          Chọn file
                        </Button>
                      </div>

                      {/* Files List */}
                      {attachments.length > 0 ? (
                        <div className="space-y-3">
                          {attachments.map((file: TaskAttachment) => (
                            <div key={file.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                              <div className="flex items-center gap-3">
                                <div className="flex items-center justify-center">{getFileIcon(file.fileType)}</div>
                                <div>
                                  <p className="font-medium text-gray-900">{file.fileName}</p>
                                  <p className="text-sm text-gray-500">
                                    {formatFileSize(file.fileSize)} • {file.uploadedBy} • {formatDateTime(file.uploadedAt)}
                                  </p>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="flex items-center gap-1">
                                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                                  </svg>
                                  Tải
                                </Button>
                                <Button variant="outline" size="sm" className="flex items-center gap-1">
                                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                  </svg>
                                  Xem
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          <div className="flex justify-center mb-4">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                              <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                              </svg>
                            </div>
                          </div>
                          <p>Chưa có file đính kèm</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Assignee Info */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="font-medium text-gray-900 mb-4">Thông tin giao việc</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Được giao cho</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium text-sm">
                        {task.assignedTo.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{task.assignedTo}</p>
                        <p className="text-xs text-gray-500">{task.assignedToEmail}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Được tạo bởi</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-medium text-sm">
                        {task.createdBy.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{task.createdBy}</p>
                        <p className="text-xs text-gray-500">{task.createdByEmail}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Related Actions */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="font-medium text-gray-900 mb-4">Hành động</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    Gửi thông báo
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    Thêm vào lịch
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                      <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                    </svg>
                    Báo cáo tiến độ
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                    </svg>
                    Sao chép link
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
