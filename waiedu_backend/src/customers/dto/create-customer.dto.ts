import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength, IsEnum, IsOptional } from 'class-validator';
import { BusinessField } from '../entities/customer.entity';

export class CreateCustomerDto {
  @ApiProperty({
    example: 'customer@company.com',
    description: 'Email của khách hàng',
    type: String
  })
  @IsEmail({}, { message: 'Email không hợp lệ' })
  @IsNotEmpty({ message: 'Email không được để trống' })
  email: string;

  @ApiProperty({
    example: 'Nguyễn Văn Khách',
    description: 'Họ và tên khách hàng',
    type: String
  })
  @IsString({ message: 'Họ tên phải là chuỗi ký tự' })
  @IsNotEmpty({ message: 'Họ tên không được để trống' })
  fullName: string;

  @ApiProperty({
    example: 'defaultpass123',
    description: 'Mật khẩu mặc định (tối thiểu 6 ký tự)',
    minLength: 6,
    type: String
  })
  @IsString({ message: 'Mật khẩu phải là chuỗi ký tự' })
  @MinLength(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  defaultPassword: string;

  @ApiProperty({
    example: BusinessField.TECHNOLOGY,
    description: 'Lĩnh vực kinh doanh',
    enum: BusinessField,
    enumName: 'BusinessField'
  })
  @IsEnum(BusinessField, { message: 'Lĩnh vực kinh doanh không hợp lệ' })
  @IsNotEmpty({ message: 'Lĩnh vực kinh doanh không được để trống' })
  field: BusinessField;

  @ApiProperty({
    example: '0123456789',
    description: 'Mã số thuế doanh nghiệp',
    type: String
  })
  @IsString({ message: 'Mã số thuế phải là chuỗi ký tự' })
  @IsNotEmpty({ message: 'Mã số thuế không được để trống' })
  taxCode: string;

  @ApiProperty({
    example: 'hanoi',
    description: 'Thành phố/Tỉnh',
    type: String
  })
  @IsString({ message: 'Thành phố phải là chuỗi ký tự' })
  @IsNotEmpty({ message: 'Thành phố không được để trống' })
  city: string;

  @ApiProperty({
    example: 'hoankiem',
    description: 'Quận/Huyện',
    type: String
  })
  @IsString({ message: 'Quận/Huyện phải là chuỗi ký tự' })
  @IsNotEmpty({ message: 'Quận/Huyện không được để trống' })
  district: string;

  @ApiProperty({
    example: 'Trường THPT Chu Văn An',
    description: 'Trường học của khách hàng (không bắt buộc)',
    type: String,
    required: false
  })
  @IsOptional()
  @IsString({ message: 'Tên trường học phải là chuỗi ký tự' })
  school?: string;
} 