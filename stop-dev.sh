#!/bin/bash

echo "🛑 WAIEDU Development Environment Stopper"
echo "========================================"
echo "Stopping all services: Backend (Docker) + Staff Frontend + Client Frontend"
echo ""

# Function to stop Docker containers
stop_backend() {
    echo "🐳 Stopping Backend (Docker containers)..."
    cd waiedu_backend
    
    if [ -f "docker-compose.yml" ]; then
        sudo docker-compose down
        if [ $? -eq 0 ]; then
            echo "✅ Backend containers stopped successfully!"
        else
            echo "⚠️  Some issues stopping backend containers"
        fi
    else
        echo "⚠️  docker-compose.yml not found"
    fi
    
    cd ..
}

# Function to stop frontends
stop_frontends() {
    echo "⚛️  Stopping Frontend Applications (Next.js)..."
    
    # Stop Staff Frontend (Port 3001)
    echo "📋 Stopping Staff Frontend..."
    if [ -f "logs/frontend-staff.pid" ]; then
        STAFF_PID=$(cat logs/frontend-staff.pid)
        if kill -0 $STAFF_PID 2>/dev/null; then
            kill $STAFF_PID
            echo "✅ Staff frontend process stopped (PID: $STAFF_PID)"
        else
            echo "⚠️  Staff frontend process not running (PID: $STAFF_PID)"
        fi
        rm -f logs/frontend-staff.pid
    fi
    
    # Stop Client Frontend (Port 3002)
    echo "📋 Stopping Client Frontend..."
    if [ -f "logs/frontend-client.pid" ]; then
        CLIENT_PID=$(cat logs/frontend-client.pid)
        if kill -0 $CLIENT_PID 2>/dev/null; then
            kill $CLIENT_PID
            echo "✅ Client frontend process stopped (PID: $CLIENT_PID)"
        else
            echo "⚠️  Client frontend process not running (PID: $CLIENT_PID)"
        fi
        rm -f logs/frontend-client.pid
    fi
    
    # Force kill any remaining Next.js processes on port 3001
    if lsof -i :3001 > /dev/null 2>&1; then
        echo "🔄 Force stopping processes on port 3001..."
        sudo fuser -k 3001/tcp 2>/dev/null
        sleep 1
    fi
    
    # Force kill any remaining Next.js processes on port 3002
    if lsof -i :3002 > /dev/null 2>&1; then
        echo "🔄 Force stopping processes on port 3002..."
        sudo fuser -k 3002/tcp 2>/dev/null
        sleep 1
    fi
    
    echo "✅ Frontend applications stopped"
}

# Function to stop any remaining processes on development ports
cleanup_ports() {
    echo "🧹 Cleaning up development ports..."
    
    # Check and kill processes on port 3000 (in case non-Docker backend is running)
    if lsof -i :3000 > /dev/null 2>&1; then
        echo "🔄 Stopping processes on port 3000..."
        sudo fuser -k 3000/tcp 2>/dev/null
    fi
    
    # Check and kill processes on port 3001 (Staff Frontend)
    if lsof -i :3001 > /dev/null 2>&1; then
        echo "🔄 Stopping processes on port 3001..."
        sudo fuser -k 3001/tcp 2>/dev/null
    fi
    
    # Check and kill processes on port 3002 (Client Frontend)
    if lsof -i :3002 > /dev/null 2>&1; then
        echo "🔄 Stopping processes on port 3002..."
        sudo fuser -k 3002/tcp 2>/dev/null
    fi
    
    sleep 2
    echo "✅ Port cleanup completed"
}

# Function to show status
show_status() {
    echo ""
    echo "📊 Current Status Check:"
    echo "======================"
    
    # Check Docker containers
    echo "🐳 Docker Containers:"
    if command -v docker-compose &> /dev/null; then
        cd waiedu_backend 2>/dev/null
        if [ -f "docker-compose.yml" ]; then
            container_status=$(sudo docker-compose ps 2>/dev/null | grep -v "Name\|----" | wc -l)
            if [ $container_status -eq 0 ]; then
                echo "   ✅ No backend containers running"
            else
                echo "   ⚠️  Some containers may still be running:"
                sudo docker-compose ps
            fi
        fi
        cd .. 2>/dev/null
    fi
    
    # Check ports
    echo ""
    echo "🔌 Port Status:"
    if lsof -i :3000 > /dev/null 2>&1; then
        echo "   ❌ Port 3000 (Backend): Still in use"
    else
        echo "   ✅ Port 3000 (Backend): Free"
    fi
    
    if lsof -i :3001 > /dev/null 2>&1; then
        echo "   ❌ Port 3001 (Staff Frontend): Still in use"
    else
        echo "   ✅ Port 3001 (Staff Frontend): Free"
    fi
    
    if lsof -i :3002 > /dev/null 2>&1; then
        echo "   ❌ Port 3002 (Client Frontend): Still in use"
    else
        echo "   ✅ Port 3002 (Client Frontend): Free"
    fi
}

# Main execution
echo "🔄 Stopping services..."

# Stop backend (Docker)
stop_backend

echo ""

# Stop frontends (Next.js)
stop_frontends

echo ""

# Cleanup any remaining processes
cleanup_ports

# Show final status
show_status

echo ""
echo "🎉 All WAIEDU services stopped!"
echo "=============================="
echo "✅ Backend Docker containers: Stopped"
echo "✅ Staff Frontend (Port 3001): Stopped"
echo "✅ Client Frontend (Port 3002): Stopped"
echo "✅ Development ports: Freed"
echo ""
echo "💡 To start all services: ./start-dev.sh"
echo "💡 To start only backend: cd waiedu_backend && ./docker-run.sh"
echo "💡 To start only staff app: cd waiedu_staff && PORT=3001 npm run dev"
echo "💡 To start only client app: cd client_staff && PORT=3002 npm run dev"
echo ""
echo "👋 Happy coding!"
