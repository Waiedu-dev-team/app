import { Task } from '@/types/task';
import TaskStatusBadge from './TaskStatusBadge';
import TaskPriorityIcon from './TaskPriorityIcon';
import { Button } from '@/components/ui/button';

interface TaskCardProps {
  task: Task;
  isSelected?: boolean;
  onSelect?: (taskId: number) => void;
  onEdit?: (task: Task) => void;
  onView?: (task: Task) => void;
  showActions?: boolean;
}

export default function TaskCard({ 
  task, 
  isSelected = false, 
  onSelect, 
  onEdit, 
  onView,
  showActions = true 
}: TaskCardProps) {
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'done' && task.status !== 'cancelled';

  return (
    <div className={`
      bg-white rounded-lg border-2 p-4 transition-all duration-200 hover:shadow-md
      ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}
      ${isOverdue ? 'border-l-4 border-l-red-500' : ''}
    `}>
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-3 flex-1">
          {onSelect && (
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => onSelect(task.id)}
              className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
          )}
          <div className="flex-1">
            <div className="flex items-start gap-2 mb-1">
              <TaskPriorityIcon priority={task.priority} />
              <h3 className="font-semibold text-gray-900 line-clamp-2 flex-1">
                {task.title}
              </h3>
            </div>
            <p className="text-sm text-gray-600 line-clamp-2 mb-2">
              {task.description}
            </p>
          </div>
        </div>
        <TaskStatusBadge status={task.status} size="sm" />
      </div>

      {/* Progress Bar */}
      {task.progress > 0 && (
        <div className="mb-3">
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>Tiến độ</span>
            <span>{task.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${task.progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Meta Info */}
      <div className="grid grid-cols-2 gap-4 text-xs text-gray-600 mb-3">
        <div>
          <span className="font-medium">Giao cho:</span>
          <p className="truncate">{task.assignedTo}</p>
        </div>
        <div>
          <span className="font-medium">Hạn chót:</span>
          <p className={isOverdue ? 'text-red-600 font-medium' : ''}>
            {formatDate(task.dueDate)}
            {isOverdue && ' (Quá hạn)'}
          </p>
        </div>
      </div>

      {/* Tags */}
      {task.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {task.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
          {task.tags.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
              +{task.tags.length - 3}
            </span>
          )}
        </div>
      )}

      {/* Actions */}
      {showActions && (
        <div className="flex justify-end gap-2">
          {onView && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onView(task)}
              className="text-xs"
            >
              Xem
            </Button>
          )}
          {onEdit && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(task)}
              className="text-xs"
            >
              Sửa
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
