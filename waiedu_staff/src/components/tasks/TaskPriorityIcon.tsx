import { TASK_PRIORITIES, type TaskPriority } from '@/types/task';

interface TaskPriorityIconProps {
  priority: TaskPriority;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const PriorityIcons = {
  low: (
    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  ),
  normal: (
    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
  ),
  high: (
    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
    </svg>
  ),
  urgent: (
    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
  )
};

export default function TaskPriorityIcon({ priority, showLabel = false, size = 'md' }: TaskPriorityIconProps) {
  const priorityConfig = TASK_PRIORITIES[priority];
  
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  if (showLabel) {
    return (
      <span className={`
        inline-flex items-center gap-1.5 rounded-full font-medium border
        ${priorityConfig.color}
        ${priority === 'low' ? 'border-gray-200' : ''}
        ${priority === 'normal' ? 'border-blue-200' : ''}
        ${priority === 'high' ? 'border-orange-200' : ''}
        ${priority === 'urgent' ? 'border-red-200' : ''}
        ${sizeClasses[size]}
      `}>
        {PriorityIcons[priority]}
        {priorityConfig.label}
      </span>
    );
  }

  return (
    <span 
      className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${priorityConfig.color} border ${
        priority === 'low' ? 'border-gray-200' : 
        priority === 'normal' ? 'border-blue-200' : 
        priority === 'high' ? 'border-orange-200' : 
        'border-red-200'
      }`}
      title={`Độ ưu tiên: ${priorityConfig.label}`}
    >
      {PriorityIcons[priority]}
    </span>
  );
}
