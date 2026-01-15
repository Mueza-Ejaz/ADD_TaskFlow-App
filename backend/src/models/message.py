from typing import Optional
from datetime import datetime
from sqlmodel import Field, SQLModel, Relationship
from sqlalchemy import Column
from sqlalchemy import Enum as SQLEnum
import enum
from .conversation import Conversation  # Import the Conversation model


class MessageRole(str, enum.Enum):
    USER = "user"
    ASSISTANT = "assistant"


class Message(SQLModel, table=True):
    __tablename__ = "messages"

    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: str = Field(index=True, nullable=False)  # Foreign key to users.id
    conversation_id: int = Field(index=True, nullable=False)  # Foreign key to conversation.id
    role: MessageRole = Field(sa_column=Column(SQLEnum(MessageRole)))
    content: str = Field(nullable=False)
    tool_calls: Optional[str] = Field(default=None)  # JSON string for tool call metadata
    created_at: datetime = Field(default_factory=datetime.utcnow)

    # Relationship to conversation
    conversation: Conversation = Relationship(back_populates="messages")