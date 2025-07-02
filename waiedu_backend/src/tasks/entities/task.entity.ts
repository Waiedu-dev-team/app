import { ApiProperty } from "@nestjs/swagger";

export class Task {
  @ApiProperty({ example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef', description: 'ID duy nhất của công việc' })
  id: string;

  @ApiProperty({ example: 'Thiết kế lại trang chủ', description: 'Tiêu đề của công việc' })
  title: string;

  @ApiProperty({ example: 'in_progress', description: 'Trạng thái công việc', enum: ['todo', 'in_progress', 'done', 'cancelled'] })
  status: 'todo' | 'in_progress' | 'done' | 'cancelled';
  
  @ApiProperty({ example: 'normal', description: 'Độ ưu tiên', enum: ['low', 'normal', 'high', 'urgent'] })
  priority: 'low' | 'normal' | 'high' | 'urgent';
  
  @ApiProperty({ example: '2025-12-31T17:00:00.000Z', description: 'Hạn chót hoàn thành' })
  dueDate: Date;

  @ApiProperty({ example: 80, description: 'Tiến độ công việc (0-100)' })
  progress: number;

  @ApiProperty({ example: 'Nguyễn Văn A', description: 'Người được giao' })
  assignedTo: string;

  @ApiProperty({ example: 'Frontend', description: 'Danh mục công việc' })
  category: string;
} 