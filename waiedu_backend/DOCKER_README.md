# 🐳 WAIEDU Backend - Docker Guide

Hướng dẫn chạy WAIEDU Backend với Docker để dễ dàng share và deploy.

## 📋 Yêu cầu

- Docker (đã cài đặt)
- Docker Compose (thường đi kèm với Docker)

## 🚀 Cách sử dụng

### Phương pháp 1: Sử dụng Scripts (Khuyến nghị)

```bash
# Build Docker image
./docker-build.sh

# Chạy backend
./docker-run.sh

# Xem logs
docker-compose logs -f

# Dừng backend
docker-compose down
```

### Phương pháp 2: Manual Commands

```bash
# Build image
docker build -t waiedu-backend:latest .

# Chạy với docker-compose
docker-compose up -d

# Hoặc chạy trực tiếp container
docker run -d -p 3000:3000 --name waiedu-backend waiedu-backend:latest
```

## 🌐 Endpoints

Sau khi chạy thành công:

- **API Backend**: http://localhost:3000
- **Swagger Documentation**: http://localhost:3000/api-docs

## 📊 Monitoring

```bash
# Xem status containers
docker-compose ps

# Xem logs real-time
docker-compose logs -f backend

# Xem resource usage
docker stats
```

## 🔧 Cấu hình

### Environment Variables

Có thể tùy chỉnh trong `docker-compose.yml`:

```yaml
environment:
  - NODE_ENV=production
  - PORT=3000
  # Thêm biến môi trường khác nếu cần
```

### Port Mapping

Thay đổi port trong `docker-compose.yml`:

```yaml
ports:
  - "8080:3000"  # Chạy trên port 8080 thay vì 3000
```

## 🗄️ Chuẩn bị cho Database (Tương lai)

File `docker-compose.yml` đã chuẩn bị sẵn cho PostgreSQL và Redis. 
Khi cần, chỉ cần uncomment các service:

```yaml
# Bỏ comment để enable PostgreSQL
postgres:
  image: postgres:15-alpine
  # ... config
```

## 📦 Build Production Image

```bash
# Build với tag specific
docker build -t waiedu-backend:v1.0.0 .

# Push lên registry (nếu cần)
docker tag waiedu-backend:latest your-registry/waiedu-backend:latest
docker push your-registry/waiedu-backend:latest
```

## 🐛 Troubleshooting

### Container không start được:
```bash
# Xem logs chi tiết
docker-compose logs backend

# Restart container
docker-compose restart backend
```

### Port bị chiếm:
```bash
# Tìm process đang dùng port 3000
lsof -i :3000

# Thay đổi port trong docker-compose.yml
```

### Build lỗi:
```bash
# Clean up và rebuild
docker system prune -f
docker-compose build --no-cache
```

## 📝 Notes

- Container sử dụng non-root user để tăng security
- Multi-stage build để optimize image size
- Health check để monitor container status
- Data hiện tại lưu in-memory (sẽ mất khi restart)

## 🤝 Chia sẻ

### Để share với team:

1. **Chia sẻ source code** (recommend):
   ```bash
   git clone <repo>
   cd waiedu_backend
   ./docker-run.sh
   ```

2. **Chia sẻ Docker image**:
   ```bash
   # Export image
   docker save waiedu-backend:latest | gzip > waiedu-backend.tar.gz
   
   # Import image (on other machine)
   docker load < waiedu-backend.tar.gz
   docker run -d -p 3000:3000 waiedu-backend:latest
   ```

3. **Deploy lên cloud**:
   - Push image lên Docker Hub/AWS ECR/Google Container Registry
   - Deploy với Docker Swarm/Kubernetes/AWS ECS 

## 🚀 Quick Start

### Option 1: One-Command Start (Recommended)
```bash
cd waiedu_backend
./docker-run.sh
```

### Option 2: Manual Docker Compose
```bash
cd waiedu_backend
sudo docker-compose build
sudo docker-compose up -d
```

### Option 3: Traditional Development
```bash
cd waiedu_backend
yarn install
yarn start:dev
```

## 🌐 Sharing Server Publicly (NEW!)

### 🔧 Setup for Public Access

The server is now configured to accept connections from any IP address (`0.0.0.0`).

#### Step 1: Setup Firewall
```bash
cd waiedu_backend
./setup-firewall.sh
```

#### Step 2: Start Server
```bash
./docker-run.sh
```

#### Step 3: Get Server Information
```bash
./get-server-info.sh
```

### 📱 Access Methods

#### 1. 🏠 Local Network Access (Same WiFi/LAN)
- Anyone on your WiFi can access: `http://YOUR_LOCAL_IP:3000`
- Your local IP is automatically displayed when you run `./docker-run.sh`

#### 2. 🌍 Internet Access (Public)
**Requirements:**
- Configure router port forwarding: `Port 3000 → YOUR_LOCAL_IP:3000`
- Share your public IP: `http://YOUR_PUBLIC_IP:3000`

**Router Configuration:**
1. Access router admin panel (usually `192.168.1.1` or `192.168.0.1`)
2. Go to "Port Forwarding" or "Virtual Server"
3. Add rule: External Port `3000` → Internal IP `YOUR_LOCAL_IP`, Internal Port `3000`
4. Save and restart router

#### 3. 🔗 Easy Sharing with ngrok (Alternative)
```bash
# Install ngrok (one-time)
wget https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-linux-amd64.zip
unzip ngrok-stable-linux-amd64.zip
sudo mv ngrok /usr/local/bin/

# Start ngrok tunnel
ngrok http 3000
```

### 🔒 Security Configuration

#### Environment Variables
Create `.env` file in `waiedu_backend/`:
```env
# Server Configuration
PORT=3000
HOST=0.0.0.0
NODE_ENV=production

# Security
JWT_SECRET=your-super-secret-key-here

# CORS (allows all origins for public access)
CORS_ORIGIN=*
```

#### Firewall Status Check
```bash
sudo ufw status
```

#### Port Status Check
```bash
ss -tlnp | grep :3000
```

## 📋 Management Commands

### Server Information
```bash
./get-server-info.sh     # Get IP addresses and access URLs
```

### Docker Management
```bash
sudo docker-compose ps           # View container status
sudo docker-compose logs -f      # View live logs
sudo docker-compose restart      # Restart services
sudo docker-compose down         # Stop services
sudo docker-compose up -d        # Start services
```

### Firewall Management
```bash
sudo ufw status                   # Check firewall status
sudo ufw allow 3000              # Open port 3000
sudo ufw deny 3000               # Close port 3000
```

## 🛠️ Deployment Options

### 1. Traditional Docker Build
```bash
# Build image
docker build -t waiedu-backend:v1.0.0 .

# Run container
docker run -d -p 0.0.0.0:3000:3000 \
  --name waiedu-backend \
  waiedu-backend:v1.0.0
```

### 2. Docker Compose (Recommended)
```bash
# Development
sudo docker-compose up -d

# Production
sudo docker-compose -f docker-compose.yml up -d
```

### 3. Cloud Deployment
```bash
# Export image for sharing
docker save waiedu-backend:latest | gzip > waiedu-backend.tar.gz

# Upload to cloud registry
docker tag waiedu-backend:latest your-registry/waiedu-backend:latest
docker push your-registry/waiedu-backend:latest
```

## 🌐 Network Configuration

### Docker Network
- **Network Name**: `waiedu-network`
- **Driver**: `bridge`
- **Port Binding**: `0.0.0.0:3000:3000`

### Container Configuration
- **Host**: `0.0.0.0` (accepts connections from any IP)
- **Port**: `3000`
- **Health Check**: Enabled with 30s intervals
- **Restart Policy**: `unless-stopped`

## 📊 Monitoring & Troubleshooting

### Health Check
```bash
# Check container health
sudo docker-compose ps

# Manual health check
curl http://localhost:3000/
```

### Logs
```bash
# View all logs
sudo docker-compose logs

# Follow logs real-time
sudo docker-compose logs -f backend

# View specific container logs
sudo docker logs waiedu_backend_backend_1
```

### Connection Testing
```bash
# Test local connection
curl http://localhost:3000

# Test network connection (replace with your IP)
curl http://192.168.1.100:3000

# Test from another machine
curl http://YOUR_PUBLIC_IP:3000
```

### Common Issues & Solutions

#### 1. Can't access from other machines
- ✅ Check firewall: `sudo ufw status`
- ✅ Verify port binding: `ss -tlnp | grep :3000`
- ✅ Check Docker logs: `sudo docker-compose logs`

#### 2. Public access not working
- ✅ Configure router port forwarding
- ✅ Check ISP doesn't block ports
- ✅ Verify public IP: `curl ifconfig.me`

#### 3. Container won't start
- ✅ Check Docker service: `sudo systemctl status docker`
- ✅ Check logs: `sudo docker-compose logs`
- ✅ Rebuild image: `sudo docker-compose build --no-cache`

## 🔐 Security Best Practices

### For Public Deployment
1. **Change JWT Secret**: Update `JWT_SECRET` in environment
2. **Use HTTPS**: Setup SSL certificate with reverse proxy
3. **Rate Limiting**: Implement API rate limiting
4. **Monitor Access**: Setup logging and monitoring
5. **Update Regularly**: Keep Docker images updated

### Recommended Security Stack
```yaml
# Future security enhancements
services:
  nginx:          # Reverse proxy with SSL
  fail2ban:       # Intrusion detection
  certbot:        # SSL certificates
  prometheus:     # Monitoring
```

## 📚 API Endpoints

### 🌐 Access URLs
- **Local**: `http://localhost:3000`
- **Network**: `http://YOUR_LOCAL_IP:3000`
- **Public**: `http://YOUR_PUBLIC_IP:3000`

### 📖 API Documentation
- **Swagger UI**: `/api-docs`
- **OpenAPI JSON**: `/api-docs-json`

### 🔑 Main Endpoints
- `POST /auth/login` - User authentication
- `POST /users` - Create user account
- `GET /users` - List all users
- `GET /users/:id` - Get user by ID

## 🆘 Support

### Script Help
```bash
./docker-run.sh --help          # Docker run help
./setup-firewall.sh --help      # Firewall setup help
./get-server-info.sh --help     # Server info help
```

### Documentation
- **Main Docs**: `../docs.md`
- **API Docs**: `http://localhost:3000/api-docs`
- **GitHub Issues**: Report problems and request features

### Commands Reference
```bash
# Quick commands for copy-paste
./docker-run.sh                 # Start everything
./get-server-info.sh            # Get access info
sudo docker-compose logs -f     # View logs
sudo docker-compose down        # Stop server
```

---

**Last Updated**: 07/02/2025 - Version 1.2.0  
**Created by**: AI Assistant  
**Status**: ✅ Production Ready for Public Sharing 