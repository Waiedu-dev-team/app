export interface Task {
  id: number;
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'review' | 'done' | 'cancelled';
  priority: 'low' | 'normal' | 'high' | 'urgent';
  assignedTo: string;
  assignedToId: string;
  assignedToEmail: string;
  createdBy: string;
  createdById: string;
  createdByEmail: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  category: string;
  estimatedHours?: number;
  actualHours?: number;
  progress: number; // 0-100%
  isOverdue?: boolean;
}

export interface TaskComment {
  id: number;
  taskId: number;
  userId: string;
  userName: string;
  userEmail: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
}

export interface TaskAttachment {
  id: number;
  taskId: number;
  fileName: string;
  fileSize: number;
  fileType: string;
  uploadedBy: string;
  uploadedAt: string;
  downloadUrl: string;
}

export interface TaskActivity {
  id: number;
  taskId: number;
  userId: string;
  userName: string;
  action: 'created' | 'updated' | 'status_changed' | 'assigned' | 'commented' | 'attached_file';
  oldValue?: string;
  newValue?: string;
  description: string;
  createdAt: string;
}

export const TASK_STATUSES = {
  todo: { 
    label: 'Chờ thực hiện', 
    color: 'bg-gray-100 text-gray-800', 
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-200'
  },
  in_progress: { 
    label: 'Đang thực hiện', 
    color: 'bg-blue-100 text-blue-800', 
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200'
  },
  review: { 
    label: 'Chờ review', 
    color: 'bg-yellow-100 text-yellow-800', 
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200'
  },
  done: { 
    label: 'Hoàn thành', 
    color: 'bg-green-100 text-green-800', 
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200'
  },
  cancelled: { 
    label: 'Đã hủy', 
    color: 'bg-red-100 text-red-800', 
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200'
  }
} as const;

export const TASK_PRIORITIES = {
  low: { 
    label: 'Thấp', 
    color: 'bg-gray-100 text-gray-800', 
    order: 1
  },
  normal: { 
    label: 'Bình thường', 
    color: 'bg-blue-100 text-blue-800', 
    order: 2
  },
  high: { 
    label: 'Cao', 
    color: 'bg-orange-100 text-orange-800', 
    order: 3
  },
  urgent: { 
    label: 'Khẩn cấp', 
    color: 'bg-red-100 text-red-800', 
    order: 4
  }
} as const;

export const TASK_CATEGORIES = [
  'development',
  'design', 
  'marketing',
  'support',
  'management',
  'research',
  'testing',
  'documentation',
  'meeting',
  'training'
] as const;

export type TaskStatus = keyof typeof TASK_STATUSES;
export type TaskPriority = keyof typeof TASK_PRIORITIES;
export type TaskCategory = typeof TASK_CATEGORIES[number];
