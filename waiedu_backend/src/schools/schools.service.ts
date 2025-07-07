import { Injectable } from '@nestjs/common';
import { School } from './entities/school.entity';

@Injectable()
export class SchoolsService {
  private readonly schools: School[] = [
    { id: 'thpt-chuyen-hanoi-amsterdam', name: 'Trường THPT Chuyên Hà Nội - Amsterdam', city: 'hanoi' },
    { id: 'thpt-chuyen-khoa-hoc-tu-nhien', name: 'Trường THPT Chuyên Khoa học Tự nhiên', city: 'hanoi' },
    { id: 'thpt-chu-van-an', name: 'Trường THPT Chu Văn An', city: 'hanoi' },
    { id: 'thpt-le-hong-phong', name: 'Trường THPT Chuyên Lê Hồng Phong', city: 'hcm' },
    { id: 'pho-thong-nang-khieu', name: 'Trường Phổ thông Năng khiếu', city: 'hcm' },
    { id: 'thpt-nguyen-thi-minh-khai', name: 'Trường THPT Nguyễn Thị Minh Khai', city: 'hcm' },
    { id: 'thpt-phan-chau-trinh', name: 'Trường THPT Phan Châu Trinh', city: 'danang' },
  ];

  findAll(): School[] {
    return this.schools;
  }
} 