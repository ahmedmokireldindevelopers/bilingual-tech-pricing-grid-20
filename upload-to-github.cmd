@echo off
setlocal
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0upload-to-github.ps1" %*
endlocal
