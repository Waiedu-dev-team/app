import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**
   * Validate user credentials
   * @param email - Email của user
   * @param password - Password chưa hash
   * @returns User nếu valid, null nếu invalid
   */
  async validateUser(email: string, password: string): Promise<any> {
    // Đảm bảo email có @waiedu.com
    const normalizedEmail = email.includes('@waiedu.com') 
      ? email 
      : `${email}@waiedu.com`;

    const user = await this.usersService.findByEmail(normalizedEmail);
    
    if (user && user.password && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  /**
   * Login user và tạo JWT token
   * @param loginDto - Thông tin đăng nhập
   * @returns JWT token và thông tin user
   */
  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const { email, password } = loginDto;
    
    // Validate user
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Email hoặc mật khẩu không chính xác');
    }

    // Tạo JWT payload
    const payload = { 
      email: user.email, 
      sub: user.id,
      role: user.role,
      department: user.department
    };

    // Tạo access token
    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
      user,
      expires_in: 3600, // 1 hour
      token_type: 'Bearer'
    };
  }

  /**
   * Validate JWT token và return user info
   * @param payload - JWT payload
   * @returns User info
   */
  async validateJwtPayload(payload: any) {
    const user = await this.usersService.findByEmail(payload.email);
    if (!user) {
      throw new UnauthorizedException('Token không hợp lệ');
    }
    const { password, ...result } = user;
    return result;
  }
} 