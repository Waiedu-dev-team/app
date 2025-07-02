import { ApiProperty } from '@nestjs/swagger';

export class Class {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'ID duy nhất của lớp học'
  })
  id: string;

  @ApiProperty({
    example: 'Lớp 10A1',
    description: 'Tên lớp học'
  })
  className: string;

  @ApiProperty({
    example: 'Toán học',
    description: 'Môn học'
  })
  subject: string;

  @ApiProperty({
    example: 'Nguyễn Văn Giáo',
    description: 'Tên giáo viên đứng lớp'
  })
  teacherName: string;

  @ApiProperty({
    example: 'teacher@school.edu.vn',
    description: 'Email giáo viên',
    required: false
  })
  teacherEmail?: string;

  @ApiProperty({
    example: 'Lớp học toán nâng cao dành cho học sinh khá giỏi',
    description: 'Mô tả lớp học',
    required: false
  })
  description?: string;

  @ApiProperty({
    example: 'Thứ 2,4,6 - 7:00-9:00',
    description: 'Lịch học',
    required: false
  })
  schedule?: string;

  @ApiProperty({
    example: 30,
    description: 'Số học sinh tối đa',
    default: 30
  })
  maxStudents: number;

  @ApiProperty({
    example: 0,
    description: 'Số học sinh hiện tại',
    default: 0
  })
  currentStudents: number;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'ID của khách hàng tạo lớp học'
  })
  customerId: string;

  @ApiProperty({
    example: '2024-01-07T12:00:00.000Z',
    description: 'Thời gian tạo lớp học'
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-01-07T12:00:00.000Z',
    description: 'Thời gian cập nhật cuối cùng'
  })
  updatedAt: Date;
} 