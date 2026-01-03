# SPEC-KIT PLUS: PHASE 2 IMPLEMENTATION PLAN CREATION

## **MANDATORY FORMAT & STRUCTURE:**
Follow EXACTLY this structure. Do NOT deviate:

```markdown
# Phase 2: User Authentication - Implementation Plan
**Branch**: `P2-02 User Authentication` | **Date**: {current_date} | **Spec**: specs/P2-02 User Authentication/spec.md
**Constitution Reference**: @.specify/memory/constitution.md

## **1. ARCHITECTURE DECISIONS (ADRs Required)**

### **Decision 1: Authentication Strategy**
- **Choice**: Better Auth (Frontend) + JWT (Backend) hybrid model
- **Why**: Stateless backend, Better Auth handles frontend complexity
- **Alternatives considered**: 
  - Session-based auth (rejected: stateful, not scalable)
  - OAuth only (rejected: overkill for MVP)
- **Impact**: 
  - ✅ Frontend handles signup/login UI
  - ✅ Backend validates JWT statelessly
  - ⚠️ Token refresh logic needed

### **Decision 2: Token Storage**
- **Choice**: HTTP-only cookies + secure flag
- **Why**: XSS protection, automatic cookie handling
- **Security implications**: SameSite=Strict, httpOnly=true, secure=true

### **Decision 3: Password Security**
- **Choice**: bcrypt with 12 rounds minimum
- **Why**: Industry standard, slow hashing for brute force protection

## **2. IMPLEMENTATION PHASES (5 PHASES, EACH 1-2 DAYS)**

### **Phase 2A: Database & Backend Foundation** (Day 1)
**Goal**: Create secure backend auth system

#### **Tasks:**
1. **Database Migration** (2 hours)
   - Create users table with: id, email, hashed_password, name, created_at, updated_at
   - Add user_id foreign key to tasks table
   - Create indexes on user_id and email

2. **Password Security Layer** (1.5 hours)
   - Install and configure passlib[bcrypt]
   - Create password utilities: hash_password(), verify_password()

3. **JWT Token System** (2 hours)
   - Install python-jose[cryptography]
   - Create token utilities: create_access_token(), verify_token()
   - Set token expiry: 24h access, 7d refresh

#### **Deliverables:**
- `backend/src/auth/password.py` - Password utilities
- `backend/src/auth/jwt_handler.py` - JWT utilities
- Database migration script

### **Phase 2B: Backend API Endpoints** (Day 2)
**Goal**: Implement RESTful auth endpoints

#### **Tasks:**
1. **Authentication Routes** (3 hours)
   - POST /api/v1/auth/signup - Create user, return tokens
   - POST /api/v1/auth/login - Validate credentials, return tokens
   - POST /api/v1/auth/logout - Invalidate token
   - GET /api/v1/auth/me - Get current user

2. **Protected Route Middleware** (2 hours)
   - Create `get_current_user()` dependency
   - Apply to all task endpoints
   - Return 401 for invalid tokens

#### **Deliverables:**
- `backend/src/api/v1/endpoints/auth.py` - Auth endpoints
- `backend/src/api/deps.py` - Auth dependencies
- OpenAPI documentation updated

### **Phase 2C: Frontend Authentication** (Day 3)
**Goal**: Implement Better Auth with modern UI

#### **Tasks:**
1. **Better Auth Configuration** (1.5 hours)
   - Install @better-auth/* packages
   - Configure in `frontend/lib/auth.ts`
   - Set up auth callbacks and events

2. **Auth Pages** (3 hours)
   - `app/(auth)/signup/page.tsx` - Signup form with validation
   - `app/(auth)/login/page.tsx` - Login form with validation
   - Both pages use existing design system components

3. **Auth Context & Hooks** (1.5 hours)
   - Create `AuthProvider` with React Context
   - Implement `useAuth()` hook
   - Manage user state and loading states

#### **Deliverables:**
- Working signup/login pages
- Better Auth fully configured
- User context available app-wide

### **Phase 2D: Route Protection & Integration** (Day 4)
**Goal**: Secure routes and integrate frontend-backend

#### **Tasks:**
1. **Protected Routes** (2 hours)
   - Create `middleware.ts` for route protection
   - Implement `ProtectedRoute` component
   - Redirect unauthenticated users to login

2. **Dashboard Page** (2 hours)
   - `app/dashboard/page.tsx` - User dashboard
   - Display user info and task summary
   - Logout functionality

3. **API Client Integration** (2 hours)
   - Modify `frontend/lib/api.ts` to inject JWT
   - Handle 401 errors (auto redirect to login)
   - Add request/response interceptors

#### **Deliverables:**
- Protected dashboard accessible only after login
- API client automatically sends tokens
- Complete auth flow (signup → login → dashboard)

### **Phase 2E: Security & Testing** (Day 5)
**Goal**: Harden security and add tests

#### **Tasks:**
1. **Security Hardening** (2 hours)
   - Rate limiting on auth endpoints (5 requests/minute)
   - Input validation on all auth forms
   - Password strength requirements
   - Security headers (CSP, HSTS)

2. **Testing Suite** (3 hours)
   - Backend: pytest for auth endpoints (90% coverage)
   - Frontend: React Testing Library for auth components
   - E2E: Playwright tests for auth flow

3. **Documentation** (1 hour)
   - Update README with auth setup
   - API documentation for auth endpoints
   - Environment variables documentation

#### **Deliverables:**
- Security audit passed
- Test coverage reports
- Complete documentation

## **3. TECHNICAL SPECIFICS**

### **Database Schema:**
```sql
-- users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Update tasks table
ALTER TABLE tasks ADD COLUMN user_id INTEGER REFERENCES users(id);
CREATE INDEX idx_tasks_user_id ON tasks(user_id);

Environment Variables Required:
# Backend (.env)
JWT_SECRET_KEY=your-32-character-secret-key-here
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440
REFRESH_TOKEN_EXPIRE_DAYS=7

# Frontend (.env.local)
NEXT_PUBLIC_API_URL=http://localhost:8000

File Structure Updates:
backend/src/
├── auth/
│   ├── password.py      # Password utilities
│   ├── jwt_handler.py   # JWT utilities
│   └── security.py      # Security utils
├── api/v1/endpoints/
│   ├── auth.py          # Auth endpoints
│   └── tasks.py         # Updated with auth
└── models/
    ├── user.py          # User model
    └── task.py          # Updated task model

frontend/
├── app/(auth)/
│   ├── login/page.tsx
│   └── signup/page.tsx
├── app/dashboard/page.tsx
├── components/auth/
│   ├── ProtectedRoute.tsx
│   └── AuthProvider.tsx
└── lib/
    ├── auth.ts          # Better Auth config
    └── api.ts           # Updated with auth

4. DEPENDENCIES TO INSTALL
Backend:
pip install "passlib[bcrypt]" python-jose[cryptography] python-multipart

Frontend:
npm install @better-auth/react @better-auth/ui

5. ACCEPTANCE CRITERIA (MUST PASS ALL)
Functional:
User can sign up with email and password

User can log in with credentials

Dashboard only accessible after login

Tasks are user-specific (only owner can see/edit)

Logout clears session and tokens

Security:
Passwords hashed with bcrypt (12 rounds)

JWT tokens expire properly

No sensitive data in logs

Rate limiting on auth endpoints

Input validation on all forms

Performance:
Login response < 200ms

Signup response < 300ms

Page load < 2 seconds

UX:
Loading states during auth

Error messages user-friendly

Mobile responsive auth pages

Smooth transitions between auth states

6. RISK MITIGATION
High Risk Areas:

1- Frontend-Backend Token Flow
- Mitigation: Implement interceptor debugging
- Fallback: localStorage as backup (secure flag)

2- Database Migration
- Mitigation: Backup before migration
- Rollback script ready

3- CORS Issues
- Mitigation: Test CORS configuration early
- Allow only frontend origin

7. READINESS FOR PHASE 3
Prerequisites Complete:
✅ Users table with relationships
✅ JWT authentication middleware
✅ Protected routes pattern
✅ User context in frontend
✅ API client with auth

Next Phase (Phase 3):
Task CRUD operations will build on this auth foundation. All task endpoints will use the get_current_user() dependency to ensure user isolation.

Created via: /sp.plan command
Conforms to: @.specify/memory/constitution.md
Review Status: Pending


## **CRITICAL INSTRUCTIONS FOR GEMINI-CLI:**

1. **Follow this EXACT structure** - Do NOT modify section order or naming
2. **Use placeholders** like `{current_date}` - Fill with actual values
3. **Reference constitution** using `@.specify/memory/constitution.md`
4. **Create realistic time estimates** (1-2 hours per task, 5 days total)
5. **Include technical specifics** - Code snippets, SQL, file paths
6. **Make deliverables concrete** - Actual file names, not vague descriptions
7. **Add risk mitigation** for each potential issue
8. **Save to**: `specs/phase-2-authentication/plan.md`
9. **Use markdown formatting** with proper headers and code blocks

## **ADDITIONAL CONTEXT FOR GEMINI-CLI:**
- Phase 1 is complete: Next.js 16 + FastAPI running, Neon PostgreSQL connected
- Design system has 6 components: Button, Input, Card, Container, Typography, Loading
- This plan should be immediately actionable by development team
- Balance detail with readability - engineers should understand without ambiguity
