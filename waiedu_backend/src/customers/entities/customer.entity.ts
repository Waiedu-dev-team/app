import { ApiProperty } from '@nestjs/swagger';

export enum BusinessField {
  TECHNOLOGY = 'technology',
  FINANCE = 'finance',
  RETAIL = 'retail',
  MANUFACTURING = 'manufacturing',
  EDUCATION = 'education',
  HEALTHCARE = 'healthcare',
  REAL_ESTATE = 'real_estate',
  TOURISM = 'tourism',
  LOGISTICS = 'logistics',
  OTHER = 'other'
}

export class Customer {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'ID duy nhất của khách hàng'
  })
  id: string;

  @ApiProperty({
    example: 'customer@company.com',
    description: 'Email của khách hàng'
  })
  email: string;

  @ApiProperty({
    example: 'Nguyễn Văn Khách',
    description: 'Họ và tên khách hàng'
  })
  fullName: string;

  @ApiProperty({
    example: 'defaultpassword123',
    description: 'Mật khẩu mặc định'
  })
  defaultPassword: string;

  @ApiProperty({
    example: BusinessField.TECHNOLOGY,
    description: 'Lĩnh vực kinh doanh',
    enum: BusinessField
  })
  field: BusinessField;

  @ApiProperty({
    example: '0123456789',
    description: 'Mã số thuế doanh nghiệp'
  })
  taxCode: string;

  @ApiProperty({
    example: 'hanoi',
    description: 'Thành phố/Tỉnh'
  })
  city: string;

  @ApiProperty({
    example: 'hoankiem',
    description: 'Quận/Huyện'
  })
  district: string;

  @ApiProperty({
    example: 'Trường THPT Chu Văn An',
    description: 'Trường học liên kết (nếu có)',
    required: false
  })
  school?: string;

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

  // Không export hashed password ra response
  password?: string;
} 