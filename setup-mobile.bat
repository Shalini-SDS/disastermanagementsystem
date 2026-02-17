@echo off
REM Quick Setup Script for Mobile App (Windows)

echo.
echo 🚀 Disaster Management Mobile App - Quick Setup
echo ==================================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

echo ✅ Node.js version:
node -v
echo ✅ npm version:
npm -v
echo.

REM Navigate to mobile directory
cd /d "%~dp0mobile"

echo 📦 Installing dependencies...
call npm install

echo.
echo ✅ Installation complete!
echo.
echo 📝 Next steps:
echo 1. Copy .env.example to .env
echo    copy .env.example .env
echo.
echo 2. Update .env with your backend URL
echo    EXPO_PUBLIC_API_URL=http://your-backend-url:5000/api
echo    EXPO_PUBLIC_SOCKET_URL=http://your-backend-url:5000
echo.
echo 3. Start the app
echo    npm start
echo.
echo 4. Select platform:
echo    - Press 'a' for Android
echo    - Press 'i' for iOS
echo    - Press 'w' for Web
echo.
echo Happy coding! 🎨📱
echo.
pause
