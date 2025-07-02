'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ComposeNotificationPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    to: '',
    cc: '',
    bcc: '',
    subject: '',
    content: '',
    priority: 'normal' as 'normal' | 'high' | 'urgent',
    category: 'internal' as 'internal' | 'support' | 'feedback' | 'announcement'
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [composeType, setComposeType] = useState<'new' | 'reply' | 'forward'>('new');

  useEffect(() => {
    // Check if there's compose data from localStorage (reply/forward)
    const storedData = localStorage.getItem('composeData');
    if (storedData) {
      try {
        const data = JSON.parse(storedData);
        setComposeType(data.type);
        
        if (data.type === 'reply') {
          setFormData(prev => ({
            ...prev,
            to: data.to,
            subject: data.subject,
            content: `\n\n--- Tin nhắn gốc ---\nTừ: ${data.originalFrom || 'N/A'}\nNội dung:\n${data.originalContent || ''}`
          }));
        } else if (data.type === 'forward') {
          setFormData(prev => ({
            ...prev,
            subject: data.subject,
            content: `\n\n--- Tin nhắn chuyển tiếp ---\nTừ: ${data.originalFrom || 'N/A'}\nNgày: ${data.originalDate || 'N/A'}\nNội dung:\n${data.originalContent || ''}`
          }));
        }
        
        // Clear localStorage after using
        localStorage.removeItem('composeData');
      } catch (error) {
        console.error('Error parsing compose data:', error);
      }
    }
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.to.trim()) {
      newErrors.to = 'Vui lòng nhập người nhận';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Vui lòng nhập tiêu đề';
    }
    
    if (!formData.content.trim()) {
      newErrors.content = 'Vui lòng nhập nội dung';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Implement actual API call
      console.log('Sending notification:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      alert('Thông báo đã được gửi thành công!');
      router.push('/notifications');
      
    } catch (err) {
      alert('Có lỗi xảy ra khi gửi thông báo. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveDraft = async () => {
    setIsLoading(true);
    
    try {
      // TODO: Save to drafts
      console.log('Saving draft:', formData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Bản nháp đã được lưu!');
    } catch (err) {
      alert('Có lỗi xảy ra khi lưu bản nháp.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoBack = () => {
    if (window.confirm('Bạn có muốn rời khỏi trang này? Dữ liệu chưa lưu sẽ bị mất.')) {
      router.back();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={handleGoBack} className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                <span>Quay lại</span>
              </Button>
              
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  {composeType === 'reply' ? 'Trả lời thông báo' : 
                   composeType === 'forward' ? 'Chuyển tiếp thông báo' : 
                   'Soạn thông báo mới'}
                </h1>
                <p className="text-sm text-gray-500">
                  {composeType === 'reply' ? 'Trả lời tin nhắn đã nhận' : 
                   composeType === 'forward' ? 'Chuyển tiếp tin nhắn cho người khác' : 
                   'Tạo và gửi thông báo mới'}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Button variant="outline" onClick={handleSaveDraft} disabled={isLoading}>
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6a1 1 0 10-2 0v5.586l-1.293-1.293z" />
                  <path d="M3 3a2 2 0 012-2h1a1 1 0 000 2H5v11a2 2 0 002 2h6a2 2 0 002-2V3h-1a1 1 0 100-2h1a2 2 0 012 2v12a4 4 0 01-4 4H7a4 4 0 01-4-4V3z" />
                </svg>
                Lưu nháp
              </Button>
              
              <Button onClick={handleSubmit} disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 3.5a6.5 6.5 0 106.5 6.5h-2a4.5 4.5 0 11-4.5-4.5V3.5z"/>
                    </svg>
                    Đang gửi...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                    Gửi thông báo
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Thông tin thông báo</CardTitle>
            <CardDescription>
              Điền đầy đủ thông tin để gửi thông báo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Recipients */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="to" className="block text-sm font-medium text-gray-700 mb-2">
                    Đến <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="to"
                    type="email"
                    value={formData.to}
                    onChange={(e) => handleInputChange('to', e.target.value)}
                    placeholder="recipient@waiedu.com"
                    className={errors.to ? 'border-red-500' : ''}
                  />
                  {errors.to && <p className="mt-1 text-sm text-red-600">{errors.to}</p>}
                </div>
                
                <div>
                  <label htmlFor="cc" className="block text-sm font-medium text-gray-700 mb-2">
                    CC
                  </label>
                  <Input
                    id="cc"
                    type="email"
                    value={formData.cc}
                    onChange={(e) => handleInputChange('cc', e.target.value)}
                    placeholder="cc@waiedu.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="bcc" className="block text-sm font-medium text-gray-700 mb-2">
                    BCC
                  </label>
                  <Input
                    id="bcc"
                    type="email"
                    value={formData.bcc}
                    onChange={(e) => handleInputChange('bcc', e.target.value)}
                    placeholder="bcc@waiedu.com"
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Tiêu đề <span className="text-red-500">*</span>
                </label>
                <Input
                  id="subject"
                  type="text"
                  value={formData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  placeholder="Nhập tiêu đề thông báo"
                  className={errors.subject ? 'border-red-500' : ''}
                />
                {errors.subject && <p className="mt-1 text-sm text-red-600">{errors.subject}</p>}
              </div>

              {/* Priority and Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
                    Mức độ ưu tiên
                  </label>
                  <select
                    id="priority"
                    value={formData.priority}
                    onChange={(e) => handleInputChange('priority', e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="normal">Bình thường</option>
                    <option value="high">Cao</option>
                    <option value="urgent">Khẩn cấp</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                    Danh mục
                  </label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="internal">Nội bộ</option>
                    <option value="support">Hỗ trợ khách hàng</option>
                    <option value="feedback">Phản hồi</option>
                    <option value="announcement">Thông báo chung</option>
                  </select>
                </div>
              </div>

              {/* Content */}
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                  Nội dung <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="content"
                  rows={12}
                  value={formData.content}
                  onChange={(e) => handleInputChange('content', e.target.value)}
                  placeholder="Nhập nội dung thông báo..."
                  className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${errors.content ? 'border-red-500' : ''}`}
                />
                {errors.content && <p className="mt-1 text-sm text-red-600">{errors.content}</p>}
              </div>

              {/* Form Actions */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <div className="text-sm text-gray-500">
                  <span className="text-red-500">*</span> Thông tin bắt buộc
                </div>
                
                <div className="flex items-center space-x-3">
                  <Button type="button" variant="outline" onClick={handleGoBack}>
                    Hủy
                  </Button>
                  <Button type="button" variant="outline" onClick={handleSaveDraft} disabled={isLoading}>
                    Lưu nháp
                  </Button>
                  <Button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
                    {isLoading ? 'Đang gửi...' : 'Gửi thông báo'}
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
