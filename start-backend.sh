#!/bin/bash

echo "🐳 Starting WAIEDU Backend only"
echo "==============================="

# Kiểm tra port 3000
if lsof -i :3000 > /dev/null 2>&1; then
    echo "⚠️  Port 3000 đã bị chiếm!"
    echo "Dừng service đang chạy hoặc chọn port khác"
    exit 1
fi

echo "🚀 Starting Backend on port 3000..."
echo "📍 API: http://localhost:3000"
echo "📍 Swagger: http://localhost:3000/api-docs"
echo ""

cd waiedu_backend
./docker-run.sh
