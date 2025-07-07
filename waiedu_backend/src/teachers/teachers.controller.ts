import { Controller, Get, Post, Body, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { Teacher } from './entities/teacher.entity';

@ApiTags('👩‍🏫 Teachers - Quản lý Giáo viên')
@Controller('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo hồ sơ giáo viên mới' })
  @ApiBody({ type: CreateTeacherDto })
  @ApiResponse({ status: 201, description: 'Giáo viên đã được tạo.', type: Teacher })
  @ApiResponse({ status: 404, description: 'Không tìm thấy khách hàng.' })
  @ApiResponse({ status: 409, description: 'Email giáo viên đã tồn tại.' })
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  create(@Body() createTeacherDto: CreateTeacherDto) {
    return this.teachersService.create(createTeacherDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách tất cả giáo viên' })
  @ApiResponse({ status: 200, description: 'Danh sách giáo viên.', type: [Teacher] })
  findAll() {
    return this.teachersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin giáo viên theo ID' })
  @ApiResponse({ status: 200, description: 'Thông tin chi tiết giáo viên.', type: Teacher })
  @ApiResponse({ status: 404, description: 'Không tìm thấy giáo viên.' })
  findOne(@Param('id') id: string) {
    return this.teachersService.findOne(id);
  }
} 