'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LayoutDashboard, LogOut, User as UserIcon } from 'lucide-react';

export default function Header() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();

  // Hiển thị trạng thái loading tinh tế
  if (isLoading) {
    return (
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="text-lg font-bold text-white">WaiEdu Staff</div>
            <div className="h-8 w-24 bg-white/20 rounded-md animate-pulse"></div>
          </div>
        </div>
      </header>
    );
  }

  // Lấy 2 chữ cái đầu của tên để làm fallback cho avatar
  const getAvatarFallback = (name: string | undefined) => {
    if (!name) return '??';
    const parts = name.split(' ');
    if (parts.length > 1) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg text-white sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/home" className="text-lg font-bold hover:text-blue-100 transition-colors">
              WaiEdu Staff
          </Link>
          
          {/* User Info and Actions */}
          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-white/20 focus:bg-white/20">
                  <Avatar className="h-10 w-10 border-2 border-white/50 group-hover:border-white transition-all">
                    <AvatarImage src={`https://api.dicebear.com/8.x/initials/svg?seed=${user.fullName}`} alt={user.fullName} />
                    <AvatarFallback>{getAvatarFallback(user.fullName)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-2">
                    <div>
                      <p className="text-sm font-medium leading-none">{user.fullName}</p>
                      <p className="text-xs leading-none text-muted-foreground pt-1">
                        {user.email}
                      </p>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      <p>ID: {user.id}</p>
                      <p>Phòng ban: {user.department}</p>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <UserIcon className="mr-2 h-4 w-4" />
                  <span>Hồ sơ</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-red-500 focus:text-red-600 focus:bg-red-50">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Đăng xuất</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-2">
              <Button asChild variant="ghost" className="hover:bg-white/20 hover:text-white">
                <Link href="/login">Đăng nhập</Link>
              </Button>
              <Button asChild className="bg-white text-blue-700 hover:bg-blue-50">
                <Link href="/register">Đăng ký</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
} 