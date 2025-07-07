import { Injectable, ConflictException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { Subject } from './entities/subject.entity';

@Injectable()
export class SubjectsService {
  private subjects: Subject[] = [
    // Add some default subjects for testing
    { id: 'subj-default-toan', name: 'Toán học', customerId: 'global' },
    { id: 'subj-default-ly', name: 'Vật lý', customerId: 'global' },
    { id: 'subj-default-hoa', name: 'Hóa học', customerId: 'global' },
    { id: 'subj-default-sinh', name: 'Sinh học', customerId: 'global' },
  ];

  async create(createSubjectDto: CreateSubjectDto): Promise<Subject> {
    const existingSubject = this.subjects.find(
      s => s.name === createSubjectDto.name && s.customerId === createSubjectDto.customerId
    );
    if (existingSubject) {
      throw new ConflictException(`Môn học "${createSubjectDto.name}" đã tồn tại.`);
    }

    const newSubject: Subject = {
      id: `subj-${uuidv4()}`,
      ...createSubjectDto,
    };

    this.subjects.push(newSubject);
    return newSubject;
  }

  async findOne(id: string): Promise<Subject | undefined> {
    return this.subjects.find(s => s.id === id);
  }

  async findByCustomerId(customerId: string): Promise<Subject[]> {
    // Return customer-specific subjects + global subjects
    return this.subjects.filter(s => s.customerId === customerId || s.customerId === 'global');
  }
} 