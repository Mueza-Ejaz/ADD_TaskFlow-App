from datetime import datetime, timedelta
from typing import Optional
from jose import jwt, JWTError
from pydantic import ValidationError # Although not used here, useful for broader validation
from ..config import settings

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """Creates an access token."""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.JWT_SECRET_KEY, algorithm=settings.JWT_ALGORITHM)
    return encoded_jwt

def verify_token(token: str) -> Optional[dict]:
    """Verifies a JWT token and returns the payload if valid."""
    try:
        payload = jwt.decode(token, settings.JWT_SECRET_KEY, algorithms=[settings.JWT_ALGORITHM])
        return payload
    except JWTError:
        return None
    except ValidationError: # In case the payload has a specific schema not met
        return None
