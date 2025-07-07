import { ApiProperty } from '@nestjs/swagger';

export class Teacher {
  @ApiProperty({
    example: 'd9b7f5b0-5b9a-4b9c-8b9a-5b9a4b9c8b9a',
    description: 'ID duy nhất của giáo viên'
  })
  id: string;

  @ApiProperty({
    example: 'Lê Thị Giảng Viên',
    description: 'Họ và tên đầy đủ của giáo viên'
  })
  fullName: string;

  @ApiProperty({
    example: 'giang.vien.le@example.com',
    description: 'Email của giáo viên (duy nhất trong phạm vi khách hàng)'
  })
  email: string;

  @ApiProperty({
    example: ['Toán học', 'Vật lý'],
    description: 'Danh sách các môn chuyên ngành của giáo viên',
    type: [String],
    required: false,
  })
  subjectSpecialization?: string[];

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'ID của khách hàng sở hữu giáo viên này'
  })
  customerId: string;

  @ApiProperty({
    description: 'Thời gian tạo hồ sơ'
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Thời gian cập nhật cuối cùng'
  })
  updatedAt: Date;
} 