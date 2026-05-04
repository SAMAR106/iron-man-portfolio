@echo off
echo ========================================
echo   IRON MAN - Fixing and Starting...
echo ========================================
echo.
echo [1/2] Installing dependencies...
call npm install
echo.
echo [2/2] Starting dev server...
call npm run dev
pause
