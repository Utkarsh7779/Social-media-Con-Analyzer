@echo off
echo ========================================
echo   Social Media Content Analyzer
echo   Local Development Setup
echo ========================================
echo.
echo Starting backend server...
cd server
start "Backend Server" cmd /k "npm start"
echo Backend started on http://localhost:5000
echo.
echo Starting frontend...
cd ..\client
start "Frontend" cmd /k "npm start"
echo Frontend starting on http://localhost:3000
echo.
echo ========================================
echo   Both services are starting...
echo   Backend:  http://localhost:5000
echo   Frontend: http://localhost:3000
echo ========================================
echo.
echo Wait for both to fully load, then:
echo 1. Open http://localhost:3000 in your browser
echo 2. Test file uploads and analysis
echo 3. Everything works locally - no deployment issues!
echo.
pause
