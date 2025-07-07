import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateSubjectDto {
  @ApiProperty({
    example: 'Toán học',
    description: 'Tên môn học',
    type: String
  })
  @IsString()
  @IsNotEmpty()
  name: string;
  
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'ID của khách hàng sở hữu môn học này'
  })
  @IsUUID()
  @IsNotEmpty()
  customerId: string;
} 