import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Param, 
  HttpStatus,
  ValidationPipe,
  UsePipes,
  Query
} from '@nestjs/common';
import { 
  ApiTags, 
  ApiOperation, 
  ApiResponse, 
  ApiBody, 
  ApiParam,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiQuery
} from '@nestjs/swagger';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Customer } from './entities/customer.entity';

@ApiTags('🏢 Customer Management')
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  @ApiOperation({ 
    summary: '🆕 Tạo tài khoản khách hàng mới',
    description: 'Endpoint để tạo tài khoản khách hàng doanh nghiệp với đầy đủ thông tin công ty và địa chỉ.'
  })
  @ApiBody({ 
    type: CreateCustomerDto,
    description: 'Thông tin cần thiết để tạo tài khoản khách hàng',
    examples: {
      'Công ty Công nghệ': {
        summary: 'Tạo tài khoản công ty công nghệ',
        value: {
          email: 'contact@techcompany.com',
          fullName: 'Nguyễn Văn CEO',
          defaultPassword: 'tech123456',
          field: 'technology',
          taxCode: '0123456789',
          city: 'hanoi',
          district: 'hoankiem'
        }
      },
      'Công ty Tài chính': {
        summary: 'Tạo tài khoản công ty tài chính',
        value: {
          email: 'admin@financecompany.com',
          fullName: 'Trần Thị Manager',
          defaultPassword: 'finance789',
          field: 'finance',
          taxCode: '9876543210',
          city: 'hcm',
          district: 'quan1'
        }
      }
    }
  })
  @ApiCreatedResponse({ 
    description: '✅ Tài khoản khách hàng được tạo thành công',
    type: Customer,
    example: {
      id: '550e8400-e29b-41d4-a716-446655440000',
      email: 'contact@company.com',
      fullName: 'Nguyễn Văn CEO',
      defaultPassword: 'defaultpass123',
      field: 'technology',
      taxCode: '0123456789',
      city: 'hanoi',
      district: 'hoankiem',
      createdAt: '2024-01-07T12:00:00.000Z',
      updatedAt: '2024-01-07T12:00:00.000Z'
    }
  })
  @ApiBadRequestResponse({ 
    description: '❌ Dữ liệu đầu vào không hợp lệ',
    example: {
      statusCode: 400,
      message: [
        'Email không hợp lệ',
        'Mật khẩu phải có ít nhất 6 ký tự',
        'Họ tên không được để trống',
        'Mã số thuế không được để trống'
      ],
      error: 'Bad Request'
    }
  })
  @ApiConflictResponse({ 
    description: '⚠️ Email đã được sử dụng',
    example: {
      statusCode: 409,
      message: 'Email đã được sử dụng cho khách hàng khác',
      error: 'Conflict'
    }
  })
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async create(@Body() createCustomerDto: CreateCustomerDto): Promise<Customer> {
    return this.customersService.create(createCustomerDto);
  }

  @Get()
  @ApiOperation({ 
    summary: '📋 Lấy danh sách khách hàng',
    description: 'Lấy danh sách tất cả khách hàng trong hệ thống (không bao gồm mật khẩu).'
  })
  @ApiResponse({ 
    status: 200, 
    description: '✅ Danh sách khách hàng',
    type: [Customer],
    example: [
      {
        id: '550e8400-e29b-41d4-a716-446655440000',
        email: 'customer1@company.com',
        fullName: 'Nguyễn Văn A',
        defaultPassword: 'defaultpass123',
        field: 'technology',
        taxCode: '0123456789',
        city: 'hanoi',
        district: 'hoankiem',
        createdAt: '2024-01-07T12:00:00.000Z',
        updatedAt: '2024-01-07T12:00:00.000Z'
      }
    ]
  })
  async findAll(): Promise<Customer[]> {
    return this.customersService.findAll();
  }

  @Get('stats/by-field')
  @ApiOperation({
    summary: '📊 Thống kê khách hàng theo lĩnh vực',
    description: 'Lấy thống kê số lượng khách hàng theo từng lĩnh vực kinh doanh.'
  })
  @ApiResponse({
    status: 200,
    description: '✅ Thống kê theo lĩnh vực',
    example: {
      technology: 15,
      finance: 8,
      retail: 12,
      manufacturing: 5
    }
  })
  async getStatsByField(): Promise<{ [key: string]: number }> {
    return this.customersService.getStatsByField();
  }

  @Get('stats/by-location')
  @ApiOperation({
    summary: '🗺️ Thống kê khách hàng theo địa phương',
    description: 'Lấy thống kê số lượng khách hàng theo từng thành phố.'
  })
  @ApiResponse({
    status: 200,
    description: '✅ Thống kê theo địa phương',
    example: {
      hanoi: 20,
      hcm: 25,
      danang: 10,
      haiphong: 5
    }
  })
  async getStatsByLocation(): Promise<{ [key: string]: number }> {
    return this.customersService.getStatsByLocation();
  }

  @Get('search/by-tax-code/:taxCode')
  @ApiOperation({
    summary: '🔍 Tìm khách hàng theo mã số thuế',
    description: 'Tìm kiếm khách hàng bằng mã số thuế doanh nghiệp.'
  })
  @ApiParam({
    name: 'taxCode',
    description: 'Mã số thuế cần tìm',
    example: '0123456789'
  })
  @ApiResponse({
    status: 200,
    description: '✅ Thông tin khách hàng',
    type: Customer
  })
  @ApiResponse({
    status: 404,
    description: '❌ Không tìm thấy khách hàng',
    example: {
      statusCode: 404,
      message: 'Không tìm thấy khách hàng với mã số thuế này',
      error: 'Not Found'
    }
  })
  async findByTaxCode(@Param('taxCode') taxCode: string): Promise<Customer> {
    const customer = await this.customersService.findByTaxCode(taxCode);
    if (!customer) {
      throw new Error('Không tìm thấy khách hàng với mã số thuế này');
    }
    return customer;
  }

  @Get(':id')
  @ApiOperation({ 
    summary: '🔍 Lấy thông tin khách hàng theo ID',
    description: 'Lấy thông tin chi tiết của một khách hàng cụ thể theo ID.'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID của khách hàng cần lấy thông tin',
    example: '550e8400-e29b-41d4-a716-446655440000'
  })
  @ApiResponse({ 
    status: 200, 
    description: '✅ Thông tin khách hàng',
    type: Customer
  })
  @ApiResponse({ 
    status: 404, 
    description: '❌ Không tìm thấy khách hàng',
    example: {
      statusCode: 404,
      message: 'Không tìm thấy khách hàng',
      error: 'Not Found'
    }
  })
  async findOne(@Param('id') id: string): Promise<Customer> {
    const customer = await this.customersService.findOne(id);
    if (!customer) {
      throw new Error('Không tìm thấy khách hàng');
    }
    return customer;
  }
} 