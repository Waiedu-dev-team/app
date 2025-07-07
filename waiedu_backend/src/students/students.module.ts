import { Module, forwardRef } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { ClassesModule } from '../classes/classes.module';

@Module({
  imports: [forwardRef(() => ClassesModule)],
  controllers: [StudentsController],
  providers: [StudentsService],
  exports: [StudentsService],
})
export class StudentsModule {} 