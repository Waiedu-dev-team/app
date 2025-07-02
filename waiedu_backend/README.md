# WAIEDU Backend API

## Mô tả
Backend API cho ứng dụng WAIEDU được xây dựng với NestJS và Swagger.

## Tính năng
- ✅ NestJS Framework
- ✅ Swagger API Documentation  
- ✅ TypeScript
- ✅ CORS enabled
- ✅ Development ready

## Cài đặt

```bash
# Cài đặt dependencies
yarn install

# Development mode
yarn start:dev

# Production mode  
yarn start:prod

# Build project
yarn build
```

## API Documentation

Sau khi chạy server, truy cập Swagger UI tại:
```
http://localhost:3000/api-docs
```

## Scripts có sẵn

```bash
# Development
yarn start:dev

# Production
yarn start:prod  

# Build
yarn build

# Test
yarn test

# Test e2e
yarn test:e2e

# Test coverage
yarn test:cov
```

## Cấu trúc Project

```
src/
├── app.controller.ts      # Controller chính
├── app.module.ts          # Module chính
├── app.service.ts         # Service chính
└── main.ts               # Entry point với Swagger config
```

## Environment Variables

Tạo file `.env` với các biến sau:

```bash
PORT=3000
NODE_ENV=development
APP_NAME=WAIEDU_Backend
```

## Phát triển tiếp theo

Project đã sẵn sàng để phát triển thêm các tính năng:
- Authentication & Authorization
- Database integration
- Additional modules & controllers
- Validation & middleware
- Error handling

---

Được tạo bởi NestJS CLI với Swagger integration.
