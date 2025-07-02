import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength, IsEnum } from 'class-validator';

export enum UserRole {
  ADMIN = 'admin',
  MANAGER = 'manager',
  STAFF = 'staff',
  USER = 'user',
  CUSTOMER = 'customer'
}

export enum Department {
  IT = 'IT',
  HR = 'HR', 
  FINANCE = 'Finance',
  MARKETING = 'Marketing',
  OPERATIONS = 'Operations',
  SALES = 'Sales'
}

export class CreateUserDto {
  @ApiProperty({
    example: 'user@waiedu.com',
    description: 'Email của người dùng',
    type: String
  })
  @IsEmail({}, { message: 'Email không hợp lệ' })
  @IsNotEmpty({ message: 'Email không được để trống' })
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'Mật khẩu (tối thiểu 6 ký tự)',
    minLength: 6,
    type: String
  })
  @IsString({ message: 'Mật khẩu phải là chuỗi ký tự' })
  @MinLength(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  password: string;

  @ApiProperty({
    example: 'Nguyễn Văn A',
    description: 'Họ và tên đầy đủ',
    type: String
  })
  @IsString({ message: 'Họ tên phải là chuỗi ký tự' })
  @IsNotEmpty({ message: 'Họ tên không được để trống' })
  fullName: string;

  @ApiProperty({
    example: Department.IT,
    description: 'Phòng ban làm việc',
    enum: Department,
    enumName: 'Department'
  })
  @IsEnum(Department, { message: 'Phòng ban không hợp lệ' })
  @IsNotEmpty({ message: 'Phòng ban không được để trống' })
  department: Department;

  @ApiProperty({
    example: UserRole.STAFF,
    description: 'Vai trò trong hệ thống',
    enum: UserRole,
    enumName: 'UserRole'
  })
  @IsEnum(UserRole, { message: 'Vai trò không hợp lệ' })
  @IsNotEmpty({ message: 'Vai trò không được để trống' })
  role: UserRole;
} 