# 校园二手交易平台 - MongoDB 后端

这是一个基于 MongoDB 的校园二手交易平台后端 API，支持商品管理、用户系统、收藏功能和消息系统。

## 功能特性

- ✅ 商品 CRUD 操作
- ✅ 用户管理系统
- ✅ 收藏功能
- ✅ 消息系统
- ✅ 搜索和筛选
- ✅ 数据验证
- ✅ 安全中间件
- ✅ 分页支持

## 技术栈

- **Node.js** - 运行时环境
- **Express.js** - Web 框架
- **MongoDB** - 数据库
- **Mongoose** - ODM
- **JWT** - 身份验证
- **Helmet** - 安全中间件
- **Express Rate Limit** - 请求限制

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 安装 MongoDB

#### Windows:
1. 下载 MongoDB Community Server: https://www.mongodb.com/try/download/community
2. 安装并启动 MongoDB 服务

#### macOS:
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb/brew/mongodb-community
```

#### Linux (Ubuntu):
```bash
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
```

### 3. 配置环境变量

创建 `.env` 文件：

```env
# 数据库配置
MONGODB_URI=mongodb://localhost:27017/campus_marketplace
DB_NAME=campus_marketplace

# 服务器配置
PORT=3001
NODE_ENV=development

# JWT配置
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d

# 文件上传配置
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=5242880

# CORS配置
CORS_ORIGIN=http://localhost:3000
```

### 4. 初始化数据库

```bash
npm run seed
```

这将创建测试用户和商品数据。

### 5. 启动服务器

```bash
# 开发模式
npm run dev

# 生产模式
npm start
```

服务器将在 `http://localhost:3001` 启动。

## API 端点

### 商品管理

- `GET /api/listings` - 获取商品列表
- `GET /api/listings/:id` - 获取商品详情
- `POST /api/listings` - 创建商品
- `PUT /api/listings/:id` - 更新商品
- `DELETE /api/listings/:id` - 删除商品
- `PATCH /api/listings/:id/sold` - 标记商品售出状态
- `GET /api/listings/user/:userId` - 获取用户商品

### 查询参数

#### 商品列表查询参数：
- `page` - 页码 (默认: 1)
- `limit` - 每页数量 (默认: 20)
- `category` - 商品类别
- `condition` - 商品成色
- `location` - 地点
- `minPrice` - 最低价格
- `maxPrice` - 最高价格
- `sort` - 排序字段 (默认: createdAt)
- `order` - 排序方向 (asc/desc, 默认: desc)
- `search` - 搜索关键词
- `sold` - 是否已售出 (true/false)

### 示例请求

#### 获取商品列表：
```bash
curl "http://localhost:3001/api/listings?category=Electronics&minPrice=100&maxPrice=500"
```

#### 创建商品：
```bash
curl -X POST http://localhost:3001/api/listings \
  -H "Content-Type: application/json" \
  -d '{
    "title": "MacBook Pro 13 inch",
    "description": "2020年款，8GB内存，256GB存储",
    "price": 1200,
    "category": "Electronics",
    "condition": "Like New",
    "location": "Cleveland",
    "images": ["https://example.com/image.jpg"],
    "seller": {
      "id": "user123",
      "name": "John Doe",
      "avatar": "https://example.com/avatar.jpg"
    }
  }'
```

## 数据库结构

### 商品 (Listings)
```javascript
{
  title: String,           // 商品标题
  description: String,     // 商品描述
  price: Number,          // 价格
  category: String,       // 类别
  condition: String,      // 成色
  location: String,       // 地点
  images: [String],       // 图片URL数组
  seller: {               // 卖家信息
    id: String,
    name: String,
    avatar: String
  },
  sold: Boolean,          // 是否已售出
  createdAt: Date,        // 创建时间
  updatedAt: Date         // 更新时间
}
```

### 用户 (Users)
```javascript
{
  email: String,          // 邮箱
  password: String,       // 密码(加密)
  name: String,           // 用户名
  avatar: String,         // 头像URL
  phone: String,          // 电话
  isVerified: Boolean,    // 是否已验证
  createdAt: Date,        // 创建时间
  updatedAt: Date         // 更新时间
}
```

### 收藏 (Favorites)
```javascript
{
  user: ObjectId,         // 用户ID
  listing: ObjectId,      // 商品ID
  createdAt: Date         // 创建时间
}
```

### 消息 (Messages)
```javascript
{
  listing: ObjectId,      // 商品ID
  sender: ObjectId,       // 发送者ID
  receiver: ObjectId,     // 接收者ID
  content: String,        // 消息内容
  isRead: Boolean,        // 是否已读
  createdAt: Date         // 创建时间
}
```

## 测试数据

运行 `npm run seed` 后会创建以下测试数据：

### 测试用户：
- Alice: alice@example.com / password123
- Ben: ben@example.com / password123
- Cara: cara@example.com / password123
- Dan: dan@example.com / password123
- Me: me@example.com / password123

### 测试商品：
- iPad Air 5 64GB Blue - $360
- IKEA Table & Chair Set - $40
- Nike Running Shoes Size 9 - $25
- Microwave 700W - $30

## 开发工具

### 数据库管理
推荐使用 MongoDB Compass 来管理数据库：
- 下载: https://www.mongodb.com/products/compass
- 连接字符串: `mongodb://localhost:27017/campus_marketplace`

### API 测试
推荐使用 Postman 或 Insomnia 来测试 API：
- Postman: https://www.postman.com/
- Insomnia: https://insomnia.rest/

## 部署

### 使用 Docker

1. 创建 `Dockerfile`：
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3001
CMD ["npm", "start"]
```

2. 创建 `docker-compose.yml`：
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3001:3001"
    environment:
      - MONGODB_URI=mongodb://mongo:27017/campus_marketplace
    depends_on:
      - mongo
  
  mongo:
    image: mongo:6.0
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:
```

3. 启动服务：
```bash
docker-compose up -d
```

## 贡献

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 许可证

MIT License
