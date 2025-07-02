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