@echo off
setlocal enabledelayedexpansion

echo =================================
echo   Stopping WAIEDU Dev Services
echo =================================
echo.

for %%p in (3000 3001 3002) do (
    echo [-] Finding process on port %%p...
    for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":%%p"') do (
        set "pid=%%a"
        if not "!pid!"=="0" (
            echo    Found process with PID: !pid!. Stopping...
            taskkill /F /PID !pid!
        )
    )
)

echo.
echo All services have been stopped.
echo.

endlocal 