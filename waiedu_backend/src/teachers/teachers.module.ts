import { Module, forwardRef } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { TeachersController } from './teachers.controller';
import { CustomersModule } from '../customers/customers.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    forwardRef(() => CustomersModule),
    UsersModule
  ],
  controllers: [TeachersController],
  providers: [TeachersService],
  exports: [TeachersService], // Export so other modules can use it
})
export class TeachersModule {} 