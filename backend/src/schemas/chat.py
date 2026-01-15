from typing import List, Optional, Dict, Any
from pydantic import BaseModel
from enum import Enum


class MessageRole(str, Enum):
    USER = "user"
    ASSISTANT = "assistant"


class ToolCall(BaseModel):
    """Schema for representing tool calls in chat responses"""
    id: str
    type: str = "function"
    function: Dict[str, Any]


class ToolCallResult(BaseModel):
    """Schema for representing tool call results"""
    id: str
    result: Dict[str, Any]


class ChatMessage(BaseModel):
    """Schema for individual chat messages"""
    role: MessageRole
    content: str
    tool_calls: Optional[List[ToolCall]] = None
    tool_call_results: Optional[List[ToolCallResult]] = None


class ChatRequest(BaseModel):
    """Schema for chat request payload"""
    user_id: str
    message: str
    conversation_id: Optional[int] = None


class ChatResponse(BaseModel):
    """Schema for chat response payload"""
    conversation_id: int
    message: ChatMessage
    tool_calls_executed: Optional[List[Dict[str, Any]]] = None
    success: bool = True
    error_message: Optional[str] = None
    # Enhanced for tool_calls metadata transparency (US3 requirement)
    metadata: Optional[Dict[str, Any]] = None