@echo off
REM Go to backend folder
cd /d %~dp0

REM Activate virtual environment
call .venv\Scripts\activate.bat

REM Start FastAPI server
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

REM Keep window open (optional)
pause
