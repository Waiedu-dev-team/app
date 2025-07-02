'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import TaskForm from '@/components/tasks/TaskForm';
import { Task } from '@/types/task';
import { mockTasks } from '@/lib/mockTaskData';

export default function CreateTaskPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const duplicateId = searchParams.get('duplicate');
  
  const [isLoading, setIsLoading] = useState(false);
  const [duplicateTask, setDuplicateTask] = useState<Task | null>(null);

  // Load duplicate task if ID provided
  useEffect(() => {
    if (duplicateId) {
      const taskToDuplicate = mockTasks.find(t => t.id === parseInt(duplicateId));
      if (taskToDuplicate) {
        // Clear certain fields when duplicating
        setDuplicateTask({
          ...taskToDuplicate,
          id: 0, // Will be set by backend
          title: `Copy of ${taskToDuplicate.title}`,
          status: 'todo',
          progress: 0,
          createdAt: '',
          updatedAt: ''
        });
      }
    }
  }, [duplicateId]);

  const handleSubmit = async (taskData: Partial<Task>) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In real app, this would call the API
      console.log('Creating task:', taskData);
      
      // Generate new ID (in real app, backend would do this)
      const newId = Math.max(...mockTasks.map(t => t.id)) + 1;
      
      alert(`Task "${taskData.title}" đã được tạo thành công với ID #${newId}!`);
      
      // Redirect to task detail
      router.push(`/tasks/${newId}`);
      
    } catch (error) {
      alert('Có lỗi xảy ra khi tạo task. Vui lòng thử lại!');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (window.confirm('Bạn có chắc chắn muốn hủy? Dữ liệu chưa lưu sẽ bị mất.')) {
      router.push('/tasks');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-600 to-blue-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => router.push('/tasks')}
                className="text-white border-white hover:bg-white hover:text-green-600"
              >
                ← Quay lại
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  {duplicateId ? '📋 Sao chép Task' : '➕ Tạo Task Mới'}
                </h1>
                <p className="text-green-100">
                  {duplicateId 
                    ? 'Tạo task mới dựa trên task hiện có' 
                    : 'Thêm task mới vào hệ thống quản lý'
                  }
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="text-white text-right">
                <p className="text-sm font-medium">Nguyễn Văn A</p>
                <p className="text-xs opacity-90">WE2024001 - Phòng Marketing</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <div className="text-2xl">💡</div>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">
                Hướng dẫn tạo task
              </h3>
              <div className="mt-2 text-sm text-blue-700">
                <ul className="list-disc list-inside space-y-1">
                  <li>Điền đầy đủ thông tin cần thiết (có dấu *)</li>
                  <li>Chọn người được giao việc phù hợp</li>
                  <li>Đặt hạn chót thực tế và khả thi</li>
                  <li>Sử dụng tags để dễ dàng tìm kiếm sau này</li>
                  <li>Ước tính thời gian giúp theo dõi hiệu quả</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Templates */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">📋 Templates nhanh</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-all">
              <div className="text-center">
                <div className="text-2xl mb-2">🚀</div>
                <h3 className="font-medium text-gray-900">Development Task</h3>
                <p className="text-sm text-gray-600 mt-1">Template cho công việc phát triển</p>
              </div>
            </div>
            
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-all">
              <div className="text-center">
                <div className="text-2xl mb-2">🎨</div>
                <h3 className="font-medium text-gray-900">Design Task</h3>
                <p className="text-sm text-gray-600 mt-1">Template cho công việc thiết kế</p>
              </div>
            </div>
            
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-all">
              <div className="text-center">
                <div className="text-2xl mb-2">🔧</div>
                <h3 className="font-medium text-gray-900">Bug Fix</h3>
                <p className="text-sm text-gray-600 mt-1">Template cho sửa lỗi</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Form */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {duplicateId ? 'Thông tin task sao chép' : 'Thông tin task mới'}
              </h2>
              <p className="text-gray-600">
                {duplicateId 
                  ? 'Điều chỉnh thông tin và tạo task mới'
                  : 'Điền đầy đủ thông tin để tạo task'
                }
              </p>
            </div>
            
            {duplicateId && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <div className="flex items-center">
                  <div className="text-yellow-600 mr-2">📋</div>
                  <div className="text-sm">
                    <p className="font-medium text-yellow-800">Sao chép từ task #{duplicateId}</p>
                    <p className="text-yellow-700">Một số thông tin đã được điều chỉnh</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <TaskForm
            task={duplicateTask}
            mode="create"
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={isLoading}
          />
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">❓ Cần hỗ trợ?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Keyboard Shortcuts</h4>
              <div className="space-y-1 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Lưu task</span>
                  <code className="bg-gray-200 px-2 py-1 rounded">Ctrl + S</code>
                </div>
                <div className="flex justify-between">
                  <span>Hủy</span>
                  <code className="bg-gray-200 px-2 py-1 rounded">Esc</code>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Tips</h4>
              <div className="space-y-1 text-sm text-gray-600">
                <p>• Sử dụng @username để mention người khác</p>
                <p>• Tags giúp phân loại và tìm kiếm</p>
                <p>• Ước tính thời gian để theo dõi hiệu quả</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
