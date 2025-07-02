#!/bin/bash

clear
echo "🚀 WAIEDU Development Environment Manager"
echo "========================================"
echo ""
echo "Chọn action:"
echo ""
echo "1. 🚀 Start cả Backend + Frontend (Port 3000 + 3001)"
echo "2. 🐳 Start chỉ Backend (Port 3000)"
echo "3. ⚛️  Start chỉ Frontend (Port 3001)"
echo "4. 🛑 Stop tất cả services"
echo "5. 📊 Xem status hiện tại"
echo "6. 📝 Xem logs"
echo "0. ❌ Thoát"
echo ""
read -p "Nhập lựa chọn (0-6): " choice

case $choice in
    1)
        echo ""
        echo "🚀 Starting Full Development Environment..."
        ./start-dev.sh
        ;;
    2)
        echo ""
        echo "🐳 Starting Backend Only..."
        ./start-backend.sh
        ;;
    3)
        echo ""
        echo "⚛️  Starting Frontend Only..."
        ./start-frontend.sh
        ;;
    4)
        echo ""
        echo "🛑 Stopping All Services..."
        ./stop-dev.sh
        ;;
    5)
        echo ""
        ./status.sh
        echo ""
        read -p "Nhấn Enter để tiếp tục..."
        ./dev.sh
        ;;
    6)
        echo ""
        echo "📝 Logs (Ctrl+C để thoát):"
        echo "=========================="
        if [ -d "logs" ]; then
            tail -f logs/*.log 2>/dev/null || echo "Không có logs nào"
        else
            echo "Chưa có logs. Chạy services trước."
        fi
        ;;
    0)
        echo "👋 Bye!"
        exit 0
        ;;
    *)
        echo "❌ Lựa chọn không hợp lệ!"
        sleep 2
        ./dev.sh
        ;;
esac
