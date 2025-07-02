import { Task, TaskComment, TaskActivity, TaskAttachment } from '@/types/task';

export const mockTasks: Task[] = [
  {
    id: 1,
    title: 'Thiết kế UI cho trang dashboard mới',
    description: 'Tạo mockup và prototype cho trang dashboard quản lý tasks. Cần responsive design và dark mode support.',
    status: 'in_progress',
    priority: 'high',
    assignedTo: 'Nguyễn Thị B',
    assignedToId: 'user001',
    assignedToEmail: 'nguyenthib@waiedu.com',
    createdBy: 'Trần Văn A',
    createdById: 'user002',
    createdByEmail: 'tranvana@waiedu.com',
    dueDate: '2025-07-05',
    createdAt: '2025-06-25T08:30:00.000Z',
    updatedAt: '2025-06-28T14:20:00.000Z',
    tags: ['ui', 'design', 'dashboard', 'responsive'],
    category: 'design',
    estimatedHours: 16,
    actualHours: 8,
    progress: 50
  },
  {
    id: 2,
    title: 'Triển khai API authentication',
    description: 'Xây dựng hệ thống xác thực JWT với refresh token cho ứng dụng. Bao gồm login, logout, và forgot password.',
    status: 'todo',
    priority: 'urgent',
    assignedTo: 'Lê Văn C',
    assignedToId: 'user003',
    assignedToEmail: 'levanc@waiedu.com',
    createdBy: 'Phạm Thị D',
    createdById: 'user004',
    createdByEmail: 'phamthid@waiedu.com',
    dueDate: '2025-07-01',
    createdAt: '2025-06-26T09:15:00.000Z',
    updatedAt: '2025-06-26T09:15:00.000Z',
    tags: ['backend', 'auth', 'security', 'jwt'],
    category: 'development',
    estimatedHours: 24,
    actualHours: 0,
    progress: 0
  },
  {
    id: 3,
    title: 'Viết test cases cho module payment',
    description: 'Tạo unit tests và integration tests cho các chức năng thanh toán. Coverage tối thiểu 90%.',
    status: 'review',
    priority: 'normal',
    assignedTo: 'Hoàng Văn E',
    assignedToId: 'user005',
    assignedToEmail: 'hoangvane@waiedu.com',
    createdBy: 'Nguyễn Thị F',
    createdById: 'user006',
    createdByEmail: 'nguyenthif@waiedu.com',
    dueDate: '2025-07-10',
    createdAt: '2025-06-20T10:00:00.000Z',
    updatedAt: '2025-06-27T16:45:00.000Z',
    tags: ['testing', 'payment', 'unit-test', 'coverage'],
    category: 'testing',
    estimatedHours: 12,
    actualHours: 10,
    progress: 85
  },
  {
    id: 4,
    title: 'Tối ưu hiệu suất database',
    description: 'Phân tích và tối ưu các câu query chậm. Thêm index và optimize stored procedures.',
    status: 'done',
    priority: 'high',
    assignedTo: 'Vũ Thị G',
    assignedToId: 'user007',
    assignedToEmail: 'vuthig@waiedu.com',
    createdBy: 'Trần Văn H',
    createdById: 'user008',
    createdByEmail: 'tranvanh@waiedu.com',
    dueDate: '2025-06-25',
    createdAt: '2025-06-15T11:30:00.000Z',
    updatedAt: '2025-06-24T17:20:00.000Z',
    tags: ['database', 'performance', 'optimization', 'sql'],
    category: 'development',
    estimatedHours: 20,
    actualHours: 18,
    progress: 100
  },
  {
    id: 5,
    title: 'Tạo tài liệu API documentation',
    description: 'Viết documentation đầy đủ cho tất cả API endpoints. Sử dụng Swagger/OpenAPI format.',
    status: 'in_progress',
    priority: 'normal',
    assignedTo: 'Lương Thị I',
    assignedToId: 'user009',
    assignedToEmail: 'luongthii@waiedu.com',
    createdBy: 'Ngô Văn J',
    createdById: 'user010',
    createdByEmail: 'ngovanj@waiedu.com',
    dueDate: '2025-07-15',
    createdAt: '2025-06-22T13:45:00.000Z',
    updatedAt: '2025-06-28T09:30:00.000Z',
    tags: ['documentation', 'api', 'swagger', 'openapi'],
    category: 'documentation',
    estimatedHours: 14,
    actualHours: 6,
    progress: 30
  },
  {
    id: 6,
    title: 'Nghiên cứu công nghệ AI mới',
    description: 'Tìm hiểu và đánh giá khả năng áp dụng GPT-4 và Claude AI vào sản phẩm hiện tại.',
    status: 'todo',
    priority: 'low',
    assignedTo: 'Đặng Văn K',
    assignedToId: 'user011',
    assignedToEmail: 'dangvank@waiedu.com',
    createdBy: 'Mai Thị L',
    createdById: 'user012',
    createdByEmail: 'maithil@waiedu.com',
    dueDate: '2025-07-20',
    createdAt: '2025-06-28T15:00:00.000Z',
    updatedAt: '2025-06-28T15:00:00.000Z',
    tags: ['research', 'ai', 'gpt', 'innovation'],
    category: 'research',
    estimatedHours: 40,
    actualHours: 0,
    progress: 0
  },
  {
    id: 7,
    title: 'Sửa lỗi responsive trên mobile',
    description: 'Khắc phục các vấn đề hiển thị trên mobile devices. Priority: iPhone Safari và Chrome Android.',
    status: 'cancelled',
    priority: 'normal',
    assignedTo: 'Bùi Thị M',
    assignedToId: 'user013',
    assignedToEmail: 'buithim@waiedu.com',
    createdBy: 'Võ Văn N',
    createdById: 'user014',
    createdByEmail: 'vovann@waiedu.com',
    dueDate: '2025-06-20',
    createdAt: '2025-06-10T08:00:00.000Z',
    updatedAt: '2025-06-18T12:30:00.000Z',
    tags: ['frontend', 'mobile', 'responsive', 'bugfix'],
    category: 'development',
    estimatedHours: 8,
    actualHours: 3,
    progress: 25
  },
  {
    id: 8,
    title: 'Họp review sprint planning',
    description: 'Cuộc họp đánh giá kết quả sprint hiện tại và lập kế hoạch cho sprint tiếp theo.',
    status: 'todo',
    priority: 'normal',
    assignedTo: 'Toàn Team Dev',
    assignedToId: 'team001',
    assignedToEmail: 'team@waiedu.com',
    createdBy: 'Scrum Master',
    createdById: 'user015',
    createdByEmail: 'scrum@waiedu.com',
    dueDate: '2025-06-30',
    createdAt: '2025-06-28T16:00:00.000Z',
    updatedAt: '2025-06-28T16:00:00.000Z',
    tags: ['meeting', 'sprint', 'planning', 'agile'],
    category: 'meeting',
    estimatedHours: 2,
    actualHours: 0,
    progress: 0
  },
  {
    id: 9,
    title: 'Cập nhật content marketing Q3',
    description: 'Lên kế hoạch content marketing cho quý 3, bao gồm blog posts, social media, và email campaigns.',
    status: 'in_progress',
    priority: 'high',
    assignedTo: 'Nguyễn Marketing',
    assignedToId: 'user016',
    assignedToEmail: 'marketing@waiedu.com',
    createdBy: 'Head of Marketing',
    createdById: 'user017',
    createdByEmail: 'headmarketing@waiedu.com',
    dueDate: '2025-07-02',
    createdAt: '2025-06-24T10:30:00.000Z',
    updatedAt: '2025-06-27T14:15:00.000Z',
    tags: ['marketing', 'content', 'social-media', 'strategy'],
    category: 'marketing',
    estimatedHours: 16,
    actualHours: 8,
    progress: 40
  },
  {
    id: 10,
    title: 'Training team về Docker & Kubernetes',
    description: 'Tổ chức workshop về containerization và orchestration cho team development.',
    status: 'todo',
    priority: 'low',
    assignedTo: 'DevOps Engineer',
    assignedToId: 'user018',
    assignedToEmail: 'devops@waiedu.com',
    createdBy: 'Technical Lead',
    createdById: 'user019',
    createdByEmail: 'techlead@waiedu.com',
    dueDate: '2025-07-25',
    createdAt: '2025-06-27T09:00:00.000Z',
    updatedAt: '2025-06-27T09:00:00.000Z',
    tags: ['training', 'docker', 'kubernetes', 'devops'],
    category: 'training',
    estimatedHours: 8,
    actualHours: 0,
    progress: 0
  }
];

// Mock data cho assignees (người được giao việc)
export const mockAssignees = [
  { id: 'user001', name: 'Nguyễn Thị B', email: 'nguyenthib@waiedu.com', department: 'Design' },
  { id: 'user003', name: 'Lê Văn C', email: 'levanc@waiedu.com', department: 'Development' },
  { id: 'user005', name: 'Hoàng Văn E', email: 'hoangvane@waiedu.com', department: 'QA' },
  { id: 'user007', name: 'Vũ Thị G', email: 'vuthig@waiedu.com', department: 'Development' },
  { id: 'user009', name: 'Lương Thị I', email: 'luongthii@waiedu.com', department: 'Documentation' },
  { id: 'user011', name: 'Đặng Văn K', email: 'dangvank@waiedu.com', department: 'Research' },
  { id: 'user013', name: 'Bùi Thị M', email: 'buithim@waiedu.com', department: 'Frontend' },
  { id: 'user016', name: 'Nguyễn Marketing', email: 'marketing@waiedu.com', department: 'Marketing' },
  { id: 'user018', name: 'DevOps Engineer', email: 'devops@waiedu.com', department: 'DevOps' },
  { id: 'team001', name: 'Toàn Team Dev', email: 'team@waiedu.com', department: 'Development' }
];

// Mock data cho comments
export const mockTaskComments: Record<number, TaskComment[]> = {
  1: [ // Task ID 1
    {
      id: 1,
      taskId: 1,
      userId: 'user002',
      userName: 'Trần Văn A',
      userEmail: 'tranvana@waiedu.com',
      content: 'Mockup đã gần hoàn thành. Hiện tại đang focus vào responsive design cho tablet.',
      createdAt: '2025-06-28T14:20:00.000Z'
    },
    {
      id: 2,
      taskId: 1,
      userId: 'user001',
      userName: 'Nguyễn Thị B',
      userEmail: 'nguyenthib@waiedu.com',
      content: 'Cảm ơn anh! Em sẽ update progress lên 60% sau khi test xong trên các device.',
      createdAt: '2025-06-28T15:30:00.000Z'
    }
  ],
  2: [ // Task ID 2
    {
      id: 3,
      taskId: 2,
      userId: 'user004',
      userName: 'Phạm Thị D',
      userEmail: 'phamthid@waiedu.com',
      content: 'Task này cần ưu tiên cao vì ảnh hưởng đến deadline của project. @levanc có cần support không?',
      createdAt: '2025-06-26T10:00:00.000Z'
    }
  ],
  3: [ // Task ID 3
    {
      id: 4,
      taskId: 3,
      userId: 'user006',
      userName: 'Nguyễn Thị F',
      userEmail: 'nguyenthif@waiedu.com',
      content: 'Coverage hiện tại đã đạt 88%. Còn 2 edge cases nữa là đủ 90%.',
      createdAt: '2025-06-27T16:45:00.000Z'
    },
    {
      id: 5,
      taskId: 3,
      userId: 'user005',
      userName: 'Hoàng Văn E',
      userEmail: 'hoangvane@waiedu.com',
      content: 'Đã submit PR. Mọi người review giúp em nhé!',
      createdAt: '2025-06-27T17:00:00.000Z'
    }
  ]
};

// Mock data cho activities
export const mockTaskActivities: Record<number, TaskActivity[]> = {
  1: [ // Task ID 1
    {
      id: 1,
      taskId: 1,
      userId: 'user002',
      userName: 'Trần Văn A',
      action: 'created' as const,
      description: 'đã tạo task này',
      createdAt: '2025-06-25T08:30:00.000Z'
    },
    {
      id: 2,
      taskId: 1,
      userId: 'user002',
      userName: 'Trần Văn A',
      action: 'assigned' as const,
      description: 'đã giao task cho Nguyễn Thị B',
      createdAt: '2025-06-25T08:35:00.000Z'
    },
    {
      id: 3,
      taskId: 1,
      userId: 'user001',
      userName: 'Nguyễn Thị B',
      action: 'status_changed' as const,
      oldValue: 'todo',
      newValue: 'in_progress',
      description: 'đã chuyển trạng thái từ "Chờ thực hiện" sang "Đang thực hiện"',
      createdAt: '2025-06-26T09:00:00.000Z'
    },
    {
      id: 4,
      taskId: 1,
      userId: 'user001',
      userName: 'Nguyễn Thị B',
      action: 'updated' as const,
      description: 'đã cập nhật tiến độ lên 50%',
      createdAt: '2025-06-28T14:20:00.000Z'
    }
  ],
  2: [ // Task ID 2
    {
      id: 5,
      taskId: 2,
      userId: 'user004',
      userName: 'Phạm Thị D',
      action: 'created' as const,
      description: 'đã tạo task này',
      createdAt: '2025-06-26T09:15:00.000Z'
    },
    {
      id: 6,
      taskId: 2,
      userId: 'user004',
      userName: 'Phạm Thị D',
      action: 'assigned' as const,
      description: 'đã giao task cho Lê Văn C',
      createdAt: '2025-06-26T09:16:00.000Z'
    }
  ],
  3: [ // Task ID 3
    {
      id: 7,
      taskId: 3,
      userId: 'user006',
      userName: 'Nguyễn Thị F',
      action: 'created' as const,
      description: 'đã tạo task này',
      createdAt: '2025-06-20T10:00:00.000Z'
    },
    {
      id: 8,
      taskId: 3,
      userId: 'user005',
      userName: 'Hoàng Văn E',
      action: 'status_changed' as const,
      oldValue: 'todo',
      newValue: 'in_progress',
      description: 'đã chuyển trạng thái từ "Chờ thực hiện" sang "Đang thực hiện"',
      createdAt: '2025-06-22T08:00:00.000Z'
    },
    {
      id: 9,
      taskId: 3,
      userId: 'user005',
      userName: 'Hoàng Văn E',
      action: 'status_changed' as const,
      oldValue: 'in_progress',
      newValue: 'review',
      description: 'đã chuyển trạng thái từ "Đang thực hiện" sang "Chờ review"',
      createdAt: '2025-06-27T16:45:00.000Z'
    }
  ]
};

// Mock data cho attachments
export const mockTaskAttachments: Record<number, TaskAttachment[]> = {
  1: [
    {
      id: 1,
      taskId: 1,
      fileName: 'dashboard-mockup-v1.figma',
      fileSize: 2048000, // 2MB
      fileType: 'application/figma',
      uploadedBy: 'Nguyễn Thị B',
      uploadedAt: '2025-06-27T10:30:00.000Z',
      downloadUrl: '#'
    },
    {
      id: 2,
      taskId: 1,
      fileName: 'responsive-specs.pdf',
      fileSize: 512000, // 512KB
      fileType: 'application/pdf',
      uploadedBy: 'Nguyễn Thị B',
      uploadedAt: '2025-06-28T09:15:00.000Z',
      downloadUrl: '#'
    }
  ],
  3: [
    {
      id: 3,
      taskId: 3,
      fileName: 'test-coverage-report.html',
      fileSize: 256000, // 256KB
      fileType: 'text/html',
      uploadedBy: 'Hoàng Văn E',
      uploadedAt: '2025-06-27T16:00:00.000Z',
      downloadUrl: '#'
    }
  ]
};
