import { Injectable, ConflictException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Customer } from './entities/customer.entity';
import { UsersService } from '../users/users.service';
import { UserRole, Department } from '../users/dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CustomersService {
  private customers: Customer[] = []; // Temporary in-memory storage

  constructor(private readonly usersService: UsersService) {}

  /**
   * Tạo tài khoản khách hàng mới
   * @param createCustomerDto - Dữ liệu để tạo customer
   * @returns Customer đã được tạo (không bao gồm password)
   */
  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    // Kiểm tra email đã tồn tại trong customers
    const existingCustomer = this.customers.find(customer => customer.email === createCustomerDto.email);
    if (existingCustomer) {
      throw new ConflictException('Email đã được sử dụng cho khách hàng khác');
    }

    // Kiểm tra email đã tồn tại trong users
    const existingUser = await this.usersService.findByEmail(createCustomerDto.email);
    if (existingUser) {
      throw new ConflictException('Email đã được sử dụng trong hệ thống');
    }

    // Hash password mặc định
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(createCustomerDto.defaultPassword, saltRounds);

    // Tạo customer mới
    const newCustomer: Customer = {
      id: uuidv4(),
      email: createCustomerDto.email,
      fullName: createCustomerDto.fullName,
      defaultPassword: createCustomerDto.defaultPassword, // Store plain text for display
      field: createCustomerDto.field,
      taxCode: createCustomerDto.taxCode,
      city: createCustomerDto.city,
      district: createCustomerDto.district,
      createdAt: new Date(),
      updatedAt: new Date(),
      password: hashedPassword // Store hashed for security
    };

    // Tạo user account tương ứng cho authentication
    try {
      await this.usersService.create({
        email: createCustomerDto.email,
        password: createCustomerDto.defaultPassword,
        fullName: createCustomerDto.fullName,
        department: Department.IT, // Default department cho customers
        role: UserRole.CUSTOMER
      });
    } catch (error) {
      throw new ConflictException('Không thể tạo tài khoản đăng nhập cho khách hàng');
    }

    // Lưu vào memory (trong thực tế sẽ lưu vào database)
    this.customers.push(newCustomer);

    // Trả về customer không bao gồm hashed password
    const { password, ...customerWithoutPassword } = newCustomer;
    return customerWithoutPassword;
  }

  /**
   * Lấy tất cả khách hàng
   * @returns Danh sách customers (không bao gồm password)
   */
  async findAll(): Promise<Customer[]> {
    return this.customers.map(customer => {
      const { password, ...customerWithoutPassword } = customer;
      return customerWithoutPassword;
    });
  }

  /**
   * Lấy khách hàng theo ID
   * @param id - ID của customer
   * @returns Customer hoặc undefined
   */
  async findOne(id: string): Promise<Customer | undefined> {
    const customer = this.customers.find(customer => customer.id === id);
    if (!customer) return undefined;
    
    const { password, ...customerWithoutPassword } = customer;
    return customerWithoutPassword;
  }

  /**
   * Lấy khách hàng theo email (bao gồm password - dùng cho authentication)
   * @param email - Email của customer
   * @returns Customer với password hoặc undefined
   */
  async findByEmail(email: string): Promise<Customer | undefined> {
    return this.customers.find(customer => customer.email === email);
  }

  /**
   * Lấy khách hàng theo mã số thuế
   * @param taxCode - Mã số thuế
   * @returns Customer hoặc undefined
   */
  async findByTaxCode(taxCode: string): Promise<Customer | undefined> {
    const customer = this.customers.find(customer => customer.taxCode === taxCode);
    if (!customer) return undefined;
    
    const { password, ...customerWithoutPassword } = customer;
    return customerWithoutPassword;
  }

  /**
   * Thống kê khách hàng theo lĩnh vực
   * @returns Object với thống kê
   */
  async getStatsByField(): Promise<{ [key: string]: number }> {
    const stats: { [key: string]: number } = {};
    
    this.customers.forEach(customer => {
      const field = customer.field;
      stats[field] = (stats[field] || 0) + 1;
    });
    
    return stats;
  }

  /**
   * Thống kê khách hàng theo địa phương
   * @returns Object với thống kê
   */
  async getStatsByLocation(): Promise<{ [key: string]: number }> {
    const stats: { [key: string]: number } = {};
    
    this.customers.forEach(customer => {
      const location = `${customer.city}`;
      stats[location] = (stats[location] || 0) + 1;
    });
    
    return stats;
  }

  /**
   * Tìm customer bằng email (để mapping từ user email)
   * @param email - Email của customer
   * @returns Customer hoặc undefined
   */
  async findByUserEmail(email: string): Promise<Customer | undefined> {
    const customer = this.customers.find(customer => customer.email === email);
    if (!customer) return undefined;
    
    const { password, ...customerWithoutPassword } = customer;
    return customerWithoutPassword;
  }
} 