import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { Subject } from './entities/subject.entity';

@ApiTags('📚 Subjects - Quản lý Môn học')
@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo môn học mới' })
  @ApiBody({ type: CreateSubjectDto })
  @ApiResponse({ status: 201, description: 'Môn học đã được tạo.', type: Subject })
  @ApiResponse({ status: 409, description: 'Tên môn học đã tồn tại.' })
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  create(@Body() createSubjectDto: CreateSubjectDto) {
    return this.subjectsService.create(createSubjectDto);
  }
} 