#!/bin/bash

echo "🚀 WAIEDU Complete Development Environment Setup"
echo "=============================================="
echo "✨ One-command setup: Firewall + Backend + Frontend + Sharing"
echo ""

# Function to get local IP
get_local_ip() {
    local_ip=$(hostname -I | awk '{print $1}' 2>/dev/null)
    if [ -z "$local_ip" ]; then
        local_ip=$(ip route get 1.1.1.1 | grep -oP 'src \K\S+' 2>/dev/null)
    fi
    if [ -z "$local_ip" ]; then
        local_ip=$(ifconfig | grep -Eo 'inet (addr:)?([0-9]*\.){3}[0-9]*' | grep -Eo '([0-9]*\.){3}[0-9]*' | grep -v '127.0.0.1' | head -1)
    fi
    echo "$local_ip"
}

# Function to get public IP
get_public_ip() {
    public_ip=$(curl -s --max-time 5 ifconfig.me 2>/dev/null)
    if [ -z "$public_ip" ]; then
        public_ip=$(curl -s --max-time 5 ipinfo.io/ip 2>/dev/null)
    fi
    echo "$public_ip"
}

# Function to setup firewall
setup_firewall() {
    echo "🔒 Setting up firewall..."
    
    # Check if ufw is installed
    if ! command -v ufw &> /dev/null; then
        echo "📦 Installing UFW firewall..."
        sudo apt update && sudo apt install -y ufw
    fi

    # Enable UFW and open necessary ports
    echo "🌐 Configuring firewall rules..."
    sudo ufw --force enable > /dev/null 2>&1
    sudo ufw allow 3000/tcp > /dev/null 2>&1  # Backend API
    sudo ufw allow 3001/tcp > /dev/null 2>&1  # Staff Frontend
    sudo ufw allow 3002/tcp > /dev/null 2>&1  # Client Frontend
    sudo ufw allow 80/tcp > /dev/null 2>&1    # HTTP
    sudo ufw allow 443/tcp > /dev/null 2>&1   # HTTPS
    sudo ufw allow 22/tcp > /dev/null 2>&1    # SSH
    
    echo "✅ Firewall configured successfully!"
}

# Function to check if ports are available
check_port() {
    local port=$1
    local service=$2
    if lsof -i :$port > /dev/null 2>&1; then
        echo "⚠️  Port $port đã bị chiếm bởi service khác!"
        echo "   Stopping existing service trên port $port..."
        # Try to stop existing service
        sudo fuser -k $port/tcp > /dev/null 2>&1
        sleep 2
        if lsof -i :$port > /dev/null 2>&1; then
            echo "❌ Không thể giải phóng port $port. Vui lòng stop service thủ công."
            return 1
        fi
    fi
    return 0
}

# Function to create environment file
create_env_file() {
    echo "📝 Creating environment configuration..."
    
    cat > waiedu_backend/.env << EOF
# WAIEDU Backend Environment Variables
# Auto-generated by start-dev.sh

# Server Configuration (0.0.0.0 for public sharing)
PORT=3000
HOST=0.0.0.0
NODE_ENV=development

# JWT Configuration
JWT_SECRET=waiedu-secret-key-dev-$(date +%s)

# CORS Configuration (allow all for development)
CORS_ORIGIN=*

# Database Configuration (for future use)
# DB_HOST=localhost
# DB_PORT=5432
# DB_USERNAME=waiedu_user
# DB_PASSWORD=waiedu_password
# DB_DATABASE=waiedu
EOF
    
    echo "✅ Environment file created with 0.0.0.0 configuration!"
}

echo "🔧 STEP 1: System Preparation"
echo "============================="

# Setup firewall
setup_firewall

# Check ports availability
echo ""
echo "🔍 Checking port availability..."
check_port 3000 "Backend" || exit 1
check_port 3001 "Frontend Staff" || exit 1
check_port 3002 "Client Staff" || exit 1
echo "✅ All ports are available!"

# Create environment configuration
echo ""
create_env_file

echo ""
echo "🚀 STEP 2: Backend Setup (Local)"
echo "================================="

# Start Backend (waiedu_backend)
echo "🚀 Starting backend development server..."
cd waiedu_backend

# Check if node_modules exists, if not install dependencies
if [ ! -d "node_modules" ]; then
    echo "📦 Installing backend dependencies with Yarn..."
    yarn
fi

# Start backend in background
yarn start:dev > ../logs/backend.log 2>&1 &
BACKEND_PID=$!
echo $BACKEND_PID > ../logs/backend.pid

cd ..
echo "✅ Backend server starting on port 3000..."

echo ""
echo "⚛️  STEP 3: Frontend Setup (Yarn)"
echo "===================================="

# Create logs directory
mkdir -p logs

# Start Staff Frontend (waiedu_staff)
echo "🚀 Starting staff frontend development server..."
cd waiedu_staff

# Check if node_modules exists, if not install dependencies
if [ ! -d "node_modules" ]; then
    echo "📦 Installing staff frontend dependencies with Yarn..."
    yarn
fi

# Start staff frontend in background
PORT=3001 yarn dev > ../logs/frontend-staff.log 2>&1 &
FRONTEND_STAFF_PID=$!
echo $FRONTEND_STAFF_PID > ../logs/frontend-staff.pid

cd ..

echo "✅ Staff frontend server starting on port 3001..."

# Start Client Frontend (client_staff)  
echo "🚀 Starting client frontend development server..."
cd client_staff

# Check if node_modules exists, if not install dependencies
if [ ! -d "node_modules" ]; then
    echo "📦 Installing client frontend dependencies with Yarn..."
    yarn
fi

# Start client frontend in background
PORT=3002 yarn dev > ../logs/frontend-client.log 2>&1 &
FRONTEND_CLIENT_PID=$!
echo $FRONTEND_CLIENT_PID > ../logs/frontend-client.pid

cd ..

echo "✅ Client frontend server starting on port 3002..."

echo ""
echo "⏳ Waiting for services to fully start..."
sleep 8

echo ""
echo "🌐 STEP 4: Server Information & Sharing"
echo "======================================="

# Get IP addresses
LOCAL_IP=$(get_local_ip)
PUBLIC_IP=$(get_public_ip)

echo "📍 Server Access Information:"
echo "============================"

echo "🏠 Local Access:"
echo "   Backend:      http://localhost:3000"
echo "   Staff App:    http://localhost:3001"
echo "   Client App:   http://localhost:3002"
echo "   Swagger API:  http://localhost:3000/api"

if [ -n "$LOCAL_IP" ]; then
    echo ""
    echo "🌍 Network Access (Same WiFi/LAN):"
    echo "   Backend:      http://$LOCAL_IP:3000"
    echo "   Staff App:    http://$LOCAL_IP:3001"
    echo "   Client App:   http://$LOCAL_IP:3002"
    echo "   Swagger API:  http://$LOCAL_IP:3000/api"
fi

if [ -n "$PUBLIC_IP" ]; then
    echo ""
    echo "🌐 Public Access (with port forwarding):"
    echo "   Backend:      http://$PUBLIC_IP:3000"
    echo "   Staff App:    http://$PUBLIC_IP:3001"
    echo "   Client App:   http://$PUBLIC_IP:3002"
    echo "   (Configure router: 3000,3001,3002 → $LOCAL_IP:3000,3001,3002)"
fi

echo ""
echo "📋 Quick Share URLs:"
echo "==================="
if [ -n "$LOCAL_IP" ]; then
    echo "📱 LAN Sharing:"
    echo "   API Server:   http://$LOCAL_IP:3000"
    echo "   Staff App:    http://$LOCAL_IP:3001"
    echo "   Client App:   http://$LOCAL_IP:3002"
fi

echo ""
echo "🔗 Alternative: Use ngrok for instant public sharing:"
echo "   ngrok http 3000  # For backend API"
echo "   ngrok http 3001  # For frontend app"

echo ""
echo "🔧 Management Commands:"
echo "======================"
echo "   View backend logs:       tail -f logs/backend.log"
echo "   View staff frontend:     tail -f logs/frontend-staff.log"
echo "   View client frontend:    tail -f logs/frontend-client.log"
echo "   Stop all services:       ./stop-dev.sh"
echo "   Restart backend:         (Use Ctrl+C in terminal then ./start-dev.sh)"

echo ""
echo "🔒 Security Notes:"
echo "=================="
echo "   ✅ Firewall ports opened (3000, 3001, 3002, 80, 443, 22)"
echo "   ✅ Server configured for 0.0.0.0 (public access)"
echo "   ✅ CORS enabled for all origins"
echo "   ⚠️  For production: Change JWT_SECRET in .env"
echo "   ⚠️  For internet access: Configure router port forwarding"

echo ""
echo "🎉 WAIEDU Development Environment Ready!"
echo "========================================"
echo "✨ Backend API: Ready for connections from any IP (Port 3000)"
echo "✨ Staff App: Running with development features (Port 3001)" 
echo "✨ Client App: Running with development features (Port 3002)"
echo ""
echo "🚀 Happy coding! Use ./stop-dev.sh to stop all services."

echo ""
echo "🔄 Live Logs Preview (Ctrl+C to exit, services continue running):"
echo "================================================================="
sleep 3

# Show combined logs
if [ -f "logs/frontend-staff.log" ]; then
    echo "📋 Staff Frontend Logs:"
    tail -f logs/frontend-staff.log &
    TAIL_STAFF_PID=$!
fi

if [ -f "logs/frontend-client.log" ]; then
    echo "📋 Client Frontend Logs:"
    tail -f logs/frontend-client.log &
    TAIL_CLIENT_PID=$!
fi

echo "Press Ctrl+C to exit log view (services will continue running)"
echo "Use './stop-dev.sh' to stop all services"

# Wait for user to press Ctrl+C
trap 'echo ""; echo "👋 Log view stopped. Services are still running!"; echo "Use ./stop-dev.sh to stop all services"; kill $TAIL_STAFF_PID 2>/dev/null; kill $TAIL_CLIENT_PID 2>/dev/null; exit 0' INT

# Keep showing logs until user interrupts
while true; do
    sleep 1
done
