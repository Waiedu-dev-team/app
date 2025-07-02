# 🚀 WAIEDU Development Scripts

Các script tiện ích để chạy development environment dễ dàng.

## 📋 Port Configuration

- **Backend**: Port 3000 (Docker)
- **Frontend**: Port 3001 (Next.js)

## 🛠️ Scripts Available

### 1. Menu chính (Khuyến nghị)
```bash
./dev.sh
```
Interactive menu để chọn actions.

### 2. Start cả hai services
```bash
./start-dev.sh
```
- Backend: http://localhost:3000
- Frontend: http://localhost:3001
- Swagger: http://localhost:3000/api-docs

### 3. Start riêng từng service
```bash
./start-backend.sh    # Chỉ backend
./start-frontend.sh   # Chỉ frontend
```

### 4. Stop tất cả
```bash
./stop-dev.sh
```

### 5. Check status
```bash
./status.sh
```

## 📁 Logs
Logs được lưu trong thư mục `logs/`:
- `backend.log` - Backend container logs
- `frontend.log` - Next.js development logs

## 🔧 Troubleshooting

### Port đã bị chiếm?
```bash
# Kiểm tra port
lsof -i :3000
lsof -i :3001

# Kill process
kill -9 <PID>
```

### Docker issues?
```bash
cd waiedu_backend
sudo docker-compose down
sudo docker-compose up -d
```

### Frontend dependencies?
```bash
cd waiedu_staff
npm install
```

## 🎯 Quick Start

1. **Lần đầu sử dụng:**
   ```bash
   ./dev.sh
   # Chọn option 1
   ```

2. **Development hàng ngày:**
   ```bash
   ./start-dev.sh
   ```

3. **Khi xong việc:**
   ```bash
   ./stop-dev.sh
   ```

## 📊 What Each Script Does

| Script | Description | Ports | Mode |
|--------|-------------|-------|------|
| `dev.sh` | Interactive menu | - | Menu |
| `start-dev.sh` | Start both services | 3000, 3001 | Background |
| `start-backend.sh` | Backend only | 3000 | Foreground |
| `start-frontend.sh` | Frontend only | 3001 | Foreground |
| `stop-dev.sh` | Stop all | - | Stop |
| `status.sh` | Check status | - | Check |

Happy coding! 🎉
