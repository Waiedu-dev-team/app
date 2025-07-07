import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, IsOptional, IsArray, IsUUID, MinLength } from 'class-validator';

export class CreateTeacherDto {
  @ApiProperty({
    example: 'Lê Thị Giảng Viên',
    description: 'Họ và tên đầy đủ của giáo viên',
    type: String
  })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({
    example: 'giang.vien.le@example.com',
    description: 'Email của giáo viên',
    type: String
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'Mật khẩu đăng nhập cho tài khoản giáo viên (tối thiểu 6 ký tự)',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({
    example: ['Toán học', 'Vật lý'],
    description: 'Danh sách các môn chuyên ngành',
    type: [String],
    required: false
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  subjectSpecialization?: string[];
  
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'ID của khách hàng sở hữu giáo viên này'
  })
  @IsUUID()
  @IsNotEmpty()
  customerId: string;
} 