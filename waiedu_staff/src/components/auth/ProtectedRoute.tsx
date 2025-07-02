'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
}

export default function ProtectedRoute({ 
  children, 
  requireAuth = true,
  redirectTo = '/login' 
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (requireAuth && !isAuthenticated) {
        // Chưa đăng nhập nhưng cần authentication -> redirect to login
        router.push(redirectTo);
      } else if (!requireAuth && isAuthenticated) {
        // Đã đăng nhập nhưng đang ở trang không cần auth (như login) -> redirect to home
        router.push('/home');
      }
    }
  }, [isAuthenticated, isLoading, requireAuth, router, redirectTo]);

  // Hiển thị loading khi đang check auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang kiểm tra đăng nhập...</p>
        </div>
      </div>
    );
  }

  // Nếu cần auth nhưng chưa đăng nhập -> không render gì (đã redirect)
  if (requireAuth && !isAuthenticated) {
    return null;
  }

  // Nếu không cần auth nhưng đã đăng nhập -> không render gì (đã redirect)
  if (!requireAuth && isAuthenticated) {
    return null;
  }

  // Render children nếu thỏa mãn điều kiện
  return <>{children}</>;
} 