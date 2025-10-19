@echo off
REM Task Management Frontend Startup Script for Windows

echo 🚀 Starting Task Management Frontend...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    pause
    exit /b 1
)

echo ✅ Node.js version: 
node --version

REM Check if dependencies are installed
if not exist "node_modules" (
    echo 📦 Installing dependencies...
    npm install
    if %errorlevel% neq 0 (
        echo ❌ Failed to install dependencies
        pause
        exit /b 1
    )
    echo ✅ Dependencies installed successfully
) else (
    echo ✅ Dependencies already installed
)

REM Check if backend is running
echo 🔍 Checking backend connection...
curl -s http://localhost:8080/tasks >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Backend API is running on http://localhost:8080
) else (
    echo ⚠️  Backend API is not running on http://localhost:8080
    echo    Please start your Spring Boot backend first
    echo    Run: mvn spring-boot:run (from the root directory)
    echo.
)

echo.
echo 🎯 Starting development server...
echo    Frontend will be available at: http://localhost:3000
echo    Backend API should be at: http://localhost:8080
echo.
echo Press Ctrl+C to stop the server
echo.

REM Start the development server
npm run dev
