import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SchoolsService } from './schools.service';
import { School } from './entities/school.entity';

@ApiTags('🏫 Schools')
@Controller('schools')
export class SchoolsController {
  constructor(private readonly schoolsService: SchoolsService) {}

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách trường học' })
  @ApiResponse({ 
    status: 200, 
    description: 'Danh sách các trường học có sẵn', 
    type: [School] 
  })
  findAll(): School[] {
    return this.schoolsService.findAll();
  }
} 