# 校园二手交易平台 - 使用说明

## 🚀 快速启动

### 方法一：使用启动脚本（推荐）

#### Windows用户：
```bash
# 双击运行或在命令行执行
start.bat
```

#### macOS/Linux用户：
```bash
# 在终端执行
./start.sh
```

### 方法二：手动启动

#### 1. 安装MongoDB
- **Windows**: 下载并安装 [MongoDB Community Server](https://www.mongodb.com/try/download/community)
- **macOS**: `brew install mongodb-community`
- **Linux**: 使用包管理器安装

#### 2. 启动MongoDB服务
```bash
# Windows
net start MongoDB

# macOS
brew services start mongodb/brew/mongodb-community

# Linux
sudo systemctl start mongod
```

#### 3. 安装依赖并启动后端
```bash
# 安装依赖
npm install

# 初始化数据库（导入测试数据）
npm run seed

# 启动后端服务器
npm start
```

#### 4. 打开前端页面
- 直接双击 `index.html` 文件
- 或在浏览器中打开 `index.html`

## 📋 功能说明

### 主要功能
- ✅ **商品浏览**: 查看所有商品，支持分类、价格、地点筛选
- ✅ **商品搜索**: 按标题和描述搜索商品
- ✅ **商品发布**: 发布新的二手商品
- ✅ **商品管理**: 编辑、删除、标记售出状态
- ✅ **收藏功能**: 收藏喜欢的商品
- ✅ **聊天功能**: 与卖家进行消息交流

### 数据存储
- **商品数据**: 存储在MongoDB数据库中
- **用户偏好**: 收藏、消息等存储在浏览器localStorage中
- **实时同步**: 所有商品操作实时同步到数据库

## 🔧 技术架构

### 前端
- **React 18**: 用户界面框架
- **内联样式**: 现代化的暗色主题设计
- **API调用**: 使用fetch进行HTTP请求

### 后端
- **Node.js + Express**: 服务器框架
- **MongoDB**: 数据库存储
- **Mongoose**: 数据库ORM
- **RESTful API**: 标准的API设计

## 📊 测试数据

系统预置了以下测试数据：

### 测试用户
- Alice: alice@example.com / password123
- Ben: ben@example.com / password123
- Cara: cara@example.com / password123
- Dan: dan@example.com / password123
- Me: me@example.com / password123

### 测试商品
- iPad Air 5 64GB Blue - $360
- IKEA Table & Chair Set - $40
- Nike Running Shoes Size 9 - $25
- Microwave 700W - $30

## 🌐 API端点

### 商品管理
- `GET /api/listings` - 获取商品列表
- `GET /api/listings/:id` - 获取商品详情
- `POST /api/listings` - 创建商品
- `PUT /api/listings/:id` - 更新商品
- `DELETE /api/listings/:id` - 删除商品
- `PATCH /api/listings/:id/sold` - 标记售出状态

### 查询参数
- `category` - 商品类别
- `condition` - 商品成色
- `location` - 地点
- `minPrice` - 最低价格
- `maxPrice` - 最高价格
- `search` - 搜索关键词
- `sort` - 排序字段
- `order` - 排序方向

## 🛠️ 开发说明

### 项目结构
```
campus-marketplace/
├── index.html              # 前端页面
├── server.js               # 后端服务器
├── package.json            # 项目配置
├── config/
│   └── database.js         # 数据库配置
├── models/                 # 数据模型
│   ├── Listing.js          # 商品模型
│   ├── User.js             # 用户模型
│   ├── Favorite.js         # 收藏模型
│   └── Message.js          # 消息模型
├── routes/
│   └── listings.js         # 商品路由
├── scripts/
│   └── seedData.js         # 种子数据
├── start.bat               # Windows启动脚本
├── start.sh                # Unix启动脚本
└── README.md               # 详细文档
```

### 环境要求
- Node.js 16+
- MongoDB 4.4+
- 现代浏览器（支持ES6+）

## 🐛 故障排除

### 常见问题

#### 1. 无法连接到服务器
- 确保MongoDB服务正在运行
- 检查后端服务器是否在端口3001启动
- 查看浏览器控制台错误信息

#### 2. 数据库连接失败
- 检查MongoDB是否安装并运行
- 确认数据库连接字符串正确
- 查看服务器控制台错误信息

#### 3. 页面显示"加载中"或错误信息
- 检查网络连接
- 确认后端API服务正常
- 尝试刷新页面

#### 4. 商品操作失败
- 检查商品数据格式是否正确
- 确认API端点可访问
- 查看浏览器网络面板

### 调试模式
- 打开浏览器开发者工具
- 查看Console面板的错误信息
- 查看Network面板的API请求状态

## 📞 技术支持

如果遇到问题，请：
1. 检查本文档的故障排除部分
2. 查看浏览器控制台错误信息
3. 确认所有服务正常运行
4. 尝试重新启动服务

## 🔄 更新日志

### v1.0.0 (当前版本)
- ✅ 完整的MongoDB集成
- ✅ RESTful API设计
- ✅ 实时数据同步
- ✅ 错误处理和加载状态
- ✅ 响应式设计
- ✅ 完整的CRUD操作

---

**注意**: 这是一个演示项目，生产环境使用需要额外的安全措施和性能优化。
