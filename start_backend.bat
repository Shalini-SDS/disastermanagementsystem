@echo off
REM Disaster Management System - Backend Startup Script for Windows

echo ===================================
echo Disaster Management System - Backend
echo ===================================
echo.

cd /d "%~dp0backend" || exit /b 1

REM Check if virtual environment exists
if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
)

REM Activate virtual environment
call venv\Scripts\activate.bat

REM Install/update dependencies
echo.
echo Installing dependencies...
pip install -r requirements.txt

REM Create demo data (optional - comment out if not needed)
REM echo.
REM echo Creating demo data...
REM python seed_demo_data.py

REM Start the server
echo.
echo ===================================
echo Starting Flask Server...
echo ===================================
echo Server will run on: http://127.0.0.1:5000
echo Press Ctrl+C to stop
echo.

python app.py

pause
