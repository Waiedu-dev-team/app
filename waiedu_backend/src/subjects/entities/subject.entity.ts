import { ApiProperty } from '@nestjs/swagger';

export class Subject {
  @ApiProperty({
    example: 'subj-1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
    description: 'ID duy nhất của môn học'
  })
  id: string;

  @ApiProperty({
    example: 'Toán học',
    description: 'Tên môn học'
  })
  name: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'ID của khách hàng sở hữu môn học này'
  })
  customerId: string;
} 