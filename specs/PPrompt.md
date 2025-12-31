Phase 1 Plan Creation Prompt:

# Phase 1 Plan Creation - ADD_TaskFlow

## CONTEXT:
We are building "ADD_TaskFlow" - a modern Todo Full-Stack Web Application. We have created the Constitution file and Phase 1 specification. Now we need to create an implementation plan for Phase 1.

**Specification Location:** `specs/00-1 Project Foundation Setup/spec.md`

## YOUR TASK:
Create a detailed implementation plan for Phase 1 in a single markdown block. This plan should break down the specification into actionable technical steps with dependencies and timelines.

## PLAN FILE LOCATION:
Create file at: `specs/00-1 Project Foundation Setup/plan.md`

## PLAN CONTENT (write complete markdown):

```markdown
# Phase 1 Implementation Plan: Project Foundation Setup

## 1. Architecture Overview
**Monorepo Architecture:**
ADD_TaskFlow/
├── frontend/ # Next.js 16 (App Router) + TypeScript + Tailwind CSS
├── backend/ # FastAPI + SQLModel + Neon PostgreSQL
├── specs/ # Specifications and plans
└── docs/ # Documentation


**Technical Stack Decisions:**
- **Frontend:** Next.js 16 with App Router for modern React patterns
- **Backend:** FastAPI for automatic OpenAPI docs and async support
- **Database:** Neon PostgreSQL for serverless SQL with connection pooling
- **ORM:** SQLModel for type-safe database operations
- **Styling:** Tailwind CSS for utility-first styling
- **Animations:** Framer Motion for production-ready animations
- **Auth:** Better Auth for frontend + JWT tokens for backend

## 2. Implementation Phases

### Phase 1A: Monorepo Foundation & Git Setup (Day 1 - 2 hours)
**Objective:** Establish basic project structure and version control

**Tasks:**
1. Create `ADD_TaskFlow/` root directory
2. Initialize git repository: `git init`
3. Create `.gitignore` for Node.js and Python
4. Create basic README.md with project overview
5. Create CLAUDE.md for AI collaboration guidelines
6. Create `specs/00-1 Project Foundation Setup/` folder for documentation
7. Set up monorepo structure with `frontend/` and `backend/` directories

**Dependencies:** None

**Deliverables:**
- Git repository initialized
- Basic documentation in place
- Folder structure created

### Phase 1B: Frontend Foundation (Day 1 - 3 hours)
**Objective:** Set up Next.js 16 with TypeScript and design system

**Tasks:**
1. Create Next.js app: `npx create-next-app@latest frontend`
   - Select: TypeScript, Tailwind CSS, App Router, ESLint
2. Install additional dependencies:

npm install framer-motion clsx date-fns
npm install -D @types/node @types/react @types/react-dom

3. Configure Tailwind CSS in `tailwind.config.ts`:
- Add design tokens (colors, typography, spacing)
- Set up Inter font from Google Fonts
- Configure animation utilities
4. Create basic layout structure:
- `app/layout.tsx` - Root layout with metadata
- `app/page.tsx` - Landing page
- `components/layout/` - Layout components
5. Create core UI components:
- `components/ui/Button.tsx` (primary, secondary, ghost variants)
- `components/ui/Card.tsx` (with glassmorphism effects)
- `components/ui/Input.tsx` (text input and textarea)
- `components/ui/Modal.tsx` (dialog component)
- `components/ui/LoadingSpinner.tsx`
6. Set up Framer Motion animations:
- Create animation constants in `lib/animations.ts`
- Add page transition effects
- Set up hover and tap animations

**Dependencies:** Phase 1A complete

**Deliverables:**
- Next.js app running on port 3000
- Tailwind CSS configured with design system
- 5+ reusable UI components
- Framer Motion animations working

### Phase 1C: Backend Foundation (Day 2 - 3 hours)
**Objective:** Set up FastAPI backend with database connection

**Tasks:**
1. Create Python virtual environment: `python -m venv venv`
2. Install dependencies in `backend/requirements.txt`:

fastapi==0.104.1
sqlmodel==0.0.14
psycopg2-binary==2.9.9
python-jose[cryptography]==3.3.0
passlib[bcrypt]==1.7.4
python-multipart==0.0.6
uvicorn[standard]==0.24.0
pydantic-settings==2.1.0

3. Create backend structure:
backend/
├── src/
│ ├── main.py # FastAPI app instance
│ ├── config.py # Configuration settings
│ ├── database.py # Database connection
│ ├── models/ # SQLModel models
│ ├── api/ # API routes
│ ├── core/ # Core utilities
│ └── utils/ # Helper functions
└── requirements.txt

4. Configure FastAPI app in `main.py`:
- Create app instance with metadata
- Set up CORS middleware for frontend
- Add health check endpoint at `/api/health`
- Configure OpenAPI documentation at `/docs`
5. Set up database connection:
- Create `database.py` with SQLModel engine
- Configure Neon PostgreSQL connection string from environment
- Create connection pool settings
- Add database session dependency
6. Create environment configuration:
- `.env` file with database URL, secrets
- `.env.example` template
- Pydantic settings model for type-safe config

**Dependencies:** Phase 1A complete

**Deliverables:**
- FastAPI server running on port 8000
- Database connection to Neon PostgreSQL
- Health endpoint `/api/health` returning 200
- OpenAPI docs available at `/docs`

### Phase 1D: Design System & Integration (Day 2 - 2 hours)
**Objective:** Finalize design system and connect frontend to backend

**Tasks:**
1. Create design system documentation:
- `docs/design-system.md` with color palette, typography, spacing
- `docs/setup.md` with setup instructions
2. Enhance UI components with design tokens:
- Apply consistent colors from design system
- Add responsive design patterns
- Implement glassmorphism effects on cards
3. Set up API client in frontend:
- Create `lib/api.ts` with axios/fetch wrapper
- Configure base URL from environment variables
- Add request/response interceptors
- Set up error handling
4. Connect frontend to backend:
- Call `/api/health` endpoint from frontend
- Display backend status on landing page
- Test CORS configuration
5. Create basic tests:
- Frontend: Component tests with React Testing Library
- Backend: Pytest for health endpoint
- Integration: Test frontend-backend connection
6. Final validation:
- Run both services concurrently
- Test all acceptance criteria
- Fix any integration issues

**Dependencies:** Phase 1B and 1C complete

**Deliverables:**
- Design system documented
- Frontend connected to backend API
- Basic tests passing
- All acceptance criteria met

## 3. Component Breakdown

### Frontend Components:
1. **Layout Components:**
- `RootLayout` - Main layout with metadata
- `Header` - Navigation header
- `Footer` - Page footer
- `MainContainer` - Content container

2. **UI Components:**
- `Button` - Primary, Secondary, Ghost variants
- `Card` - Glassmorphism card with shadow
- `Input` - Text input with validation states
- `Textarea` - Multi-line text input
- `Modal` - Dialog with overlay
- `LoadingSpinner` - Animated spinner
- `Toast` - Notification component

3. **Utility Components:**
- `ThemeProvider` - Theme context provider
- `ErrorBoundary` - React error boundary
- `SkeletonLoader` - Loading placeholders

### Backend Modules:
1. **Core Modules:**
- `main.py` - FastAPI application instance
- `config.py` - Configuration and settings
- `database.py` - Database connection and sessions
- `models/base.py` - Base SQLModel class

2. **API Modules:**
- `api/health.py` - Health check endpoints
- `api/api.py` - API router configuration

3. **Utility Modules:**
- `core/security.py` - Security utilities (JWT setup)
- `core/middleware.py` - Custom middleware
- `utils/logger.py` - Logging configuration

## 4. Dependency Graph
Phase 1A (Monorepo Setup)
↓
Phase 1B (Frontend) → Phase 1D (Integration)
↗
Phase 1C (Backend) → Phase 1D (Integration)


**Critical Path:** Phase 1A → Phase 1B → Phase 1D

## 5. Technical Decisions

### Decision 1: Next.js App Router vs Pages Router
**Context:** Need modern React patterns with server components
**Decision:** Use App Router for better performance and newer features
**Alternatives Considered:**
- Pages Router: Simpler but lacks server components
- Remix: Good but less ecosystem than Next.js
**Consequences:** Better performance, can use React server components

### Decision 2: SQLModel vs SQLAlchemy + Pydantic
**Context:** Need type-safe database models with automatic API documentation
**Decision:** Use SQLModel for unified type definitions
**Alternatives Considered:**
- SQLAlchemy + Pydantic: More mature but requires duplicate models
- Prisma: Not well-supported with Python FastAPI
**Consequences:** Single source of truth for models, automatic OpenAPI docs

### Decision 3: Framer Motion vs React Spring
**Context:** Need production-ready animations with good performance
**Decision:** Use Framer Motion for simpler API and better documentation
**Alternatives Considered:**
- React Spring: More physics-based, steeper learning curve
- CSS animations: Limited programmatic control
**Consequences:** Easier animation implementation, large community

### Decision 4: Neon PostgreSQL vs Supabase
**Context:** Need serverless PostgreSQL with good performance
**Decision:** Use Neon PostgreSQL for pure PostgreSQL experience
**Alternatives Considered:**
- Supabase: Includes auth and real-time, but more complex
- Railway/Heroku: More expensive for hobby projects
**Consequences:** Direct PostgreSQL access, serverless scaling

## 6. Testing Strategy

### Frontend Testing:
- **Unit Tests:** Jest + React Testing Library for components
- **Integration Tests:** MSW for API mocking
- **E2E Tests:** Playwright (optional for Phase 1)
- **Coverage Goal:** 80% for critical components

### Backend Testing:
- **Unit Tests:** pytest for business logic
- **Integration Tests:** Test database operations
- **API Tests:** TestFastClient for endpoint testing
- **Coverage Goal:** 90% for core modules

### Test Structure:
frontend/
├── tests/
│ ├── components/ # Component tests
│ ├── lib/ # Utility tests
│ └── app/ # Page tests
backend/
├── tests/
│ ├── unit/ # Unit tests
│ ├── integration/ # Integration tests
│ └── conftest.py # Test fixtures


## 7. Timeline Estimates

| Task | Estimated Time | Priority | Dependencies |
|------|----------------|----------|--------------|
| Monorepo setup | 2 hours | P0 | None |
| Next.js app creation | 1 hour | P0 | Monorepo |
| Tailwind CSS config | 1.5 hours | P0 | Next.js |
| UI components (5+) | 3 hours | P1 | Tailwind |
| Framer Motion setup | 1 hour | P1 | Components |
| Python venv setup | 0.5 hours | P0 | Monorepo |
| FastAPI app setup | 1.5 hours | P0 | Python |
| Database connection | 1 hour | P0 | FastAPI |
| Health endpoint | 0.5 hours | P0 | FastAPI |
| Design system docs | 1 hour | P1 | UI components |
| API client setup | 1 hour | P1 | Backend ready |
| Integration testing | 1.5 hours | P1 | All components |
| **Total** | **15 hours** | | |

## 8. Risk Analysis & Mitigation

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Database connection fails | Medium | High | Use SQLite for local fallback during development |
| Dependency version conflicts | Low | Medium | Pin exact versions in package.json and requirements.txt |
| CORS configuration issues | Medium | Medium | Test early with frontend, use generous CORS settings initially |
| Design system inconsistencies | Medium | Medium | Create design tokens as CSS variables for single source |
| Environment setup differences | High | Medium | Provide detailed setup guide with Docker option |
| Performance issues with animations | Low | Low | Use Framer Motion production optimizations, test on low-end devices |

## 9. Success Criteria
1. All acceptance criteria from specification are met
2. Both frontend and backend services run without errors
3. Database connection is established and tested
4. Design system components are reusable and consistent
5. Basic tests pass for critical functionality
6. Code follows Constitution standards (type hints, documentation)

## 10. Deliverables Checklist
- [ ] Monorepo structure created at `/ADD_TaskFlow`
- [ ] Git repository initialized with `.gitignore`
- [ ] Next.js app running on `http://localhost:3000`
- [ ] FastAPI server running on `http://localhost:8000`
- [ ] Health endpoint returns `{"status": "healthy"}`
- [ ] Database connection to Neon PostgreSQL established
- [ ] Design system with 5+ reusable components
- [ ] Framer Motion animations working
- [ ] Frontend-backend integration tested
- [ ] Basic documentation (README, setup guide)
- [ ] All code follows Constitution standards

---
*Last Updated: [Current Date]*
*Version: 1.0*
*Status: Ready for Implementation*

Now create this plan file at specs/00-1 Project Foundation Setup/plan.md with the exact content provided above. Make sure it's saved as a single markdown file.
