import { 
  Controller, 
  Post, 
  Body, 
  HttpCode, 
  HttpStatus,
  ValidationPipe,
  UsePipes,
  Get,
  UseGuards,
  Request
} from '@nestjs/common';
import { 
  ApiTags, 
  ApiOperation, 
  ApiResponse, 
  ApiBody,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiBearerAuth
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { User } from '../users/entities/user.entity';

@ApiTags('🔐 Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ 
    summary: '🔑 Đăng nhập hệ thống',
    description: 'Xác thực người dùng và trả về JWT token để sử dụng cho các API khác.'
  })
  @ApiBody({ 
    type: LoginDto,
    description: 'Thông tin đăng nhập',
    examples: {
      'Nhân viên IT': {
        summary: 'Đăng nhập nhân viên IT',
        value: {
          email: 'developer@waiedu.com',
          password: 'password123'
        }
      },
      'Quản lý HR': {
        summary: 'Đăng nhập quản lý HR',
        value: {
          email: 'hr.manager@waiedu.com',
          password: 'securepass456'
        }
      },
      'Email rút gọn': {
        summary: 'Có thể dùng email không có @waiedu.com',
        value: {
          email: 'developer',
          password: 'password123'
        }
      }
    }
  })
  @ApiResponse({ 
    status: 200, 
    description: '✅ Đăng nhập thành công',
    type: LoginResponseDto,
    example: {
      access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAd2FpZWR1LmNvbSIsInN1YiI6IjU1MGU4NDAwLWUyOWItNDFkNC1hNzE2LTQ0NjY1NTQ0MDAwMCIsInJvbGUiOiJzdGFmZiIsImRlcGFydG1lbnQiOiJJVCIsImlhdCI6MTY0MzY5MjgwMCwiZXhwIjoxNjQzNjk2NDAwfQ.example',
      user: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        email: 'user@waiedu.com',
        fullName: 'Nguyễn Văn A',
        department: 'IT',
        role: 'staff',
        createdAt: '2024-01-07T12:00:00.000Z',
        updatedAt: '2024-01-07T12:00:00.000Z'
      },
      expires_in: 3600,
      token_type: 'Bearer'
    }
  })
  @ApiBadRequestResponse({ 
    description: '❌ Dữ liệu đầu vào không hợp lệ',
    example: {
      statusCode: 400,
      message: [
        'Email không hợp lệ',
        'Mật khẩu không được để trống'
      ],
      error: 'Bad Request'
    }
  })
  @ApiUnauthorizedResponse({ 
    description: '🚫 Email hoặc mật khẩu không chính xác',
    example: {
      statusCode: 401,
      message: 'Email hoặc mật khẩu không chính xác',
      error: 'Unauthorized'
    }
  })
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    return this.authService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiBearerAuth()
  @ApiOperation({
    summary: '👤 Lấy thông tin người dùng hiện tại',
    description: 'Trả về thông tin chi tiết của người dùng đã được xác thực qua JWT token.'
  })
  @ApiResponse({
    status: 200,
    description: '✅ Thông tin người dùng',
    type: User,
  })
  @ApiUnauthorizedResponse({ description: '🚫 Không có quyền truy cập' })
  getProfile(@Request() req) {
    // req.user được thêm vào từ JwtStrategy sau khi xác thực token
    return req.user;
  }
} 