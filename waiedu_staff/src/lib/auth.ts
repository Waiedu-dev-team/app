// API Base URL
export const API_BASE_URL = 'http://localhost:3000';

// Types for auth
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  user: User;
  expires_in: number;
  token_type: string;
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  department: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

// Auth API functions
export const authAPI = {
  /**
   * Đăng nhập người dùng
   */
  async login(loginData: LoginRequest): Promise<LoginResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(Array.isArray(data.message) 
        ? data.message.join(', ') 
        : data.message || 'Đăng nhập thất bại');
    }

    return data;
  },

  /**
   * Lấy thông tin người dùng từ token
   */
  async getProfile(): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      headers: {
        ...this.getAuthHeader(),
      },
    });
    
    const data = await response.json();

    if (!response.ok) {
      this.logout(); // Nếu token không hợp lệ, đăng xuất luôn
      throw new Error('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.');
    }
    
    return data;
  },

  /**
   * Lưu token và user info vào localStorage
   */
  saveAuthData(authData: LoginResponse): void {
    localStorage.setItem('access_token', authData.access_token);
    localStorage.setItem('user', JSON.stringify(authData.user));
    localStorage.setItem('token_expires_at', 
      (Date.now() + authData.expires_in * 1000).toString()
    );
  },

  /**
   * Lấy token từ localStorage
   */
  getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('access_token');
  },

  /**
   * Lấy user info từ localStorage
   */
  getUser(): User | null {
    if (typeof window === 'undefined') return null;
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  /**
   * Kiểm tra token có còn valid không
   */
  isTokenValid(): boolean {
    if (typeof window === 'undefined') return false;
    
    const token = this.getToken();
    const expiresAt = localStorage.getItem('token_expires_at');
    
    if (!token || !expiresAt) return false;
    
    return Date.now() < parseInt(expiresAt);
  },

  /**
   * Đăng xuất - xóa tất cả auth data
   */
  logout(): void {
    if (typeof window === 'undefined') return;
    
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    localStorage.removeItem('token_expires_at');
  },

  /**
   * Lấy Authorization header để gọi API
   */
  getAuthHeader(): Record<string, string> {
    const token = this.getToken();
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  }
}; 