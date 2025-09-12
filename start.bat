@echo off
echo ========================================
echo 校园二手交易平台 - 启动脚本
echo ========================================
echo.

echo 1. 检查MongoDB是否运行...
net start | findstr "MongoDB" >nul
if %errorlevel% neq 0 (
    echo MongoDB服务未运行，正在启动...
    net start MongoDB
    if %errorlevel% neq 0 (
        echo 错误：无法启动MongoDB服务
        echo 请手动安装并启动MongoDB
        pause
        exit /b 1
    )
) else (
    echo MongoDB服务正在运行
)

echo.
echo 2. 安装依赖包...
if not exist node_modules (
    echo 正在安装依赖包...
    npm install
    if %errorlevel% neq 0 (
        echo 错误：依赖包安装失败
        pause
        exit /b 1
    )
) else (
    echo 依赖包已安装
)

echo.
echo 3. 初始化数据库...
echo 正在运行种子数据脚本...
npm run seed
if %errorlevel% neq 0 (
    echo 警告：种子数据初始化失败，但服务器仍可启动
)

echo.
echo 4. 启动后端服务器...
echo 后端服务器将在 http://localhost:3001 启动
echo 前端页面将在 http://localhost:3000 或直接打开 index.html
echo.
echo 按 Ctrl+C 停止服务器
echo ========================================
npm start
