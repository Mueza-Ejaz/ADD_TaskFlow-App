"""
Chat Service for managing conversation history and message persistence
Handles loading and saving conversation data to/from the database
"""

from typing import List, Optional
from sqlmodel import Session, select
from datetime import datetime

from ..models.conversation import Conversation
from ..models.message import Message, MessageRole


class ChatService:
    def __init__(self, db_session: Session):
        self.db_session = db_session

    def create_conversation(self, user_id: str) -> Conversation:
        """Create a new conversation for a user"""
        conversation = Conversation(user_id=user_id)
        self.db_session.add(conversation)
        self.db_session.commit()
        self.db_session.refresh(conversation)
        return conversation

    def get_conversation(self, conversation_id: int, user_id: str) -> Optional[Conversation]:
        """Get a specific conversation for a user"""
        conversation = self.db_session.get(Conversation, conversation_id)
        if conversation and conversation.user_id == user_id:
            return conversation
        return None

    def get_or_create_conversation(self, conversation_id: Optional[int], user_id: str) -> Conversation:
        """Get existing conversation or create a new one"""
        if conversation_id:
            conversation = self.get_conversation(conversation_id, user_id)
            if conversation:
                return conversation

        # Create new conversation if none exists or invalid
        return self.create_conversation(user_id)

    def load_full_conversation_history(self, conversation_id: int) -> List[dict]:
        """Load full conversation history for a given conversation ID"""
        # Get all messages for this conversation, ordered by creation time
        messages = self.db_session.exec(
            select(Message)
            .where(Message.conversation_id == conversation_id)
            .order_by(Message.created_at.asc())
        ).all()

        history = []
        for msg in messages:
            message_dict = {
                "id": msg.id,
                "user_id": msg.user_id,
                "conversation_id": msg.conversation_id,
                "role": msg.role.value,
                "content": msg.content,
                "created_at": msg.created_at.isoformat() if msg.created_at else None,
            }

            # Add tool_calls if they exist
            if msg.tool_calls:
                message_dict["tool_calls"] = msg.tool_calls

            history.append(message_dict)

        return history

    def save_message(self,
                    conversation_id: int,
                    user_id: str,
                    role: MessageRole,
                    content: str,
                    tool_calls: Optional[str] = None) -> Message:
        """Save a message to the conversation"""
        message = Message(
            user_id=user_id,
            conversation_id=conversation_id,
            role=role,
            content=content,
            tool_calls=tool_calls
        )
        self.db_session.add(message)
        self.db_session.commit()
        self.db_session.refresh(message)
        return message

    def get_user_conversations(self, user_id: str) -> List[Conversation]:
        """Get all conversations for a specific user"""
        conversations = self.db_session.exec(
            select(Conversation)
            .where(Conversation.user_id == user_id)
            .order_by(Conversation.created_at.desc())
        ).all()

        return conversations

    def get_recent_messages(self, conversation_id: int, limit: int = 10) -> List[Message]:
        """Get recent messages from a conversation"""
        messages = self.db_session.exec(
            select(Message)
            .where(Message.conversation_id == conversation_id)
            .order_by(Message.created_at.desc())
            .limit(limit)
        ).all()

        # Reverse to return in chronological order
        return list(reversed(messages))