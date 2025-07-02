import { Injectable } from '@nestjs/common';
import { Task } from './entities/task.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TasksService {
  private readonly tasks: Task[] = [
    {
      id: uuidv4(),
      title: 'Phân tích yêu cầu khách hàng cho dự án X',
      status: 'in_progress',
      priority: 'high',
      dueDate: new Date('2025-07-15'),
      progress: 50,
      assignedTo: 'Nguyễn Văn A',
      category: 'Analysis'
    },
    {
      id: uuidv4(),
      title: 'Viết tài liệu kỹ thuật cho API Gateway',
      status: 'todo',
      priority: 'normal',
      dueDate: new Date('2025-07-20'),
      progress: 10,
      assignedTo: 'Trần Thị B',
      category: 'Documentation'
    },
    {
      id: uuidv4(),
      title: 'Fix bug giao diện trên mobile',
      status: 'done',
      priority: 'high',
      dueDate: new Date('2025-06-30'),
      progress: 100,
      assignedTo: 'Lê Văn C',
      category: 'Bugfix'
    },
    {
        id: uuidv4(),
        title: ' Họp với team Marketing về chiến dịch mới',
        status: 'todo',
        priority: 'low',
        dueDate: new Date('2025-07-10'),
        progress: 0,
        assignedTo: 'Phạm Thị D',
        category: 'Meeting'
    }
  ];

  findAll(): Task[] {
    return this.tasks;
  }
}
