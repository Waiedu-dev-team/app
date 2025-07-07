import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { Student } from './entities/student.entity';

@ApiTags('🎓 Students - Quản lý Học sinh')
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  @ApiOperation({ summary: 'Thêm học sinh mới vào một lớp học' })
  @ApiBody({ type: CreateStudentDto })
  @ApiResponse({ status: 201, description: 'Học sinh đã được thêm.', type: Student })
  @ApiResponse({ status: 404, description: 'Không tìm thấy lớp học.' })
  @ApiResponse({ status: 409, description: 'Học sinh đã tồn tại trong lớp.' })
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }
} 