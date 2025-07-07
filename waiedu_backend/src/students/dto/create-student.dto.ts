import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUUID, IsOptional, IsDateString, IsEnum } from 'class-validator';
import { Gender } from '../entities/student.entity';

export class CreateStudentDto {
  @ApiProperty({
    example: 'Trần Văn An',
    description: 'Họ và tên đầy đủ của học sinh'
  })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({
    example: '2010-05-20',
    description: 'Ngày sinh (định dạng YYYY-MM-DD)',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  dateOfBirth?: Date;

  @ApiProperty({
    example: Gender.MALE,
    description: 'Giới tính',
    enum: Gender,
    required: false,
  })
  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @ApiProperty({
    example: 'class-1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
    description: 'ID của lớp học mà học sinh sẽ tham gia'
  })
  @IsUUID()
  @IsNotEmpty()
  classId: string;
} 