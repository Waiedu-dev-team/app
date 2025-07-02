import { ApiProperty } from '@nestjs/swagger';
import { UserRole, Department } from '../dto/create-user.dto';

export class User {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'ID duy nhất của người dùng'
  })
  id: string;

  @ApiProperty({
    example: 'user@waiedu.com',
    description: 'Email của người dùng'
  })
  email: string;

  @ApiProperty({
    example: 'Nguyễn Văn A',
    description: 'Họ và tên đầy đủ'
  })
  fullName: string;

  @ApiProperty({
    example: Department.IT,
    description: 'Phòng ban làm việc',
    enum: Department
  })
  department: Department;

  @ApiProperty({
    example: UserRole.STAFF,
    description: 'Vai trò trong hệ thống',
    enum: UserRole
  })
  role: UserRole;

  @ApiProperty({
    example: '2024-01-07T12:00:00.000Z',
    description: 'Thời gian tạo tài khoản'
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-01-07T12:00:00.000Z',
    description: 'Thời gian cập nhật cuối cùng'
  })
  updatedAt: Date;

  // Không export password ra response
  password?: string;
} 