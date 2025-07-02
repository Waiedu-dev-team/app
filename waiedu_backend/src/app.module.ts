import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';
import { CustomersModule } from './customers/customers.module';
import { ClassesModule } from './classes/classes.module';

@Module({
  imports: [UsersModule, AuthModule, TasksModule, CustomersModule, ClassesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
