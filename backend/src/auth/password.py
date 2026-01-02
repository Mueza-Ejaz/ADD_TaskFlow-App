from passlib.context import CryptContext
from fastapi import HTTPException, status # Import HTTPException and status

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def _check_password_strength(password: str):
    """Simple check for password strength."""
    if len(password) < 8:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Password must be at least 8 characters long."
        )

def hash_password(password: str) -> str:
    """Hashes a password using bcrypt."""
    _check_password_strength(password) # Check strength before hashing
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verifies a plain password against a hashed password."""
    return pwd_context.verify(plain_password, hashed_password)