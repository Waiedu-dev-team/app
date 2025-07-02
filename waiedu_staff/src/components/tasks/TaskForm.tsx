import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Task, TaskStatus, TaskPriority, TASK_STATUSES, TASK_PRIORITIES, TASK_CATEGORIES } from '@/types/task';
import { mockAssignees } from '@/lib/mockTaskData';

interface TaskFormProps {
  task?: Task | null;
  onSubmit: (taskData: Partial<Task>) => void;
  onCancel: () => void;
  isLoading?: boolean;
  mode: 'create' | 'edit';
}

export default function TaskForm({ task, onSubmit, onCancel, isLoading = false, mode }: TaskFormProps) {
  const [formData, setFormData] = useState({
    title: task?.title || '',
    description: task?.description || '',
    status: task?.status || 'todo' as TaskStatus,
    priority: task?.priority || 'normal' as TaskPriority,
    assignedToId: task?.assignedToId || '',
    assignedTo: task?.assignedTo || '',
    assignedToEmail: task?.assignedToEmail || '',
    dueDate: task?.dueDate || '',
    category: task?.category || 'development',
    tags: task?.tags || [],
    estimatedHours: task?.estimatedHours || 0,
    progress: task?.progress || 0
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [newTag, setNewTag] = useState('');

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Tiêu đề là bắt buộc';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Mô tả là bắt buộc';
    }

    if (!formData.assignedToId) {
      newErrors.assignedToId = 'Phải chọn người được giao việc';
    }

    if (!formData.dueDate) {
      newErrors.dueDate = 'Hạn chót là bắt buộc';
    } else {
      const dueDate = new Date(formData.dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (dueDate < today) {
        newErrors.dueDate = 'Hạn chót không thể là quá khứ';
      }
    }

    if (formData.estimatedHours && formData.estimatedHours < 0) {
      newErrors.estimatedHours = 'Thời gian ước tính phải lớn hơn 0';
    }

    if (formData.progress < 0 || formData.progress > 100) {
      newErrors.progress = 'Tiến độ phải từ 0-100%';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Find assignee info
    const assignee = mockAssignees.find(a => a.id === formData.assignedToId);
    
    const taskData = {
      ...formData,
      assignedTo: assignee?.name || '',
      assignedToEmail: assignee?.email || '',
      createdBy: 'Current User', // In real app, get from auth
      createdById: 'current_user',
      createdByEmail: 'current@waiedu.com'
    };

    onSubmit(taskData);
  };

  const handleAssigneeChange = (assigneeId: string) => {
    const assignee = mockAssignees.find(a => a.id === assigneeId);
    setFormData(prev => ({
      ...prev,
      assignedToId: assigneeId,
      assignedTo: assignee?.name || '',
      assignedToEmail: assignee?.email || ''
    }));
    
    if (errors.assignedToId) {
      setErrors(prev => ({ ...prev, assignedToId: '' }));
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tiêu đề <span className="text-red-500">*</span>
        </label>
        <Input
          type="text"
          value={formData.title}
          onChange={(e) => {
            setFormData(prev => ({ ...prev, title: e.target.value }));
            if (errors.title) setErrors(prev => ({ ...prev, title: '' }));
          }}
          placeholder="Nhập tiêu đề task"
          className={errors.title ? 'border-red-500' : ''}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Mô tả <span className="text-red-500">*</span>
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => {
            setFormData(prev => ({ ...prev, description: e.target.value }));
            if (errors.description) setErrors(prev => ({ ...prev, description: '' }));
          }}
          placeholder="Mô tả chi tiết về task"
          rows={4}
          className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none ${
            errors.description ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description}</p>
        )}
      </div>

      {/* Status & Priority */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Trạng thái
          </label>
          <select
            value={formData.status}
            onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as TaskStatus }))}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {Object.entries(TASK_STATUSES).map(([status, config]) => (
              <option key={status} value={status}>
                {config.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Độ ưu tiên
          </label>
          <select
            value={formData.priority}
            onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value as TaskPriority }))}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {Object.entries(TASK_PRIORITIES).map(([priority, config]) => (
              <option key={priority} value={priority}>
                {config.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Assignee */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Giao cho <span className="text-red-500">*</span>
        </label>
        <select
          value={formData.assignedToId}
          onChange={(e) => handleAssigneeChange(e.target.value)}
          className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors.assignedToId ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          <option value="">Chọn người được giao việc</option>
          {mockAssignees.map((assignee) => (
            <option key={assignee.id} value={assignee.id}>
              {assignee.name} - {assignee.department}
            </option>
          ))}
        </select>
        {errors.assignedToId && (
          <p className="mt-1 text-sm text-red-600">{errors.assignedToId}</p>
        )}
      </div>

      {/* Due Date & Category */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hạn chót <span className="text-red-500">*</span>
          </label>
          <Input
            type="date"
            value={formData.dueDate}
            onChange={(e) => {
              setFormData(prev => ({ ...prev, dueDate: e.target.value }));
              if (errors.dueDate) setErrors(prev => ({ ...prev, dueDate: '' }));
            }}
            className={errors.dueDate ? 'border-red-500' : ''}
          />
          {errors.dueDate && (
            <p className="mt-1 text-sm text-red-600">{errors.dueDate}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Danh mục
          </label>
          <select
            value={formData.category}
            onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {TASK_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Estimated Hours & Progress */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Thời gian ước tính (giờ)
          </label>
          <Input
            type="number"
            min="0"
            step="0.5"
            value={formData.estimatedHours}
            onChange={(e) => {
              setFormData(prev => ({ ...prev, estimatedHours: parseFloat(e.target.value) || 0 }));
              if (errors.estimatedHours) setErrors(prev => ({ ...prev, estimatedHours: '' }));
            }}
            placeholder="0"
            className={errors.estimatedHours ? 'border-red-500' : ''}
          />
          {errors.estimatedHours && (
            <p className="mt-1 text-sm text-red-600">{errors.estimatedHours}</p>
          )}
        </div>

        {mode === 'edit' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tiến độ (%)
            </label>
            <Input
              type="number"
              min="0"
              max="100"
              value={formData.progress}
              onChange={(e) => {
                setFormData(prev => ({ ...prev, progress: parseInt(e.target.value) || 0 }));
                if (errors.progress) setErrors(prev => ({ ...prev, progress: '' }));
              }}
              placeholder="0"
              className={errors.progress ? 'border-red-500' : ''}
            />
            {errors.progress && (
              <p className="mt-1 text-sm text-red-600">{errors.progress}</p>
            )}
          </div>
        )}
      </div>

      {/* Tags */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tags
        </label>
        <div className="flex gap-2 mb-2">
          <Input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Thêm tag"
            className="flex-1"
          />
          <Button type="button" variant="outline" onClick={handleAddTag}>
            Thêm
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
            >
              {tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="text-blue-600 hover:text-blue-800"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-6 border-t">
        <Button type="button" variant="outline" onClick={onCancel}>
          Hủy
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Đang xử lý...' : mode === 'create' ? 'Tạo Task' : 'Cập nhật'}
        </Button>
      </div>
    </form>
  );
}
