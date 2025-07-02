'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Header from '@/components/layout/Header';

export default function CreateCustomerPage() {
  const router = useRouter();
  
  // Form state for customer account creation
  const [customerForm, setCustomerForm] = useState({
    fullName: '',
    email: '',
    defaultPassword: '',
    field: '',
    taxCode: '',
    city: '',
    district: ''
  });
  const [isCreatingCustomer, setIsCreatingCustomer] = useState(false);

  // Data for cities and districts
  const cities = [
    { value: 'hanoi', label: 'Hà Nội' },
    { value: 'hcm', label: 'Hồ Chí Minh' },
    { value: 'danang', label: 'Đà Nẵng' },
    { value: 'haiphong', label: 'Hải Phòng' },
    { value: 'cantho', label: 'Cần Thơ' },
    { value: 'binhduong', label: 'Bình Dương' },
    { value: 'dongthap', label: 'Đồng Tháp' },
    { value: 'baria', label: 'Bà Rịa - Vũng Tàu' }
  ];

  const districtsByCity: { [key: string]: { value: string; label: string }[] } = {
    hanoi: [
      { value: 'hoankiem', label: 'Hoàn Kiếm' },
      { value: 'badinh', label: 'Ba Đình' },
      { value: 'dongda', label: 'Đống Đa' },
      { value: 'haibatrung', label: 'Hai Bà Trưng' },
      { value: 'thanxuan', label: 'Thanh Xuân' },
      { value: 'caugiay', label: 'Cầu Giấy' },
      { value: 'tayho', label: 'Tây Hồ' },
      { value: 'longbien', label: 'Long Biên' }
    ],
    hcm: [
      { value: 'quan1', label: 'Quận 1' },
      { value: 'quan3', label: 'Quận 3' },
      { value: 'quan5', label: 'Quận 5' },
      { value: 'quan7', label: 'Quận 7' },
      { value: 'binhthanh', label: 'Bình Thạnh' },
      { value: 'tanbinh', label: 'Tân Bình' },
      { value: 'tanphu', label: 'Tân Phú' },
      { value: 'thuduc', label: 'Thủ Đức' }
    ],
    danang: [
      { value: 'haichau', label: 'Hải Châu' },
      { value: 'thanhkhe', label: 'Thanh Khê' },
      { value: 'lienchieu', label: 'Liên Chiểu' },
      { value: 'nguhanhson', label: 'Ngũ Hành Sơn' },
      { value: 'sontra', label: 'Sơn Trà' },
      { value: 'camle', label: 'Cẩm Lệ' }
    ],
    haiphong: [
      { value: 'honggai', label: 'Hồng Gai' },
      { value: 'ngoguyen', label: 'Ngô Quyền' },
      { value: 'lecha', label: 'Lê Chân' },
      { value: 'haian', label: 'Hải An' }
    ],
    cantho: [
      { value: 'ninhkieu', label: 'Ninh Kiều' },
      { value: 'binhthuy', label: 'Bình Thủy' },
      { value: 'cairang', label: 'Cái Răng' },
      { value: 'omon', label: 'Ô Môn' }
    ]
  };

  const businessFields = [
    { value: 'technology', label: 'Công nghệ thông tin' },
    { value: 'finance', label: 'Tài chính - Ngân hàng' },
    { value: 'retail', label: 'Bán lẻ' },
    { value: 'manufacturing', label: 'Sản xuất' },
    { value: 'education', label: 'Giáo dục' },
    { value: 'healthcare', label: 'Y tế' },
    { value: 'real_estate', label: 'Bất động sản' },
    { value: 'tourism', label: 'Du lịch - Dịch vụ' },
    { value: 'logistics', label: 'Vận tải - Logistics' },
    { value: 'other', label: 'Khác' }
  ];

  // Customer form handlers
  const handleCustomerFormChange = (field: string, value: string) => {
    setCustomerForm(prev => ({
      ...prev,
      [field]: value
    }));

    // Reset district when city changes
    if (field === 'city') {
      setCustomerForm(prev => ({
        ...prev,
        district: ''
      }));
    }
  };

  const generateDefaultPassword = () => {
    const randomPassword = Math.random().toString(36).slice(-8);
    setCustomerForm(prev => ({
      ...prev,
      defaultPassword: randomPassword
    }));
  };

  const handleCustomerFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreatingCustomer(true);

    try {
      // Prepare data for API call
      const customerData = {
        email: customerForm.email,
        fullName: customerForm.fullName,
        defaultPassword: customerForm.defaultPassword,
        field: customerForm.field,
        taxCode: customerForm.taxCode,
        city: customerForm.city,
        district: customerForm.district
      };

      console.log('Sending customer data to API:', customerData);

      // Call real API
      const response = await fetch('http://localhost:3000/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customerData)
      });

      const responseData = await response.json();

      if (response.ok) {
        // Success
        console.log('Customer created successfully:', responseData);
        alert(`Tài khoản khách hàng đã được tạo thành công!\n\nID: ${responseData.id}\nEmail: ${responseData.email}\nTên: ${responseData.fullName}\nLĩnh vực: ${responseData.field}\nMã số thuế: ${responseData.taxCode}\nĐịa chỉ: ${responseData.district}, ${responseData.city}`);
        
        // Reset form
        setCustomerForm({
          fullName: '',
          email: '',
          defaultPassword: '',
          field: '',
          taxCode: '',
          city: '',
          district: ''
        });
      } else {
        // API returned error
        console.error('API Error:', responseData);
        const errorMessage = Array.isArray(responseData.message) 
          ? responseData.message.join('\n') 
          : responseData.message || 'Có lỗi xảy ra khi tạo tài khoản';
        alert(`Lỗi: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Network Error:', error);
      alert('Không thể kết nối đến server. Vui lòng kiểm tra:\n- Server backend có đang chạy không?\n- Port 3000 có available không?\n- CORS có được cấu hình đúng không?');
    } finally {
      setIsCreatingCustomer(false);
    }
  };

  const validateForm = () => {
    return customerForm.fullName && 
           customerForm.email && 
           customerForm.defaultPassword && 
           customerForm.field && 
           customerForm.taxCode && 
           customerForm.city && 
           customerForm.district;
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <Header />

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white py-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-4">
                  Tạo Tài Khoản Khách Hàng
                </h1>
                <p className="text-xl text-blue-100 mb-6">
                  Tạo tài khoản mới cho khách hàng doanh nghiệp một cách nhanh chóng và dễ dàng
                </p>
                <div className="flex items-center space-x-4 text-sm text-blue-100">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Thông tin bảo mật
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Xử lý nhanh chóng
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Hỗ trợ 24/7
                  </div>
                </div>
              </div>
              <div className="hidden lg:block">
                <div className="w-64 h-64 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <svg className="w-32 h-32 text-white/80" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-6 py-12">
          {/* Navigation Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
            <button 
              onClick={() => router.push('/home')}
              className="hover:text-blue-600 transition-colors duration-200"
            >
              Trang chủ
            </button>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-gray-900 font-medium">Tạo tài khoản khách hàng</span>
          </nav>

          {/* Form Container */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            {/* Form Header */}
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-8 py-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Thông tin khách hàng</h2>
                    <p className="text-gray-600 mt-1">Vui lòng điền đầy đủ thông tin để tạo tài khoản</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  onClick={() => router.push('/home')}
                  className="hover:bg-gray-50"
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0L3.586 10l4.707-4.707a1 1 0 011.414 1.414L6.414 10l3.293 3.293a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                  Quay lại
                </Button>
              </div>
            </div>

            {/* Form Content */}
            <form onSubmit={handleCustomerFormSubmit} className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Personal Info */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                      Thông tin cá nhân
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Full Name */}
                      <div className="md:col-span-2">
                        <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-3">
                          Họ và tên <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          value={customerForm.fullName}
                          onChange={(e) => handleCustomerFormChange('fullName', e.target.value)}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-300"
                          placeholder="Nhập họ và tên khách hàng"
                          required
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-3">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            id="email"
                            value={customerForm.email}
                            onChange={(e) => handleCustomerFormChange('email', e.target.value)}
                            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-300"
                            placeholder="example@company.com"
                            required
                          />
                          <svg className="w-5 h-5 text-gray-400 absolute left-4 top-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                          </svg>
                        </div>
                      </div>

                      {/* Default Password */}
                      <div>
                        <label htmlFor="defaultPassword" className="block text-sm font-semibold text-gray-700 mb-3">
                          Mật khẩu mặc định <span className="text-red-500">*</span>
                        </label>
                        <div className="flex space-x-3">
                          <div className="relative flex-1">
                            <input
                              type="text"
                              id="defaultPassword"
                              value={customerForm.defaultPassword}
                              onChange={(e) => handleCustomerFormChange('defaultPassword', e.target.value)}
                              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-300"
                              placeholder="Nhập mật khẩu"
                              required
                            />
                            <svg className="w-5 h-5 text-gray-400 absolute left-4 top-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <Button
                            type="button"
                            onClick={generateDefaultPassword}
                            variant="outline"
                            className="px-4 py-3 hover:bg-blue-50 hover:border-blue-300 rounded-xl"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                            </svg>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Business Info */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z" clipRule="evenodd" />
                      </svg>
                      Thông tin doanh nghiệp
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Business Field */}
                      <div className="md:col-span-2">
                        <label htmlFor="field" className="block text-sm font-semibold text-gray-700 mb-3">
                          Lĩnh vực kinh doanh <span className="text-red-500">*</span>
                        </label>
                        <select
                          id="field"
                          value={customerForm.field}
                          onChange={(e) => handleCustomerFormChange('field', e.target.value)}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white hover:border-blue-300"
                          required
                        >
                          <option value="">-- Chọn lĩnh vực --</option>
                          {businessFields.map(field => (
                            <option key={field.value} value={field.value}>
                              {field.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Tax Code */}
                      <div className="md:col-span-2">
                        <label htmlFor="taxCode" className="block text-sm font-semibold text-gray-700 mb-3">
                          Mã số thuế <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            id="taxCode"
                            value={customerForm.taxCode}
                            onChange={(e) => handleCustomerFormChange('taxCode', e.target.value)}
                            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-300"
                            placeholder="0123456789"
                            required
                          />
                          <svg className="w-5 h-5 text-gray-400 absolute left-4 top-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>

                      {/* City */}
                      <div>
                        <label htmlFor="city" className="block text-sm font-semibold text-gray-700 mb-3">
                          Thành phố/Tỉnh <span className="text-red-500">*</span>
                        </label>
                        <select
                          id="city"
                          value={customerForm.city}
                          onChange={(e) => handleCustomerFormChange('city', e.target.value)}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white hover:border-blue-300"
                          required
                        >
                          <option value="">-- Chọn thành phố/tỉnh --</option>
                          {cities.map(city => (
                            <option key={city.value} value={city.value}>
                              {city.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* District */}
                      <div>
                        <label htmlFor="district" className="block text-sm font-semibold text-gray-700 mb-3">
                          Quận/Huyện <span className="text-red-500">*</span>
                        </label>
                        <select
                          id="district"
                          value={customerForm.district}
                          onChange={(e) => handleCustomerFormChange('district', e.target.value)}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white hover:border-blue-300 disabled:bg-gray-50 disabled:cursor-not-allowed"
                          disabled={!customerForm.city}
                          required
                        >
                          <option value="">-- Chọn quận/huyện --</option>
                          {customerForm.city && districtsByCity[customerForm.city]?.map(district => (
                            <option key={district.value} value={district.value}>
                              {district.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Preview & Actions */}
                <div className="space-y-6">
                  {/* Form Preview */}
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100 sticky top-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                        <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a2 2 0 00-2 2v6a2 2 0 002 2h8a2 2 0 002-2V6a2 2 0 00-2-2V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5z" clipRule="evenodd" />
                      </svg>
                      Xem trước thông tin
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="bg-white rounded-lg p-4 border border-purple-200">
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between">
                            <span className="font-medium text-gray-600">Tên:</span>
                            <span className="text-gray-900 font-medium text-right max-w-32 truncate">
                              {customerForm.fullName || '(Chưa nhập)'}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium text-gray-600">Email:</span>
                            <span className="text-gray-900 font-medium text-right max-w-32 truncate">
                              {customerForm.email || '(Chưa nhập)'}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium text-gray-600">Lĩnh vực:</span>
                            <span className="text-gray-900 font-medium text-right max-w-32 truncate">
                              {businessFields.find(f => f.value === customerForm.field)?.label || '(Chưa chọn)'}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium text-gray-600">MST:</span>
                            <span className="text-gray-900 font-medium text-right max-w-32 truncate">
                              {customerForm.taxCode || '(Chưa nhập)'}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium text-gray-600">Địa chỉ:</span>
                            <span className="text-gray-900 font-medium text-right max-w-32 truncate">
                              {customerForm.city && customerForm.district 
                                ? `${districtsByCity[customerForm.city]?.find(d => d.value === customerForm.district)?.label}, ${cities.find(c => c.value === customerForm.city)?.label}`
                                : '(Chưa chọn)'
                              }
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Progress Indicator */}
                      <div className="bg-white rounded-lg p-4 border border-purple-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-600">Tiến độ hoàn thành</span>
                          <span className="text-sm font-bold text-purple-600">
                            {Math.round((Object.values(customerForm).filter(Boolean).length / 7) * 100)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(Object.values(customerForm).filter(Boolean).length / 7) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="bg-white rounded-xl p-6 border border-gray-200 space-y-4">
                    <Button
                      type="submit"
                      disabled={!validateForm() || isCreatingCustomer}
                      className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed rounded-xl text-lg"
                    >
                      {isCreatingCustomer ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Đang tạo tài khoản...
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                          </svg>
                          Tạo tài khoản khách hàng
                        </>
                      )}
                    </Button>
                    
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setCustomerForm({
                        fullName: '',
                        email: '',
                        defaultPassword: '',
                        field: '',
                        taxCode: '',
                        city: '',
                        district: ''
                      })}
                      className="w-full py-3 rounded-xl border-2 hover:bg-gray-50"
                    >
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                      </svg>
                      Đặt lại form
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
} 