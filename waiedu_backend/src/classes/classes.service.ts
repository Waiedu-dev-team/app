import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { Class } from './entities/class.entity';
import { CustomersService } from '../customers/customers.service';
import { TeachersService } from '../teachers/teachers.service';
import { SubjectsService } from '../subjects/subjects.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ClassesService {
  private classes: Class[] = []; // Temporary in-memory storage

  constructor(
    private readonly customersService: CustomersService,
    private readonly teachersService: TeachersService,
    private readonly subjectsService: SubjectsService,
  ) {}

  /**
   * Tạo lớp học mới
   * @param createClassDto - Dữ liệu để tạo lớp học
   * @returns Class đã được tạo
   */
  async create(createClassDto: CreateClassDto): Promise<Class> {
    const { customerId, teacherId, subjectId, className } = createClassDto;

    // Check dependencies
    const teacher = await this.teachersService.findOne(teacherId);
    if (!teacher || teacher.customerId !== customerId) {
      throw new BadRequestException('Giáo viên không hợp lệ hoặc không thuộc khách hàng này.');
    }

    const subject = await this.subjectsService.findOne(subjectId);
    // Note: We allow global subjects, so we don't check customerId for subjects
    if (!subject) {
      throw new BadRequestException('Môn học không hợp lệ.');
    }
    
    // Kiểm tra tên lớp đã tồn tại cho customer này
    const existingClass = this.classes.find(
      cls => cls.className === className && cls.customerId === customerId
    );
    
    if (existingClass) {
      throw new ConflictException('Tên lớp học đã tồn tại cho khách hàng này');
    }

    // Tạo lớp học mới
    const newClass: Class = {
      id: uuidv4(),
      className: className,
      subjectId: subjectId,
      subject: subject.name,
      teacherId: teacherId,
      teacherName: teacher.fullName,
      description: createClassDto.description || undefined,
      schedule: createClassDto.schedule || undefined,
      maxStudents: createClassDto.maxStudents || 30,
      customerId: customerId,
      createdAt: new Date(),
      updatedAt: new Date(),
      currentStudents: 0,
    };

    this.classes.push(newClass);
    return newClass;
  }

  /**
   * Tăng sĩ số của một lớp học
   */
  async incrementStudentCount(classId: string): Promise<void> {
    const classToUpdate = await this.findOne(classId);
    if (classToUpdate) {
      classToUpdate.currentStudents = (classToUpdate.currentStudents || 0) + 1;
    }
  }

  /**
   * Cập nhật lại sĩ số của lớp học dựa trên số lượng học sinh thực tế
   */
  async updateStudentCount(classId: string, count: number): Promise<void> {
    const classToUpdate = await this.findOne(classId);
    if (classToUpdate) {
      classToUpdate.currentStudents = count;
    }
  }

  /**
   * Lấy tất cả lớp học
   * @returns Danh sách tất cả lớp học
   */
  async findAll(): Promise<Class[]> {
    return this.classes;
  }

  /**
   * Lấy lớp học theo ID
   * @param id - ID của lớp học
   * @returns Class hoặc throw NotFoundException
   */
  async findOne(id: string): Promise<Class> {
    const classItem = this.classes.find(cls => cls.id === id);
    if (!classItem) {
      throw new NotFoundException('Không tìm thấy lớp học');
    }
    return classItem;
  }

  /**
   * Lấy tất cả lớp học của một khách hàng
   * @param customerId - ID của khách hàng
   * @returns Danh sách lớp học của khách hàng
   */
  async findByCustomerId(customerId: string): Promise<Class[]> {
    return this.classes.filter(cls => cls.customerId === customerId);
  }

  /**
   * Thống kê lớp học theo môn học cho một khách hàng
   * @param customerId - ID của khách hàng
   * @returns Object với thống kê theo môn học
   */
  async getStatsBySubject(customerId: string): Promise<{ [key: string]: number }> {
    const customerClasses = this.classes.filter(cls => cls.customerId === customerId);
    const stats: { [key: string]: number } = {};
    
    customerClasses.forEach(cls => {
      const subject = cls.subject;
      stats[subject] = (stats[subject] || 0) + 1;
    });
    
    return stats;
  }

  /**
   * Thống kê tổng quan cho một khách hàng
   * @param customerId - ID của khách hàng
   * @returns Thống kê tổng quan
   */
  async getOverallStats(customerId: string): Promise<{ totalClasses: number; totalTeachers: number; totalStudents: number; averageClassSize: number; subjects: string[]; }> {
    const customerClasses = this.classes.filter(cls => cls.customerId === customerId);
    
    if (customerClasses.length === 0) {
      return { totalClasses: 0, totalTeachers: 0, totalStudents: 0, averageClassSize: 0, subjects: [] };
    }

    const totalClasses = customerClasses.length;
    const totalTeachers = new Set(customerClasses.map(cls => cls.teacherId)).size;
    const totalStudents = customerClasses.reduce((sum, cls) => sum + (cls.currentStudents || 0), 0);
    const averageClassSize = totalClasses > 0 ? totalStudents / totalClasses : 0;
    const subjects = [...new Set(customerClasses.map(cls => cls.subject))];

    return {
      totalClasses,
      totalTeachers,
      totalStudents,
      averageClassSize: Math.round(averageClassSize * 100) / 100,
      subjects
    };
  }

  /**
   * Lấy classes theo user email (mapping qua customer)
   * @param userEmail - Email của user
   * @returns Array classes hoặc empty array
   */
  async findByUserEmail(userEmail: string): Promise<Class[]> {
    // Tìm customer bằng email
    const customer = await this.customersService.findByUserEmail(userEmail);
    if (!customer) {
      return []; // Không tìm thấy customer
    }

    // Lấy classes của customer đó
    return this.classes.filter(cls => cls.customerId === customer.id);
  }
} 