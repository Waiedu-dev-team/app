import { ApiProperty } from '@nestjs/swagger';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export class Student {
  @ApiProperty({
    example: 'stud-1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
    description: 'ID duy nhất của học sinh'
  })
  id: string;

  @ApiProperty({
    example: 'Trần Văn An',
    description: 'Họ và tên đầy đủ của học sinh'
  })
  fullName: string;

  @ApiProperty({
    example: '2010-05-20',
    description: 'Ngày sinh',
    type: 'string',
    format: 'date',
    required: false,
  })
  dateOfBirth?: Date;

  @ApiProperty({
    example: Gender.MALE,
    description: 'Giới tính',
    enum: Gender,
    required: false,
  })
  gender?: Gender;

  @ApiProperty({
    example: 'class-1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
    description: 'ID của lớp học mà học sinh thuộc về'
  })
  classId: string;
  
  @ApiProperty({
    description: 'Thời gian tạo hồ sơ'
  })
  createdAt: Date;
} 