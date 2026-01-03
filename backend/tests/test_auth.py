from fastapi.testclient import TestClient
from sqlmodel import Session, SQLModel, create_engine
from backend.src.main import app # Corrected import for app
from backend.src.models.user import User
from backend.src.database import get_session
from backend.src.auth.password import hash_password
import pytest

# Setup test database
@pytest.fixture(name="session")
def session_fixture():
    engine = create_engine("sqlite:///./test.db")
    SQLModel.metadata.create_all(engine)
    with Session(engine) as session:
        yield session
    SQLModel.metadata.drop_all(engine) # Clean up after tests

@pytest.fixture(name="client")
def client_fixture(session: Session):
    def get_session_override():
        yield session
    app.dependency_overrides[get_session] = get_session_override
    client = TestClient(app)
    yield client
    app.dependency_overrides.clear()

def test_signup_user(client: TestClient):
    response = client.post(
        "/api/v1/auth/signup",
        json={"email": "test@example.com", "password": "password123", "full_name": "Test User"}
    )
    assert response.status_code == 200
    assert "access_token" in response.json()
    assert response.json()["token_type"] == "bearer"

def test_signup_user_existing_email(client: TestClient):
    # First signup
    client.post(
        "/api/v1/auth/signup",
        json={"email": "test2@example.com", "password": "password123"}
    )
    # Try to signup again with same email
    response = client.post(
        "/api/v1/auth/signup",
        json={"email": "test2@example.com", "password": "password123"}
    )
    assert response.status_code == 400
    assert response.json()["detail"] == "Email already registered"

def test_login_user(client: TestClient, session: Session):
    # Create user directly in DB for login test
    hashed_password = hash_password("password123")
    user = User(email="login@example.com", hashed_password=hashed_password, full_name="Login User")
    session.add(user)
    session.commit()
    session.refresh(user)

    response = client.post(
        "/api/v1/auth/login",
        json={"email": "login@example.com", "password": "password123"}
    )
    assert response.status_code == 200
    assert "access_token" in response.json()
    assert response.json()["token_type"] == "bearer"

def test_login_user_invalid_credentials(client: TestClient):
    response = client.post(
        "/api/v1/auth/login",
        json={"email": "nonexistent@example.com", "password": "wrongpassword"}
    )
    assert response.status_code == 401
    assert response.json()["detail"] == "Incorrect email or password"

def test_get_me(client: TestClient, session: Session):
    # Create user and get token
    hashed_password = hash_password("password123")
    user = User(email="me@example.com", hashed_password=hashed_password, full_name="Me User")
    session.add(user)
    session.commit()
    session.refresh(user)

    login_response = client.post(
        "/api/v1/auth/login",
        json={"email": "me@example.com", "password": "password123"}
    )
    token = login_response.json()["access_token"]

    response = client.get(
        "/api/v1/auth/me",
        headers={"Authorization": f"Bearer {token}"}
    )
    assert response.status_code == 200
    assert response.json()["email"] == "me@example.com"
    assert response.json()["full_name"] == "Me User"

def test_get_me_unauthorized(client: TestClient):
    response = client.get("/api/v1/auth/me")
    assert response.status_code == 401
    assert response.json()["detail"] == "Could not validate credentials"