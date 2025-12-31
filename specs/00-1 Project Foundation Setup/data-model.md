# Data Model: ADD_TaskFlow Project Foundation

## Overview
This document defines the data models for the ADD_TaskFlow application, including entities, relationships, and validation rules based on the project requirements.

## Entity Definitions

### User
Represents a registered user of the application.

#### Fields
- `id`: UUID (Primary Key)
  - Auto-generated unique identifier
  - Required, Immutable
- `email`: String (Unique)
  - User's email address for login
  - Required, Validated as email format
- `name`: String
  - User's display name
  - Required, Max length: 100 characters
- `password_hash`: String
  - Bcrypt hash of user's password
  - Required, Min length: 60 characters (after hashing)
- `created_at`: DateTime (with timezone)
  - Timestamp when user was created
  - Auto-generated, Immutable
- `updated_at`: DateTime (with timezone)
  - Timestamp when user was last updated
  - Auto-generated, Auto-updated

#### Validation Rules
- Email must be unique across all users
- Email must follow standard email format
- Name must be 1-100 characters
- Password must be at least 8 characters before hashing

#### Relationships
- One-to-Many: User → Tasks (user owns multiple tasks)

### Task
Represents a task item in the user's todo list.

#### Fields
- `id`: UUID (Primary Key)
  - Auto-generated unique identifier
  - Required, Immutable
- `title`: String
  - Title of the task
  - Required, Max length: 200 characters
- `description`: Text (Optional)
  - Detailed description of the task
  - Optional, Max length: 1000 characters
- `completed`: Boolean
  - Whether the task is completed
  - Required, Default: false
- `user_id`: UUID (Foreign Key)
  - Reference to the user who owns this task
  - Required, References User.id
- `created_at`: DateTime (with timezone)
  - Timestamp when task was created
  - Auto-generated, Immutable
- `updated_at`: DateTime (with timezone)
  - Timestamp when task was last updated
  - Auto-generated, Auto-updated

#### Validation Rules
- Title must be 1-200 characters
- Description, if provided, must be 1-1000 characters
- user_id must reference an existing user
- A user cannot have more than 1000 active tasks (not completed)

#### Relationships
- Many-to-One: Task → User (task belongs to one user)

### Session
Represents an active user session for authentication purposes.

#### Fields
- `id`: UUID (Primary Key)
  - Auto-generated unique identifier
  - Required, Immutable
- `user_id`: UUID (Foreign Key)
  - Reference to the user associated with this session
  - Required, References User.id
- `session_token`: String
  - JWT token for session authentication
  - Required, Unique
- `expires_at`: DateTime
  - Timestamp when the session expires
  - Required
- `created_at`: DateTime (with timezone)
  - Timestamp when session was created
  - Auto-generated, Immutable

#### Validation Rules
- session_token must be unique across all sessions
- expires_at must be in the future
- user_id must reference an existing user

#### Relationships
- Many-to-One: Session → User (session belongs to one user)

## Database Schema

```sql
-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tasks table
CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(200) NOT NULL,
    description TEXT,
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Sessions table
CREATE TABLE sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    session_token VARCHAR(255) UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_tasks_user_id ON tasks(user_id);
CREATE INDEX idx_sessions_user_id ON sessions(user_id);
CREATE INDEX idx_sessions_token ON sessions(session_token);
CREATE INDEX idx_users_email ON users(email);
```

## State Transitions

### Task State Transitions
- `created` → `active` (default state when created)
- `active` → `completed` (when user marks task as done)
- `completed` → `active` (when user unmarks task as done)

### Session State Transitions
- `created` → `active` (when user logs in)
- `active` → `expired` (when session expires)
- `active` → `terminated` (when user logs out)
- `expired` → `terminated` (when expired session is cleaned up)

## Constraints and Business Rules

1. **Data Integrity**:
   - Foreign key constraints ensure referential integrity
   - Unique constraints prevent duplicate emails and session tokens
   - NOT NULL constraints ensure required fields are present

2. **Access Control**:
   - Users can only access their own tasks
   - Tasks are automatically deleted when the owning user is deleted (CASCADE)

3. **Performance**:
   - Proper indexes on foreign keys and frequently queried fields
   - UUID primary keys for distributed systems compatibility

4. **Security**:
   - Passwords are stored as bcrypt hashes, never in plain text
   - Session tokens are unique and securely generated
   - Session expiration prevents indefinite access

## Future Considerations

1. **Additional Entities**:
   - Categories: Group tasks by category
   - Tags: Add tags to tasks for better organization
   - Reminders: Set reminders for tasks

2. **Enhanced Relationships**:
   - Sharing: Allow users to share tasks with others
   - Collaboration: Multiple users working on same tasks

3. **Advanced Features**:
   - Soft deletes: Keep deleted tasks for a period before permanent removal
   - Audit trail: Track changes to tasks for accountability