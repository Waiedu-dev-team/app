import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Param, 
  HttpStatus,
  ValidationPipe,
  UsePipes
} from '@nestjs/common';
import { 
  ApiTags, 
  ApiOperation, 
  ApiResponse, 
  ApiBody, 
  ApiParam,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiConflictResponse
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@ApiTags('👥 Users Management')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ 
    summary: '🆕 Tạo tài khoản mới',
    description: 'Endpoint để tạo tài khoản người dùng mới trong hệ thống với đầy đủ thông tin cá nhân và phân quyền.'
  })
  @ApiBody({ 
    type: CreateUserDto,
    description: 'Thông tin cần thiết để tạo tài khoản mới',
    examples: {
      'Nhân viên IT': {
        summary: 'Tạo tài khoản nhân viên IT',
        value: {
          email: 'developer@waiedu.com',
          password: 'password123',
          fullName: 'Nguyễn Văn Dev',
          department: 'IT',
          role: 'staff'
        }
      },
      'Quản lý HR': {
        summary: 'Tạo tài khoản quản lý nhân sự',
        value: {
          email: 'hr.manager@waiedu.com',
          password: 'securepass456',
          fullName: 'Trần Thị Manager',
          department: 'HR',
          role: 'manager'
        }
      }
    }
  })
  @ApiCreatedResponse({ 
    description: '✅ Tài khoản được tạo thành công',
    type: User,
    example: {
      id: '550e8400-e29b-41d4-a716-446655440000',
      email: 'user@waiedu.com',
      fullName: 'Nguyễn Văn A',
      department: 'IT',
      role: 'staff',
      createdAt: '2024-01-07T12:00:00.000Z',
      updatedAt: '2024-01-07T12:00:00.000Z'
    }
  })
  @ApiBadRequestResponse({ 
    description: '❌ Dữ liệu đầu vào không hợp lệ',
    example: {
      statusCode: 400,
      message: [
        'Email không hợp lệ',
        'Mật khẩu phải có ít nhất 6 ký tự',
        'Họ tên không được để trống'
      ],
      error: 'Bad Request'
    }
  })
  @ApiConflictResponse({ 
    description: '⚠️ Email đã được sử dụng',
    example: {
      statusCode: 409,
      message: 'Email đã được sử dụng',
      error: 'Conflict'
    }
  })
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ 
    summary: '📋 Lấy danh sách tài khoản',
    description: 'Lấy danh sách tất cả người dùng trong hệ thống (không bao gồm mật khẩu).'
  })
  @ApiResponse({ 
    status: 200, 
    description: '✅ Danh sách người dùng',
    type: [User],
    example: [
      {
        id: '550e8400-e29b-41d4-a716-446655440000',
        email: 'user1@waiedu.com',
        fullName: 'Nguyễn Văn A',
        department: 'IT',
        role: 'staff',
        createdAt: '2024-01-07T12:00:00.000Z',
        updatedAt: '2024-01-07T12:00:00.000Z'
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440001',
        email: 'user2@waiedu.com',
        fullName: 'Trần Thị B',
        department: 'HR',
        role: 'manager',
        createdAt: '2024-01-07T13:00:00.000Z',
        updatedAt: '2024-01-07T13:00:00.000Z'
      }
    ]
  })
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ 
    summary: '🔍 Lấy thông tin tài khoản theo ID',
    description: 'Lấy thông tin chi tiết của một người dùng cụ thể theo ID.'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID của người dùng cần lấy thông tin',
    example: '550e8400-e29b-41d4-a716-446655440000'
  })
  @ApiResponse({ 
    status: 200, 
    description: '✅ Thông tin người dùng',
    type: User
  })
  @ApiResponse({ 
    status: 404, 
    description: '❌ Không tìm thấy người dùng',
    example: {
      statusCode: 404,
      message: 'Không tìm thấy người dùng',
      error: 'Not Found'
    }
  })
  async findOne(@Param('id') id: string): Promise<User> {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new Error('Không tìm thấy người dùng');
    }
    return user;
  }
} 