import { Injectable, NotFoundException, ConflictException, forwardRef, Inject, BadRequestException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as xlsx from 'xlsx';
import { CreateStudentDto } from './dto/create-student.dto';
import { Student, Gender } from './entities/student.entity';
import { ClassesService } from '../classes/classes.service';

interface ImportResult {
  successCount: number;
  failureCount: number;
  errors: string[];
}

@Injectable()
export class StudentsService {
  private students: Student[] = [];

  constructor(
    @Inject(forwardRef(() => ClassesService))
    private readonly classesService: ClassesService,
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const classExists = await this.classesService.findOne(createStudentDto.classId);
    if (!classExists) {
      throw new NotFoundException(`Lớp học với ID ${createStudentDto.classId} không tồn tại.`);
    }

    // Optional: Check if student with the same name already exists in the class
    const studentInClass = this.students.find(
      s => s.fullName === createStudentDto.fullName && s.classId === createStudentDto.classId
    );
    if (studentInClass) {
      throw new ConflictException(`Học sinh "${createStudentDto.fullName}" đã có trong lớp này.`);
    }

    const newStudent: Student = {
      id: `stud-${uuidv4()}`,
      ...createStudentDto,
      createdAt: new Date(),
    };

    this.students.push(newStudent);
    
    // Increment the number of students in the class
    await this.classesService.incrementStudentCount(createStudentDto.classId);

    return newStudent;
  }
  
  async findByClassId(classId: string): Promise<Student[]> {
    return this.students.filter(s => s.classId === classId);
  }

  async bulkCreateFromExcel(classId: string, file: Express.Multer.File): Promise<ImportResult> {
    const classExists = await this.classesService.findOne(classId);
    if (!classExists) {
      throw new NotFoundException(`Lớp học với ID ${classId} không tồn tại.`);
    }

    const workbook = xlsx.read(file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet) as any[];
    
    const result: ImportResult = { successCount: 0, failureCount: 0, errors: [] };

    for (const row of data) {
      const fullName = row['Họ và tên'];
      if (!fullName) {
        result.failureCount++;
        result.errors.push(`Một dòng bị thiếu "Họ và tên".`);
        continue;
      }
      
      try {
        const studentDto: CreateStudentDto = {
          fullName: fullName,
          dateOfBirth: row['Ngày sinh'] ? new Date(row['Ngày sinh']) : undefined,
          gender: Object.values(Gender).includes(row['Giới tính']?.toLowerCase()) ? row['Giới tính'].toLowerCase() : undefined,
          classId: classId,
        };
        
        // Use a lightweight, internal creation method to avoid re-checking class existence
        this._create(studentDto);
        result.successCount++;

      } catch (error) {
        result.failureCount++;
        result.errors.push(`Lỗi khi tạo học sinh "${fullName}": ${error.message}`);
      }
    }
    
    // Update the class's student count once after the batch operation
    const finalStudentCount = this.students.filter(s => s.classId === classId).length;
    await this.classesService.updateStudentCount(classId, finalStudentCount);

    return result;
  }

  // Internal create method without student count increment
  private _create(dto: CreateStudentDto): Student {
    const studentInClass = this.students.find(s => s.fullName === dto.fullName && s.classId === dto.classId);
    if (studentInClass) {
      throw new ConflictException(`Học sinh "${dto.fullName}" đã có trong lớp này.`);
    }
    const newStudent: Student = { id: `stud-${uuidv4()}`, ...dto, createdAt: new Date() };
    this.students.push(newStudent);
    return newStudent;
  }
} 