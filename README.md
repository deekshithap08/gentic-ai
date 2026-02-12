# Buildwise - IntelliPlan AI Project

This project consists of three main components:
1.  **Client**: A React + Vite frontend for UI and 3D visualization.
2.  **Server**: An Express.js backend that bridges the client and AI service.
3.  **AI Engine**: A FastAPI service for layout generation using intelligent algorithms.

## Quick Start (Docker)

The easiest way to run the entire stack is using Docker Compose:

```bash
docker-compose up --build
```

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:5000](http://localhost:5000)
- **AI Engine API**: [http://localhost:8000](http://localhost:8000)

## Manual Setup

If you prefer to run the components individually:

### 1. AI Engine (FastAPI)
Navigate to the `ai_engine` directory:
```bash
cd ai_engine
# Create and activate virtual environment
python -m venv venv
.\venv\Scripts\activate  # Windows
source venv/bin/activate # Unix/macOS
# Install dependencies
pip install -r requirements.txt
# Run the service
python main.py
```

### 2. Server (Express)
Navigate to the `server` directory:
```bash
cd server
# Install dependencies
npm install
# Start the server
node index.js
```

### 3. Client (React + Vite)
Navigate to the `client` directory:
```bash
cd client
# Install dependencies
npm install
# Start dev server
npm run dev
```

## Environment Variables

Ensure you have a `.env` file in the `server` directory with:
```env
PORT=5000
AI_SERVICE_URL=http://localhost:8000
```
