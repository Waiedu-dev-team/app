import { Module } from '@nestjs/common';
import { ClassesController } from './classes.controller';
import { ClassesService } from './classes.service';
import { CustomersModule } from '../customers/customers.module';

@Module({
  imports: [CustomersModule],
  controllers: [ClassesController],
  providers: [ClassesService],
  exports: [ClassesService], // Export để có thể sử dụng trong modules khác nếu cần
})
export class ClassesModule {} 