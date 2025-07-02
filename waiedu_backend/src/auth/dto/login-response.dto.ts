import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';

export class LoginResponseDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'JWT access token để xác thực các request tiếp theo'
  })
  access_token: string;

  @ApiProperty({
    description: 'Thông tin người dùng đã đăng nhập',
    type: User
  })
  user: User;

  @ApiProperty({
    example: 3600,
    description: 'Thời gian sống của token (giây)'
  })
  expires_in: number;

  @ApiProperty({
    example: 'Bearer',
    description: 'Loại token'
  })
  token_type: string;
} 