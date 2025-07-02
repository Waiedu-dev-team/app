#!/bin/bash

echo "⚛️  Starting WAIEDU Frontend only"
echo "================================"

# Kiểm tra port 3001
if lsof -i :3001 > /dev/null 2>&1; then
    echo "⚠️  Port 3001 đã bị chiếm!"
    echo "Dừng service đang chạy hoặc chọn port khác"
    exit 1
fi

echo "🚀 Starting Frontend on port 3001..."
echo "📍 Frontend: http://localhost:3001"
echo ""

# Kiểm tra nếu backend chạy
if ! curl -s http://localhost:3000 > /dev/null 2>&1; then
    echo "⚠️  Backend không chạy trên port 3000!"
    echo "💡 Hãy chạy './start-backend.sh' trước hoặc './start-dev.sh' để chạy cả hai"
    echo ""
    read -p "Vẫn muốn tiếp tục? (y/N): " confirm
    if [[ ! $confirm =~ ^[Yy]$ ]]; then
        exit 0
    fi
fi

cd waiedu_staff

# Kiểm tra dependencies
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

echo "🔄 Starting Next.js development server..."
PORT=3001 npm run dev
