import { Module, forwardRef } from '@nestjs/common';
import { ClassesController } from './classes.controller';
import { ClassesService } from './classes.service';
import { CustomersModule } from '../customers/customers.module';
import { TeachersModule } from '../teachers/teachers.module';
import { SubjectsModule } from '../subjects/subjects.module';
import { StudentsModule } from '../students/students.module';

@Module({
  imports: [
    forwardRef(() => CustomersModule), 
    forwardRef(() => TeachersModule), 
    forwardRef(() => SubjectsModule),
    forwardRef(() => StudentsModule)
  ],
  controllers: [ClassesController],
  providers: [ClassesService],
  exports: [ClassesService], // Export để có thể sử dụng trong modules khác nếu cần
})
export class ClassesModule {} 