#!/bin/bash

echo "🐳 Building WAIEDU Backend Docker Image..."

# Build the Docker image
sudo docker build -t waiedu-backend:latest .

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "📋 Image info:"
    sudo docker images waiedu-backend:latest
else
    echo "❌ Build failed!"
    exit 1
fi 