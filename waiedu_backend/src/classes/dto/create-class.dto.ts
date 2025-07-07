import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail, IsOptional, IsNumber, Min, Max, IsUUID } from 'class-validator';

export class CreateClassDto {
  @ApiProperty({
    example: 'Lớp 10A1',
    description: 'Tên lớp học',
    type: String
  })
  @IsString({ message: 'Tên lớp học phải là chuỗi ký tự' })
  @IsNotEmpty({ message: 'Tên lớp học không được để trống' })
  className: string;

  @ApiProperty({
    example: 'subj-default-toan',
    description: 'ID của môn học'
  })
  @IsString()
  @IsNotEmpty({ message: 'Vui lòng chọn môn học' })
  subjectId: string;

  @ApiProperty({
    example: 'd9b7f5b0-5b9a-4b9c-8b9a-5b9a4b9c8b9a',
    description: 'ID của giáo viên đứng lớp'
  })
  @IsUUID()
  @IsNotEmpty({ message: 'Vui lòng chọn giáo viên' })
  teacherId: string;

  @ApiProperty({
    example: 'Lớp học toán nâng cao dành cho học sinh khá giỏi',
    description: 'Mô tả lớp học',
    type: String,
    required: false
  })
  @IsOptional()
  @IsString({ message: 'Mô tả phải là chuỗi ký tự' })
  description?: string;

  @ApiProperty({
    example: 'Thứ 2,4,6 - 7:00-9:00',
    description: 'Lịch học',
    type: String,
    required: false
  })
  @IsOptional()
  @IsString({ message: 'Lịch học phải là chuỗi ký tự' })
  schedule?: string;

  @ApiProperty({
    example: 30,
    description: 'Số học sinh tối đa (từ 1 đến 100)',
    type: Number,
    minimum: 1,
    maximum: 100,
    default: 30
  })
  @IsOptional()
  @IsNumber({}, { message: 'Số học sinh tối đa phải là số' })
  @Min(1, { message: 'Số học sinh tối đa phải ít nhất là 1' })
  @Max(100, { message: 'Số học sinh tối đa không được quá 100' })
  maxStudents?: number;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'ID của khách hàng tạo lớp học',
    type: String
  })
  @IsString({ message: 'Customer ID phải là chuỗi ký tự' })
  @IsNotEmpty({ message: 'Customer ID không được để trống' })
  customerId: string;
} 