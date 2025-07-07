import { ApiProperty } from '@nestjs/swagger';

export class School {
  @ApiProperty({
    example: 'truong-thpt-chuyen-hanoi-amsterdam',
    description: 'ID duy nhất của trường học (dạng slug)'
  })
  id: string;

  @ApiProperty({
    example: 'Trường THPT Chuyên Hà Nội - Amsterdam',
    description: 'Tên đầy đủ của trường học'
  })
  name: string;

  @ApiProperty({
    example: 'hanoi',
    description: 'Thành phố/Tỉnh'
  })
  city: string;
} 