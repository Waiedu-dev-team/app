import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { Teacher } from './entities/teacher.entity';
import { CustomersService } from '../customers/customers.service';
import { UsersService } from '../users/users.service';
import { UserRole, Department } from '../users/dto/create-user.dto';

@Injectable()
export class TeachersService {
  private teachers: Teacher[] = []; // In-memory storage for simplicity

  constructor(
    private readonly customersService: CustomersService,
    private readonly usersService: UsersService,
    ) {}

  async create(createTeacherDto: CreateTeacherDto): Promise<Teacher> {
    // 1. Check if customer exists
    const customer = await this.customersService.findOne(createTeacherDto.customerId);
    if (!customer) {
      throw new NotFoundException(`Không tìm thấy khách hàng với ID ${createTeacherDto.customerId}`);
    }

    // 2. Create the user account for the teacher first.
    // This also implicitly checks if the email is already globally unique.
    try {
      await this.usersService.create({
        email: createTeacherDto.email,
        password: createTeacherDto.password,
        fullName: createTeacherDto.fullName,
        role: UserRole.TEACHER,
        department: Department.EDUCATION,
      });
    } catch (error) {
        // If user creation fails (e.g., email conflict), re-throw the error.
        throw error;
    }
    
    // 3. Create the teacher profile
    const newTeacher: Teacher = {
      id: uuidv4(),
      fullName: createTeacherDto.fullName,
      email: createTeacherDto.email,
      subjectSpecialization: createTeacherDto.subjectSpecialization,
      customerId: createTeacherDto.customerId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.teachers.push(newTeacher);
    return newTeacher;
  }

  async findAll(): Promise<Teacher[]> {
    return this.teachers;
  }

  async findOne(id: string): Promise<Teacher> {
    const teacher = this.teachers.find(t => t.id === id);
    if (!teacher) {
      throw new NotFoundException(`Không tìm thấy giáo viên với ID ${id}`);
    }
    return teacher;
  }

  async findByCustomerId(customerId: string): Promise<Teacher[]> {
    return this.teachers.filter(t => t.customerId === customerId);
  }
} 