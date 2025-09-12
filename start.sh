#!/bin/bash

echo "========================================"
echo "校园二手交易平台 - 启动脚本"
echo "========================================"
echo

echo "1. 检查MongoDB是否运行..."
if ! pgrep -x "mongod" > /dev/null; then
    echo "MongoDB未运行，正在启动..."
    if command -v brew > /dev/null; then
        brew services start mongodb/brew/mongodb-community
    elif command -v systemctl > /dev/null; then
        sudo systemctl start mongod
    else
        echo "请手动启动MongoDB服务"
        exit 1
    fi
else
    echo "MongoDB服务正在运行"
fi

echo
echo "2. 安装依赖包..."
if [ ! -d "node_modules" ]; then
    echo "正在安装依赖包..."
    npm install
    if [ $? -ne 0 ]; then
        echo "错误：依赖包安装失败"
        exit 1
    fi
else
    echo "依赖包已安装"
fi

echo
echo "3. 初始化数据库..."
echo "正在运行种子数据脚本..."
npm run seed
if [ $? -ne 0 ]; then
    echo "警告：种子数据初始化失败，但服务器仍可启动"
fi

echo
echo "4. 启动后端服务器..."
echo "后端服务器将在 http://localhost:3001 启动"
echo "前端页面将在 http://localhost:3000 或直接打开 index.html"
echo
echo "按 Ctrl+C 停止服务器"
echo "========================================"
npm start
