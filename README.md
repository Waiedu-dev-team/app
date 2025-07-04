# WAIEDU Project

## 🚀 One-Command Setup (NEW!)

**Khởi động tất cả trong một lệnh:**
```bash
./start-dev.sh
```

**Dừng tất cả:**
```bash
./stop-dev.sh
```

### ✨ Tính năng All-in-One:
- 🔒 **Auto Firewall Setup**: Tự động mở ports cần thiết (3000, 3001, 80, 443, 22)
- 🌐 **0.0.0.0 Configuration**: Server sẵn sàng cho public sharing
- 🐳 **Backend Docker**: Tự động build và start container
- ⚛️ **Frontend Next.js**: Development server với hot reload
- 📱 **IP Detection**: Hiển thị local và public IP addresses
- 📋 **Share URLs**: Ready-to-share links cho LAN và Internet
- 🔧 **Environment Setup**: Tự động tạo .env với cấu hình optimal

---

## 🌐 Hệ thống WAIEDU

Hệ thống quản lý nhân sự và giáo dục bao gồm:
- **Backend API** (NestJS + TypeScript + Docker)
- **Frontend Web App** (Next.js + React + TypeScript)
- **Authentication** (JWT-based)
- **API Documentation** (Swagger/OpenAPI)
- **Public Sharing** (0.0.0.0 network binding)

---

## 🔧 Quick Start Options

### Option 1: One-Command Everything (Recommended)
```bash
./start-dev.sh    # Start everything
./stop-dev.sh     # Stop everything
```

### Option 2: Individual Services
```bash
# Backend only
cd waiedu_backend
./docker-run.sh

# Frontend only  
cd waiedu_staff
npm run dev
```

---

## 🌐 Access Your Application

### 🏠 Local Access
- **Backend API**: http://localhost:3000
- **Frontend App**: http://localhost:3001
- **API Docs**: http://localhost:3000/api-docs

### 🌍 Network Sharing (Same WiFi/LAN)
- **Backend**: http://YOUR_LOCAL_IP:3000
- **Frontend**: http://YOUR_LOCAL_IP:3001

### 🔗 Public Sharing
1. **With Router Port Forwarding**: Configure router 3000,3001 → YOUR_LOCAL_IP
2. **With ngrok (Instant)**: `ngrok http 3000` và `ngrok http 3001`

---

## 📊 Project Status

### ✅ Completed Features
- **Authentication System** (JWT-based login/logout)
- **User Management** (Create, list, get user APIs)
- **Frontend Integration** (Login page, protected routes, auth context)
- **Docker Containerization** (Multi-stage builds, health checks)
- **API Documentation** (Swagger UI with examples)
- **Public Sharing Ready** (0.0.0.0 binding, firewall config)
- **One-Command Setup** (Complete automation)

---

**Last Updated**: 07/02/2025 - Version 1.3.0  
**Status**: ✅ Production Ready for Public Sharing
