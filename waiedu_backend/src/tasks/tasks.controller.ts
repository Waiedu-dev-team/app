import { Controller, Get, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Task } from './entities/task.entity';

@ApiTags('✅ Tasks Management')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: ' Lấy danh sách công việc' })
  @ApiResponse({ status: 200, description: 'Danh sách công việc', type: [Task] })
  findAll() {
    return this.tasksService.findAll();
  }
}
