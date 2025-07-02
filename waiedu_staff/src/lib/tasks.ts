import { API_BASE_URL, authAPI } from "./auth";

// Định nghĩa kiểu dữ liệu cho Task ở frontend
export interface Task {
  id: string;
  title: string;
  status: 'todo' | 'in_progress' | 'done' | 'cancelled';
  priority: 'low' | 'normal' | 'high' | 'urgent';
  dueDate: string; // Sử dụng string để dễ dàng xử lý trên client
  progress: number;
  assignedTo: string;
  category: string;
}

export const tasksAPI = {
  /**
   * Lấy danh sách tất cả công việc
   */
  async getTasks(): Promise<Task[]> {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      headers: {
        'Content-Type': 'application/json',
        ...authAPI.getAuthHeader(), // Gửi kèm token xác thực
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        // Nếu token không hợp lệ, đăng xuất người dùng
        authAPI.logout();
        // Ném lỗi để thông báo cho nơi gọi hàm
        throw new Error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
      }
      throw new Error('Không thể tải danh sách công việc.');
    }

    return response.json();
  }
}; 