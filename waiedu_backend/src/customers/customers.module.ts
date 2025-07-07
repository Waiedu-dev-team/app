import { Module, forwardRef } from '@nestjs/common';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { UsersModule } from '../users/users.module';
import { TeachersModule } from '../teachers/teachers.module';
import { SubjectsModule } from '../subjects/subjects.module';

@Module({
  imports: [UsersModule, forwardRef(() => TeachersModule), SubjectsModule],
  controllers: [CustomersController],
  providers: [CustomersService],
  exports: [CustomersService],
})
export class CustomersModule {} 