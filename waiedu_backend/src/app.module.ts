import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';
import { CustomersModule } from './customers/customers.module';
import { ClassesModule } from './classes/classes.module';
import { SchoolsModule } from './schools/schools.module';
import { TeachersModule } from './teachers/teachers.module';
import { SubjectsModule } from './subjects/subjects.module';
import { StudentsModule } from './students/students.module';

@Module({
  imports: [
    UsersModule, 
    AuthModule, 
    TasksModule, 
    CustomersModule, 
    ClassesModule, 
    SchoolsModule, 
    TeachersModule,
    SubjectsModule,
    StudentsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
