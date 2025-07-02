'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

interface NotificationTemplate {
  id: number;
  name: string;
  subject: string;
  content: string;
  category: string;
  priority: 'high' | 'normal' | 'low';
  tags: string[];
  isSystem: boolean;
  createdAt: string;
  updatedAt: string;
  usageCount: number;
}

export default function NotificationTemplatesPage() {
  const router = useRouter();
  const [templates, setTemplates] = useState<NotificationTemplate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<NotificationTemplate | null>(null);

  // Mock data
  const mockTemplates: NotificationTemplate[] = [
    {
      id: 1,
      name: 'Chào mừng nhân viên mới',
      subject: 'Chào mừng bạn đến với WaiEdu!',
      content: `Xin chào {{employee_name}},

Chào mừng bạn đến với đội ngũ WaiEdu! Chúng tôi rất vui mừng được chào đón bạn.

Thông tin quan trọng:
- Ngày bắt đầu: {{start_date}}
- Phòng ban: {{department}}
- Người quản lý trực tiếp: {{manager_name}}

Vui lòng liên hệ HR nếu có bất kỳ câu hỏi nào.

Trân trọng,
Phòng Nhân sự`,
      category: 'HR',
      priority: 'normal',
      tags: ['chào mừng', 'nhân viên mới', 'HR'],
      isSystem: true,
      createdAt: '2025-06-01',
      updatedAt: '2025-06-15',
      usageCount: 25
    },
    {
      id: 2,
      name: 'Thông báo họp định kỳ',
      subject: 'Họp {{meeting_type}} - {{date}}',
      content: `Kính gửi {{recipient_name}},

Chúng tôi xin thông báo cuộc họp {{meeting_type}} sẽ diễn ra:

📅 Thời gian: {{date}} lúc {{time}}
📍 Địa điểm: {{location}}
⏱️ Thời lượng dự kiến: {{duration}}

Nội dung chính:
{{agenda}}

Vui lòng xác nhận tham dự trước {{confirm_deadline}}.

Trân trọng,
{{organizer_name}}`,
      category: 'Meeting',
      priority: 'high',
      tags: ['họp', 'cuộc họp', 'lịch trình'],
      isSystem: false,
      createdAt: '2025-06-05',
      updatedAt: '2025-06-20',
      usageCount: 18
    },
    {
      id: 3,
      name: 'Thông báo bảo trì hệ thống',
      subject: 'Thông báo bảo trì hệ thống - {{date}}',
      content: `Kính gửi toàn thể nhân viên,

Chúng tôi xin thông báo về việc bảo trì hệ thống:

🔧 Thời gian bảo trì: {{maintenance_start}} - {{maintenance_end}}
💻 Hệ thống ảnh hưởng: {{affected_systems}}
⚠️ Mức độ ảnh hưởng: {{impact_level}}

Trong thời gian bảo trì:
- {{impact_description}}
- {{alternative_solution}}

Vui lòng lên kế hoạch công việc phù hợp.

Trân trọng,
Phòng IT`,
      category: 'IT',
      priority: 'high',
      tags: ['bảo trì', 'hệ thống', 'IT'],
      isSystem: true,
      createdAt: '2025-06-10',
      updatedAt: '2025-06-25',
      usageCount: 12
    },
    {
      id: 4,
      name: 'Thông báo nghỉ lễ',
      subject: 'Thông báo lịch nghỉ lễ {{holiday_name}}',
      content: `Kính gửi toàn thể nhân viên,

Phòng HR xin thông báo lịch nghỉ lễ {{holiday_name}}:

📅 Thời gian nghỉ: {{holiday_start}} đến {{holiday_end}}
🏢 Ngày làm việc trở lại: {{back_to_work}}

Lưu ý:
- {{special_note}}
- Nhân viên trực vẫn làm việc theo lịch
- Liên hệ khẩn cấp: {{emergency_contact}}

Chúc toàn thể nhân viên có kỳ nghỉ vui vẻ!

Trân trọng,
Phòng Nhân sự`,
      category: 'HR',
      priority: 'normal',
      tags: ['nghỉ lễ', 'thông báo', 'HR'],
      isSystem: false,
      createdAt: '2025-06-12',
      updatedAt: '2025-06-22',
      usageCount: 8
    },
    {
      id: 5,
      name: 'Thông báo training',
      subject: 'Thông báo khóa đào tạo {{course_name}}',
      content: `Kính gửi {{participant_name}},

Chúng tôi xin thông báo về khóa đào tạo {{course_name}}:

📚 Tên khóa học: {{course_name}}
👨‍🏫 Giảng viên: {{instructor_name}}
📅 Thời gian: {{training_start}} - {{training_end}}
📍 Địa điểm: {{venue}}
🎯 Đối tượng: {{target_audience}}

Nội dung đào tạo:
{{training_content}}

Yêu cầu:
- {{requirements}}
- Mang theo {{materials}}

Vui lòng xác nhận tham gia trước {{registration_deadline}}.

Trân trọng,
Phòng Đào tạo`,
      category: 'Training',
      priority: 'normal',
      tags: ['đào tạo', 'khóa học', 'training'],
      isSystem: false,
      createdAt: '2025-06-15',
      updatedAt: '2025-06-28',
      usageCount: 15
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setTemplates(mockTemplates);
      setIsLoading(false);
    }, 1000);
  }, []);

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(templates.map(t => t.category)));

  const handleUseTemplate = (template: NotificationTemplate) => {
    // Navigate to compose page with template data
    const templateData = {
      subject: template.subject,
      content: template.content,
      priority: template.priority,
      templateId: template.id
    };
    
    const queryParams = new URLSearchParams({
      template: JSON.stringify(templateData)
    });
    
    router.push(`/notifications/compose?${queryParams}`);
  };

  const handleEditTemplate = (template: NotificationTemplate) => {
    setEditingTemplate(template);
    setShowCreateModal(true);
  };

  const handleDeleteTemplate = (templateId: number) => {
    if (confirm('Bạn có chắc chắn muốn xóa template này?')) {
      setTemplates(templates.filter(t => t.id !== templateId));
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return '🔴';
      case 'low': return '🟢';
      default: return '🟡';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Đang tải templates...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gray-900 text-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => router.push('/notifications')}
                className="text-gray-300 hover:text-white"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd"/>
                </svg>
              </button>
              <span className="text-lg font-semibold">WaiEdu Staff</span>
              <span className="text-gray-300">|</span>
              <span className="text-gray-300">Templates thông báo</span>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="text-sm">
                <div className="text-gray-300">Nguyen Van A (NV001)</div>
                <div className="text-gray-400">Phòng IT</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                <svg className="w-8 h-8 mr-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd"/>
                </svg>
                Templates Thông báo
              </h1>
              <p className="text-gray-600 mt-1">
                Quản lý và sử dụng các mẫu thông báo có sẵn
              </p>
            </div>
            <Button 
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd"/>
              </svg>
              Tạo template mới
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/>
                </svg>
                <input
                  type="text"
                  placeholder="Tìm kiếm templates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">Tất cả danh mục</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              
              <div className="text-sm text-gray-500">
                {filteredTemplates.length} templates
              </div>
            </div>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map(template => (
            <div key={template.id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {template.name}
                      {template.isSystem && (
                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          Hệ thống
                        </span>
                      )}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">{template.subject}</p>
                    <div className="flex items-center space-x-2 mb-3">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(template.priority)}`}>
                        {getPriorityIcon(template.priority)} {template.priority === 'high' ? 'Cao' : template.priority === 'low' ? 'Thấp' : 'Bình thường'}
                      </span>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                        {template.category}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {template.content.substring(0, 150)}...
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {template.tags.map(tag => (
                    <span key={tag} className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700">
                      #{tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span>Đã dùng {template.usageCount} lần</span>
                  <span>Cập nhật {template.updatedAt}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    onClick={() => handleUseTemplate(template)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                  >
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd"/>
                    </svg>
                    Sử dụng
                  </Button>
                  
                  {!template.isSystem && (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditTemplate(template)}
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
                        </svg>
                      </Button>
                      
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteTemplate(template.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd"/>
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 012 0v4a1 1 0 11-2 0V7zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V7a1 1 0 00-1-1z" clipRule="evenodd"/>
                        </svg>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd"/>
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Không tìm thấy template nào
            </h3>
            <p className="text-gray-500 mb-4">
              Thử thay đổi bộ lọc hoặc tạo template mới
            </p>
            <Button onClick={() => setShowCreateModal(true)}>
              Tạo template mới
            </Button>
          </div>
        )}
      </main>

      {/* Create/Edit Template Modal would go here */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                {editingTemplate ? 'Chỉnh sửa template' : 'Tạo template mới'}
              </h3>
              <p className="text-gray-600">
                Tính năng này sẽ được triển khai trong phiên bản tiếp theo.
              </p>
              <div className="flex justify-end space-x-3 mt-6">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowCreateModal(false);
                    setEditingTemplate(null);
                  }}
                >
                  Đóng
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
