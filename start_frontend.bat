@echo off
REM Disaster Management System - Frontend Startup Script for Windows

echo ===================================
echo Disaster Management System - Frontend
echo ===================================
echo.

cd /d "%~dp0frontend\ui" || exit /b 1

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
)

REM Start the development server
echo.
echo ===================================
echo Starting Vite Development Server...
echo ===================================
echo.

call npm run dev

pause
