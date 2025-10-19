#!/bin/bash

# Task Management Frontend Startup Script

echo "🚀 Starting Task Management Frontend..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install dependencies"
        exit 1
    fi
    echo "✅ Dependencies installed successfully"
else
    echo "✅ Dependencies already installed"
fi

# Check if backend is running
echo "🔍 Checking backend connection..."
if curl -s http://localhost:8080/tasks > /dev/null 2>&1; then
    echo "✅ Backend API is running on http://localhost:8080"
else
    echo "⚠️  Backend API is not running on http://localhost:8080"
    echo "   Please start your Spring Boot backend first"
    echo "   Run: mvn spring-boot:run (from the root directory)"
    echo ""
fi

echo ""
echo "🎯 Starting development server..."
echo "   Frontend will be available at: http://localhost:3000"
echo "   Backend API should be at: http://localhost:8080"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Start the development server
npm run dev
