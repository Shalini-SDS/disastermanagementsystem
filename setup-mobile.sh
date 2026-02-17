#!/bin/bash
# Quick Setup Script for Mobile App

echo "🚀 Disaster Management Mobile App - Quick Setup"
echo "=================================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js version: $(node -v)"
echo "✅ npm version: $(npm -v)"
echo ""

# Navigate to mobile directory
cd "$(dirname "$0")/mobile" || exit

echo "📦 Installing dependencies..."
npm install

echo ""
echo "✅ Installation complete!"
echo ""
echo "📝 Next steps:"
echo "1. Copy .env.example to .env"
echo "   cp .env.example .env"
echo ""
echo "2. Update .env with your backend URL"
echo "   EXPO_PUBLIC_API_URL=http://your-backend-url:5000/api"
echo "   EXPO_PUBLIC_SOCKET_URL=http://your-backend-url:5000"
echo ""
echo "3. Start the app"
echo "   npm start"
echo ""
echo "4. Select platform:"
echo "   - Press 'a' for Android"
echo "   - Press 'i' for iOS"
echo "   - Press 'w' for Web"
echo ""
echo "Happy coding! 🎨📱"
