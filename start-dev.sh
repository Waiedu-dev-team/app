#!/bin/bash

echo "🚀 WAIEDU Development Environment Starter"
echo "========================================"

# Kiểm tra nếu ports đã bị chiếm
check_port() {
    local port=$1
    local service=$2
    if lsof -i :$port > /dev/null 2>&1; then
        echo "⚠️  Port $port đã bị chiếm bởi service khác!"
        echo "   Dừng service đang chạy hoặc chọn port khác cho $service"
        return 1
    fi
    return 0
}

# Kiểm tra ports
echo "🔍 Kiểm tra ports..."
check_port 3000 "Backend" || exit 1
check_port 3001 "Frontend" || exit 1

echo "✅ Ports sẵn sàng!"
echo ""

# Tạo log directory
mkdir -p logs

echo "🎯 Khởi động services..."
echo "📍 Backend API: http://localhost:3000"
echo "📍 Frontend: http://localhost:3001"
echo "📍 Swagger Docs: http://localhost:3000/api-docs"
echo ""

# Start Backend (Docker)
echo "🐳 Starting Backend (Docker) on port 3000..."
cd waiedu_backend
./docker-run.sh > ../logs/backend.log 2>&1 &
BACKEND_PID=$!
cd ..

# Đợi backend khởi động
echo "⏳ Đợi backend khởi động..."
sleep 10

# Start Frontend (Development mode)
echo "⚛️  Starting Frontend (Next.js) on port 3001..."
cd waiedu_staff
PORT=3001 npm run dev > ../logs/frontend.log 2>&1 &
FRONTEND_PID=$!
cd ..

# Lưu PIDs để có thể stop sau này
echo $BACKEND_PID > logs/backend.pid
echo $FRONTEND_PID > logs/frontend.pid

echo ""
echo "🎉 Cả hai services đang chạy!"
echo ""
echo "📊 Monitoring:"
echo "   Backend logs:  tail -f logs/backend.log"
echo "   Frontend logs: tail -f logs/frontend.log"
echo ""
echo "🛑 Để dừng các services:"
echo "   ./stop-dev.sh"
echo ""
echo "✨ Happy coding! Nhấn Ctrl+C để xem logs hoặc chạy stop-dev.sh để dừng"

# Monitor logs (optional)
echo "🔄 Theo dõi logs (Ctrl+C để thoát):"
sleep 3
tail -f logs/backend.log logs/frontend.log
