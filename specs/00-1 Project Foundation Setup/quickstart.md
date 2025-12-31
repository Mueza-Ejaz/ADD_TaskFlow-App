# Quickstart Guide: ADD_TaskFlow Project Foundation

## Overview
This guide provides step-by-step instructions to get the ADD_TaskFlow project up and running on your local development environment.

## Prerequisites
- Node.js 18+ installed
- Python 3.12+ installed
- Git installed
- Neon PostgreSQL account created (or local PostgreSQL for development)

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd ADD_TaskFlow
```

### 2. Setup Frontend (Next.js Application)
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Update environment variables in .env.local
# NEXT_PUBLIC_API_URL=http://localhost:8000
# Add any other required variables

# Run the development server
npm run dev
```
The frontend will be available at http://localhost:3000

### 3. Setup Backend (FastAPI Application)
```bash
# Navigate to backend directory
cd backend

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create environment file
cp .env.example .env

# Update environment variables in .env
# DATABASE_URL=postgresql://username:password@localhost:5432/add_taskflow_dev
# SECRET_KEY=your-super-secret-key
# Add any other required variables

# Run the development server
uvicorn src.main:app --reload
```
The backend API will be available at http://localhost:8000
The API documentation will be available at http://localhost:8000/docs

### 4. Initialize Database
```bash
# From the backend directory with virtual environment activated
python -m src.core.init_db
```

## Project Structure
```
ADD_TaskFlow/
├── .specify/                 # Spec-Kit Plus configuration
├── frontend/                 # Next.js application
│   ├── app/                  # App Router pages
│   ├── components/           # Reusable UI components
│   ├── lib/                  # Utilities, hooks, API client
│   ├── styles/               # Global styles, Tailwind config
│   ├── public/               # Static assets
│   └── package.json
├── backend/                  # FastAPI application
│   ├── src/
│   │   ├── main.py           # FastAPI application
│   │   ├── models/           # SQLModel database models
│   │   ├── api/              # API route handlers
│   │   ├── core/             # Configuration, database setup
│   │   └── utils/            # Utility functions
│   └── requirements.txt
├── specs/                    # Feature specifications
├── docs/                     # Documentation
├── .gitignore
├── README.md
└── docker-compose.yml        # Optional for local development
```

## Common Commands
- `npm run dev` - Start frontend development server
- `npm run build` - Build frontend for production
- `npm run lint` - Lint frontend code
- `npm run format` - Format frontend code

- `uvicorn src.main:app --reload` - Start backend development server
- `python -m pytest` - Run backend tests
- `python -m black .` - Format Python code
- `python -m flake8 .` - Lint Python code

## Troubleshooting
1. If you encounter dependency issues, try clearing cache:
   - Frontend: `npm ci`
   - Backend: Delete venv and recreate

2. If database connection fails:
   - Verify your Neon PostgreSQL connection string
   - Ensure the database is created and accessible

3. If environment variables aren't loading:
   - Verify .env files are properly configured
   - Check that environment files are not committed to git

## Next Steps
1. Implement user authentication
2. Create task management features
3. Add more UI components
4. Implement testing coverage