#!/bin/bash

echo "🛑 Dừng WAIEDU Development Environment"
echo "===================================="

# Stop Frontend
if [ -f logs/frontend.pid ]; then
    FRONTEND_PID=$(cat logs/frontend.pid)
    if ps -p $FRONTEND_PID > /dev/null; then
        echo "⚛️  Dừng Frontend (PID: $FRONTEND_PID)..."
        kill $FRONTEND_PID
        rm logs/frontend.pid
        echo "✅ Frontend đã dừng"
    else
        echo "ℹ️  Frontend không chạy"
        rm -f logs/frontend.pid
    fi
else
    echo "ℹ️  Không tìm thấy Frontend PID"
fi

# Stop Backend Docker
echo "🐳 Dừng Backend Docker containers..."
cd waiedu_backend
sudo docker-compose down
cd ..

echo "✅ Tất cả services đã dừng!"

# Cleanup
rm -f logs/*.pid

# Show port status
echo ""
echo "📊 Port status sau khi dừng:"
echo "Port 3000 (Backend): $(lsof -i :3000 > /dev/null 2>&1 && echo 'Vẫn bị chiếm' || echo 'Trống')"
echo "Port 3001 (Frontend): $(lsof -i :3001 > /dev/null 2>&1 && echo 'Vẫn bị chiếm' || echo 'Trống')"
