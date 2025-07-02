import { Injectable, ConflictException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private users: User[] = []; // Temporary in-memory storage

  /**
   * Tạo người dùng mới
   * @param createUserDto - Dữ liệu để tạo user
   * @returns User đã được tạo (không bao gồm password)
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    // Kiểm tra email đã tồn tại
    const existingUser = this.users.find(user => user.email === createUserDto.email);
    if (existingUser) {
      throw new ConflictException('Email đã được sử dụng');
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(createUserDto.password, saltRounds);

    // Tạo user mới
    const newUser: User = {
      id: uuidv4(),
      email: createUserDto.email,
      fullName: createUserDto.fullName,
      department: createUserDto.department,
      role: createUserDto.role,
      createdAt: new Date(),
      updatedAt: new Date(),
      password: hashedPassword
    };

    // Lưu vào memory (trong thực tế sẽ lưu vào database)
    this.users.push(newUser);

    // Trả về user không bao gồm password
    const { password, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }

  /**
   * Lấy tất cả người dùng
   * @returns Danh sách users (không bao gồm password)
   */
  async findAll(): Promise<User[]> {
    return this.users.map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
  }

  /**
   * Lấy người dùng theo ID
   * @param id - ID của user
   * @returns User hoặc undefined
   */
  async findOne(id: string): Promise<User | undefined> {
    const user = this.users.find(user => user.id === id);
    if (!user) return undefined;
    
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  /**
   * Lấy người dùng theo email (bao gồm password - dùng cho authentication)
   * @param email - Email của user
   * @returns User với password hoặc undefined
   */
  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }
} 