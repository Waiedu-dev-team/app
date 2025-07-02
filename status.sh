#!/bin/bash

echo "📊 WAIEDU Development Environment Status"
echo "======================================="

# Check Backend
echo "🐳 Backend (Port 3000):"
if curl -s http://localhost:3000 > /dev/null 2>&1; then
    echo "   ✅ Running - http://localhost:3000"
    echo "   📚 Swagger: http://localhost:3000/api-docs"
else
    echo "   ❌ Not running"
fi

# Check Frontend
echo ""
echo "⚛️  Frontend (Port 3001):"
if curl -s http://localhost:3001 > /dev/null 2>&1; then
    echo "   ✅ Running - http://localhost:3001"
else
    echo "   ❌ Not running"
fi

# Check Docker containers
echo ""
echo "🐳 Docker Containers:"
cd waiedu_backend
if sudo docker-compose ps | grep -q "Up"; then
    sudo docker-compose ps
else
    echo "   ❌ No containers running"
fi
cd ..

# Check processes
echo ""
echo "🔄 Active Node.js processes:"
ps aux | grep -E "(node|npm|next)" | grep -v grep || echo "   ❌ No Node.js processes"

# Check ports
echo ""
echo "🌐 Port Usage:"
echo "   Port 3000: $(lsof -i :3000 2>/dev/null | tail -n +2 | wc -l) connection(s)"
echo "   Port 3001: $(lsof -i :3001 2>/dev/null | tail -n +2 | wc -l) connection(s)"

echo ""
echo "💡 Commands:"
echo "   ./start-dev.sh     - Start both services"
echo "   ./start-backend.sh - Start backend only"
echo "   ./start-frontend.sh - Start frontend only"
echo "   ./stop-dev.sh      - Stop all services"
