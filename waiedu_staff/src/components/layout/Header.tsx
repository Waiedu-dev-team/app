'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
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
import { LayoutDashboard, LogOut, User as UserIcon, Clock, Calendar } from 'lucide-react';

export default function Header() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  // Cập nhật thời gian realtime
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format thời gian hiển thị
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  // Format ngày hiển thị
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('vi-VN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Hiển thị trạng thái loading tinh tế
  if (isLoading) {
    return (
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="text-lg font-bold text-white">WaiEdu Staff</div>
            <div className="h-8 w-48 bg-white/20 rounded-md animate-pulse"></div>
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
            <div className="flex items-center space-x-4">
              {/* User Info & Time Display */}
              <div className="hidden md:flex flex-col items-end space-y-0.5">
                <div className="flex items-center space-x-2 text-sm">
                  <UserIcon className="w-4 h-4 text-blue-200" />
                  <span className="font-medium text-white">{user.fullName}</span>
                  <span className="text-blue-200">•</span>
                  <span className="text-blue-100 text-xs bg-white/10 px-2 py-0.5 rounded-full">
                    {user.department}
                  </span>
                </div>
                <div className="flex items-center space-x-3 text-xs text-blue-100">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(currentTime)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span className="font-mono bg-white/10 px-1.5 py-0.5 rounded">
                      {formatTime(currentTime)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Mobile User Info */}
              <div className="md:hidden flex flex-col items-end">
                <span className="text-sm font-medium">{user.fullName}</span>
                <span className="text-xs text-blue-100 font-mono">
                  {formatTime(currentTime)}
                </span>
              </div>

              {/* Avatar Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-white/20 focus:bg-white/20 transition-all">
                    <Avatar className="h-10 w-10 border-2 border-white/50 hover:border-white transition-all">
                      <AvatarImage src={`https://api.dicebear.com/8.x/initials/svg?seed=${user.fullName}`} alt={user.fullName} />
                      <AvatarFallback className="bg-white/20 text-white font-semibold">
                        {getAvatarFallback(user.fullName)}
                      </AvatarFallback>
                    </Avatar>
                    {/* Online indicator */}
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-80" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-3 p-2">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={`https://api.dicebear.com/8.x/initials/svg?seed=${user.fullName}`} alt={user.fullName} />
                          <AvatarFallback>{getAvatarFallback(user.fullName)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm font-medium leading-none">{user.fullName}</p>
                          <p className="text-xs leading-none text-muted-foreground pt-1">
                            {user.email}
                          </p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="bg-blue-50 p-2 rounded-lg">
                          <p className="text-blue-600 font-medium">ID Nhân viên</p>
                          <p className="text-blue-800 font-mono">{user.id}</p>
                        </div>
                        <div className="bg-green-50 p-2 rounded-lg">
                          <p className="text-green-600 font-medium">Phòng ban</p>
                          <p className="text-green-800">{user.department}</p>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-2 rounded-lg">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-600 flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            Thời gian hiện tại
                          </span>
                          <span className="font-mono text-gray-800">
                            {formatTime(currentTime)}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {formatDate(currentTime)}
                        </div>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <UserIcon className="mr-2 h-4 w-4" />
                    <span>Hồ sơ cá nhân</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={logout} 
                    className="text-red-500 focus:text-red-600 focus:bg-red-50 cursor-pointer"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Đăng xuất</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
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