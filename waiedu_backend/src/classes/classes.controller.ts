import { Controller, Get, Post, Body, Param, ValidationPipe, UsePipes } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { ClassesService } from './classes.service';
import { CreateClassDto } from './dto/create-class.dto';
import { Class } from './entities/class.entity';

@ApiTags('Classes - Quản lý lớp học')
@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  /**
   * Tạo lớp học mới
   */
  @Post()
  @ApiOperation({ 
    summary: 'Tạo lớp học mới',
    description: 'Tạo lớp học mới với thông tin chi tiết'
  })
  @ApiBody({
    type: CreateClassDto,
    description: 'Thông tin lớp học cần tạo',
    examples: {
      'Lớp Toán': {
        value: {
          className: 'Lớp 10A1',
          subject: 'Toán học',
          teacherName: 'Nguyễn Văn Giáo',
          teacherEmail: 'teacher@school.edu.vn',
          description: 'Lớp học toán nâng cao',
          schedule: 'Thứ 2,4,6 - 7:00-9:00',
          maxStudents: 30,
          customerId: '550e8400-e29b-41d4-a716-446655440000'
        }
      }
    }
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Lớp học đã được tạo thành công',
    type: Class
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Dữ liệu không hợp lệ' 
  })
  @ApiResponse({ 
    status: 409, 
    description: 'Tên lớp đã tồn tại cho khách hàng này' 
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createClassDto: CreateClassDto): Promise<Class> {
    return this.classesService.create(createClassDto);
  }

  /**
   * Lấy tất cả lớp học
   */
  @Get()
  @ApiOperation({ 
    summary: 'Lấy danh sách tất cả lớp học',
    description: 'Lấy danh sách tất cả lớp học trong hệ thống'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Danh sách lớp học',
    type: [Class]
  })
  async findAll(): Promise<Class[]> {
    return this.classesService.findAll();
  }

  /**
   * Lấy lớp học theo email user (dành cho customer login)
   */
  @Get('user/:email/classes')
  @ApiOperation({ summary: 'Lấy lớp học theo email user' })
  @ApiParam({ name: 'email', description: 'Email của user' })
  @ApiResponse({ 
    status: 200, 
    description: 'Danh sách lớp học của user',
    type: [Class]
  })
  async findByUserEmail(@Param('email') email: string) {
    return this.classesService.findByUserEmail(email);
  }

  /**
   * Lấy lớp học theo ID
   */
  @Get(':id')
  @ApiOperation({ 
    summary: 'Lấy thông tin lớp học theo ID',
    description: 'Lấy thông tin chi tiết của một lớp học cụ thể'
  })
  @ApiParam({
    name: 'id',
    description: 'ID của lớp học',
    example: '550e8400-e29b-41d4-a716-446655440000'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Thông tin lớp học',
    type: Class
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Không tìm thấy lớp học' 
  })
  async findOne(@Param('id') id: string): Promise<Class> {
    return this.classesService.findOne(id);
  }

  /**
   * Lấy danh sách lớp học của một khách hàng
   */
  @Get('customer/:customerId')
  @ApiOperation({ 
    summary: 'Lấy danh sách lớp học của khách hàng',
    description: 'Lấy tất cả lớp học được tạo bởi một khách hàng cụ thể'
  })
  @ApiParam({
    name: 'customerId',
    description: 'ID của khách hàng',
    example: '550e8400-e29b-41d4-a716-446655440000'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Danh sách lớp học của khách hàng',
    type: [Class]
  })
  async findByCustomer(@Param('customerId') customerId: string): Promise<Class[]> {
    return this.classesService.findByCustomerId(customerId);
  }

  /**
   * Thống kê lớp học theo môn học của khách hàng
   */
  @Get('customer/:customerId/stats/by-subject')
  @ApiOperation({ 
    summary: 'Thống kê lớp học theo môn học',
    description: 'Lấy thống kê số lượng lớp học theo từng môn học của khách hàng'
  })
  @ApiParam({
    name: 'customerId',
    description: 'ID của khách hàng',
    example: '550e8400-e29b-41d4-a716-446655440000'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Thống kê theo môn học',
    example: {
      'Toán học': 5,
      'Vật lý': 3,
      'Hóa học': 2
    }
  })
  async getStatsBySubject(@Param('customerId') customerId: string): Promise<{ [key: string]: number }> {
    return this.classesService.getStatsBySubject(customerId);
  }

  /**
   * Thống kê tổng quan lớp học của khách hàng
   */
  @Get('customer/:customerId/stats/overview')
  @ApiOperation({ 
    summary: 'Thống kê tổng quan cho khách hàng',
    description: 'Lấy thống kê tổng quan về lớp học của khách hàng'
  })
  @ApiParam({
    name: 'customerId',
    description: 'ID của khách hàng',
    example: '550e8400-e29b-41d4-a716-446655440000'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Thống kê tổng quan',
    schema: {
      type: 'object',
      properties: {
        totalClasses: { type: 'number', description: 'Tổng số lớp học' },
        totalTeachers: { type: 'number', description: 'Tổng số giáo viên' },
        totalStudents: { type: 'number', description: 'Tổng số học sinh' },
        averageClassSize: { type: 'number', description: 'Sĩ số trung bình' },
        subjects: { type: 'array', items: { type: 'string' }, description: 'Danh sách môn học' }
      }
    }
  })
  async getOverallStats(@Param('customerId') customerId: string): Promise<{
    totalClasses: number;
    totalTeachers: number;
    totalStudents: number;
    averageClassSize: number;
    subjects: string[];
  }> {
    return this.classesService.getOverallStats(customerId);
  }
} 