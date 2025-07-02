#!/bin/bash

# WAIEDU Backend Server Information Script
# Displays all necessary information for sharing server

echo "🌐 WAIEDU Backend Server Information"
echo "===================================="

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
    public_ip=$(curl -s ifconfig.me 2>/dev/null)
    if [ -z "$public_ip" ]; then
        public_ip=$(curl -s ipinfo.io/ip 2>/dev/null)
    fi
    if [ -z "$public_ip" ]; then
        public_ip=$(curl -s icanhazip.com 2>/dev/null)
    fi
    echo "$public_ip"
}

# Get IP addresses
LOCAL_IP=$(get_local_ip)
PUBLIC_IP=$(get_public_ip)

echo "📍 IP Address Information:"
echo "========================="
if [ -n "$LOCAL_IP" ]; then
    echo "🏠 Local/LAN IP:    $LOCAL_IP"
else
    echo "⚠️  Could not detect local IP"
fi

if [ -n "$PUBLIC_IP" ]; then
    echo "🌍 Public IP:       $PUBLIC_IP"
else
    echo "⚠️  Could not detect public IP (check internet connection)"
fi

echo ""
echo "🔗 Access URLs:"
echo "=============="
echo "📱 Local Access:"
echo "   http://localhost:3000"
echo "   http://127.0.0.1:3000"

if [ -n "$LOCAL_IP" ]; then
    echo ""
    echo "🏠 Network Access (same WiFi/LAN):"
    echo "   http://$LOCAL_IP:3000"
    echo "   http://$LOCAL_IP:3000/api-docs (Swagger)"
fi

if [ -n "$PUBLIC_IP" ]; then
    echo ""
    echo "🌍 Public Access (with port forwarding):"
    echo "   http://$PUBLIC_IP:3000"
    echo "   http://$PUBLIC_IP:3000/api-docs (Swagger)"
fi

echo ""
echo "🐳 Docker Container Status:"
echo "==========================="
sudo docker-compose ps

echo ""
echo "🔥 Firewall Status:"
echo "=================="
sudo ufw status

echo ""
echo "📊 Port Check:"
echo "============="
if ss -tlnp | grep -q ":3000"; then
    echo "✅ Port 3000 is listening"
else
    echo "❌ Port 3000 is not listening"
fi

echo ""
echo "📋 Share Instructions:"
echo "====================="
echo "1. 🏠 For local network sharing:"
if [ -n "$LOCAL_IP" ]; then
    echo "   Share this URL: http://$LOCAL_IP:3000"
else
    echo "   Get your IP with: ip addr show"
fi
echo ""
echo "2. 🌍 For internet sharing:"
echo "   a) Configure router port forwarding: 3000 → $LOCAL_IP:3000"
if [ -n "$PUBLIC_IP" ]; then
    echo "   b) Share this URL: http://$PUBLIC_IP:3000"
else
    echo "   b) Find your public IP and share: http://YOUR_PUBLIC_IP:3000"
fi
echo ""
echo "3. 🔒 Security checklist:"
echo "   □ Firewall port 3000 is open"
echo "   □ Router port forwarding configured (for public access)"
echo "   □ Strong passwords are set"
echo "   □ JWT secret is changed for production"

echo ""
echo "📞 Need help? Check DOCKER_README.md for detailed instructions!" 