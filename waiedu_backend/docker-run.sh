#!/bin/bash

echo "🚀 Starting WAIEDU Backend with Docker Compose..."

# Stop any existing containers
sudo docker-compose down

# Start services
sudo docker-compose up -d

if [ $? -eq 0 ]; then
    echo "✅ Backend started successfully!"
    echo ""
    echo "🌐 API endpoints:"
    echo "   • Backend API: http://localhost:3000"
    echo "   • Swagger Docs: http://localhost:3000/api-docs"
    echo ""
    echo "📊 Container status:"
    sudo docker-compose ps
    echo ""
    echo "📝 View logs with: sudo docker-compose logs -f"
    echo "🛑 Stop with: sudo docker-compose down"
else
    echo "❌ Failed to start backend!"
    exit 1
fi 