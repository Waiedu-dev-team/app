#!/bin/bash

# WAIEDU Backend Firewall Setup Script
# Opens necessary ports for sharing server publicly

echo "🔒 Setting up firewall for WAIEDU Backend..."
echo "============================================="

# Check if ufw is installed
if ! command -v ufw &> /dev/null; then
    echo "⚠️  UFW (Uncomplicated Firewall) is not installed."
    echo "   Installing UFW..."
    sudo apt update && sudo apt install -y ufw
fi

# Enable UFW if not already enabled
sudo ufw --force enable

# Open port 3000 for HTTP traffic
echo "🌐 Opening port 3000 for HTTP traffic..."
sudo ufw allow 3000/tcp
sudo ufw allow 3000/udp

# Optional: Open common web ports
echo "🔓 Opening additional web ports (optional)..."
sudo ufw allow 80/tcp   # HTTP
sudo ufw allow 443/tcp  # HTTPS
sudo ufw allow 22/tcp   # SSH (ensure you can still access your server)

# Show current firewall status
echo ""
echo "🔥 Current Firewall Status:"
sudo ufw status verbose

echo ""
echo "✅ Firewall setup complete!"
echo ""
echo "📋 Opened Ports:"
echo "   • Port 3000: WAIEDU Backend API"
echo "   • Port 80:   HTTP (for future web server)"
echo "   • Port 443:  HTTPS (for future SSL)"
echo "   • Port 22:   SSH (for server management)"
echo ""
echo "🔒 Security Reminder:"
echo "   • Only necessary ports are opened"
echo "   • Change default credentials before going live"
echo "   • Consider setting up fail2ban for additional security"
echo "   • Monitor access logs regularly" 