# Implementation Plan: User Authentication

**Branch**: `P2-02-User-Authentication` | **Date**: 2026-01-02 | **Spec**: specs/P2-02-User-Authentication/spec.md
**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

**Note**: This template is filled in by the `/sp.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

This plan outlines the implementation of Phase 2: User Authentication for the ADD_TaskFlow-App. It encompasses creating a secure backend authentication system, implementing RESTful auth endpoints, developing a modern UI with NextAuth.js, securing routes, integrating frontend and backend, hardening security, and adding comprehensive tests. The focus is on a robust, secure, and user-friendly authentication experience.

## Technical Context

**Language/Version**: Frontend: TypeScript (Next.js 16); Backend: Python 3.12+ (FastAPI)
**Primary Dependencies**: Next.js 16, FastAPI, NextAuth.js (`next-auth`), `jose`, `jwt-decode`, React Context, Python-Jose (`python-jose[cryptography]`), Passlib (`passlib[bcrypt]`), python-multipart, SQLModel
**Storage**: Neon PostgreSQL (users table, tasks table with user_id foreign key)
**Testing**: Frontend: Jest + React Testing Library; Backend: pytest; E2E: Playwright
**Target Platform**: Web (Desktop & Mobile Responsive)
**Project Type**: Web application (frontend + backend)
**Performance Goals**: Login response time < 200ms, Signup response time < 300ms, Page Load time < 2 seconds
**Constraints**: Password hashing with bcrypt (12 rounds minimum), JWT tokens with 24h access / 7d refresh expiry, HTTP-only cookies (SameSite=Strict, httpOnly=true, secure=true), Rate limiting on auth endpoints (5 requests/minute), Input validation on all forms, Environment variables for all secrets, SQL injection prevention via SQLModel, CORS properly configured.
**Scale/Scope**: Modern Todo Web Application, supporting multiple users.
## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

The proposed plan for Phase 2: User Authentication adheres to the project's constitution in the following key areas:

*   **Tech Stack**: Aligns with Next.js 16, FastAPI, Neon PostgreSQL, NextAuth.js, JWT, bcrypt, SQLModel, as defined in Project Overview.
*   **Code Quality**: Frontend (TypeScript strict mode, functional components, ESLint + Prettier) and Backend (Python 3.12+, type hints, docstrings, Pydantic, SQLModel) standards are maintained.
*   **Security Standards**: Comprehensive security measures including JWT tokens with specified expiry, bcrypt hashing (12 rounds min), environment variables for secrets, input validation, SQL injection prevention (via SQLModel), CORS, and user data isolation are explicitly part of the plan.
*   **Database Standards**: `users` table creation, `user_id` foreign key for tasks, and use of SQLModel are consistent with database schema design principles.
*   **API Design Standards**: API endpoint structure (`/api/v1/auth/*`) and use of standard HTTP methods are consistent with guidelines.
*   **Frontend Architecture**: Adherence to App Router structure (`app/(auth)/signup`, `app/(auth)/login`) and component organization is planned.
*   **Testing Standards**: Integration of Jest, React Testing Library, pytest, and Playwright for different testing levels aligns with the testing strategy.

All gates are passed, and no violations are identified.

## Architecture Decisions

### Decision 1: Authentication Strategy
- **Choice**: NextAuth.js (Frontend) + JWT (Backend) hybrid model
- **Why**: Stateless backend, NextAuth.js handles frontend complexity
- **Alternatives considered**:
    - Session-based auth (rejected: stateful, not scalable)
    - OAuth only (rejected: overkill for MVP)
- **Impact**:
    - ✅ Frontend handles signup/login UI
    - ✅ Backend validates JWT statelessly
    - ⚠️ Token refresh logic needed

### Decision 2: Token Storage
- **Choice**: HTTP-only cookies + secure flag
- **Why**: XSS protection, automatic cookie handling
- **Security implications**: SameSite=Strict, httpOnly=true, secure=true

### Decision 3: Password Security
- **Choice**: bcrypt with 12 rounds minimum
- **Why**: Industry standard, slow hashing for brute force protection

## Project Structure

### Documentation (this feature)

```text
specs/P2-02-User-Authentication/
├── plan.md              # This file (/sp.plan command output)
├── research.md          # Phase 0 output (/sp.plan command)
├── data-model.md        # Phase 1 output (/sp.plan command)
├── quickstart.md        # Phase 1 output (/sp.plan command)
├── contracts/           # Phase 1 output (/sp.plan command)
└── tasks.md             # Phase 2 output (/sp.tasks command - NOT created by /sp.plan)
```

### Source Code (repository root)

```text
backend/
├── src/
│   ├── auth/ # New directory for auth utilities
│   │   ├── password.py
│   │   ├── jwt_handler.py
│   │   └── security.py
│   ├── api/v1/endpoints/ # Updated for auth endpoints
│   │   ├── auth.py
│   │   └── tasks.py # To be updated
│   ├── core/ # Existing, for middleware
│   │   └── middleware.py
│   ├── models/
│   │   ├── user.py # New User model
│   │   └── task.py # Updated Task model
│   └── ...
└── tests/ # For backend tests

frontend/
├── app/
│   ├── (auth)/ # New directory for auth pages
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   └── dashboard/page.tsx # New dashboard page
├── components/
│   ├── auth/ # New directory for auth components
│   │   ├── ProtectedRoute.tsx
│   │   └── AuthProvider.tsx
│   ├── layout/
│   ├── shared/
│   └── ui/
├── lib/
│   ├── auth.ts # New NextAuth.js config
│   └── api.ts # Updated with auth client
├── src/ # Existing frontend source
└── tests/ # For frontend tests
```

**Structure Decision**: The project is a monorepo structured with `backend/` for the FastAPI application and `frontend/` for the Next.js application, as established in Phase 1 and consistent with the project constitution. This structure facilitates clear separation of concerns and independent development/deployment of each service. The new authentication feature introduces dedicated modules within both `backend/src` and `frontend/app`, `components`, and `lib` to encapsulate authentication logic and UI.


