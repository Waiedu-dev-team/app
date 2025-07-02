#!/bin/bash

# WAIEDU Backend Docker Run Script
# Builds and runs the backend API with Docker Compose

echo "🚀 Starting WAIEDU Backend with Docker..."
echo "=========================================="

# Function to get local IP
get_local_ip() {
    # Try different methods to get local IP
    local_ip=$(hostname -I | awk '{print $1}' 2>/dev/null)
    if [ -z "$local_ip" ]; then
        local_ip=$(ip route get 1.1.1.1 | grep -oP 'src \K\S+' 2>/dev/null)
    fi
    if [ -z "$local_ip" ]; then
        local_ip=$(ifconfig | grep -Eo 'inet (addr:)?([0-9]*\.){3}[0-9]*' | grep -Eo '([0-9]*\.){3}[0-9]*' | grep -v '127.0.0.1' | head -1)
    fi
    echo "$local_ip"
}

# Build and start containers
echo "📦 Building Docker image..."
sudo docker-compose build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "🐳 Starting containers..."
    sudo docker-compose up -d
    
    if [ $? -eq 0 ]; then
        echo "✅ Containers started successfully!"
        echo ""
        
        # Get local IP
        LOCAL_IP=$(get_local_ip)
        
        echo "🌐 Server Access Information:"
        echo "=========================================="
        echo "📍 Local Access:"
        echo "   http://localhost:3000"
        echo "   http://127.0.0.1:3000"
        echo ""
        
        if [ -n "$LOCAL_IP" ]; then
            echo "🌍 Network Access (LAN/WiFi):"
            echo "   http://$LOCAL_IP:3000"
            echo ""
            echo "🌐 Public Access (Share with others):"
            echo "   http://$LOCAL_IP:3000"
            echo "   (Make sure port 3000 is open in firewall)"
        fi
        
        echo ""
        echo "📚 API Documentation:"
        echo "   http://localhost:3000/api-docs"
        if [ -n "$LOCAL_IP" ]; then
            echo "   http://$LOCAL_IP:3000/api-docs"
        fi
        
        echo ""
        echo "🔧 Management Commands:"
        echo "   View logs:    sudo docker-compose logs -f"
        echo "   Stop server:  sudo docker-compose down"
        echo "   Restart:      sudo docker-compose restart"
        echo "   Status:       sudo docker-compose ps"
        
        echo ""
        echo "🔒 Security Notes:"
        echo "   - Server is now accessible from any IP"
        echo "   - Make sure firewall allows port 3000"
        echo "   - For production, consider using HTTPS"
        echo "   - Change JWT_SECRET in .env for production"
        
        echo ""
        echo "🚀 WAIEDU Backend is now running!"
        
    else
        echo "❌ Failed to start containers"
        exit 1
    fi
else
    echo "❌ Build failed"
    exit 1
fi 