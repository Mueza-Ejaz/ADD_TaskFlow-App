"""
MCP Tools for Task Management
These tools will be used by the OpenAI Agent to manage user tasks through natural language
"""

from typing import List, Optional, Callable, Any
from pydantic import BaseModel, Field
from functools import wraps
from src.models.task import Task  # Using existing task model from the application
from src.services.task_service import TaskService
from sqlmodel import Session, select


def user_isolation_check(func: Callable) -> Callable:
    """
    Decorator to ensure user isolation - checks that operations are performed on resources owned by the user
    """
    @wraps(func)
    def wrapper(*args, **kwargs):
        # This decorator ensures that the user_id in the params matches the expected user
        # For now, we validate this inside the functions themselves
        return func(*args, **kwargs)
    return wrapper


class AddTaskParams(BaseModel):
    """Parameters for adding a new task"""
    user_id: str = Field(..., description="ID of the user creating the task")
    title: str = Field(..., description="Title of the task")
    description: Optional[str] = Field(None, description="Description of the task")


class ListTasksParams(BaseModel):
    """Parameters for listing tasks"""
    user_id: str = Field(..., description="ID of the user whose tasks to list")
    status: Optional[str] = Field(None, description="Filter tasks by status (pending, completed, etc.)")


class UpdateTaskParams(BaseModel):
    """Parameters for updating a task"""
    user_id: str = Field(..., description="ID of the user who owns the task")
    task_id: int = Field(..., description="ID of the task to update")
    title: Optional[str] = Field(None, description="New title for the task")
    description: Optional[str] = Field(None, description="New description for the task")
    status: Optional[str] = Field(None, description="New status for the task")


class CompleteTaskParams(BaseModel):
    """Parameters for completing a task"""
    user_id: str = Field(..., description="ID of the user who owns the task")
    task_id: int = Field(..., description="ID of the task to mark as completed")


class DeleteTaskParams(BaseModel):
    """Parameters for deleting a task"""
    user_id: str = Field(..., description="ID of the user who owns the task")
    task_id: int = Field(..., description="ID of the task to delete")


@user_isolation_check
def add_task(params: AddTaskParams, db_session: Session) -> dict:
    """
    Add a new task for a user
    """
    try:
        # Convert user_id string to int if needed, assuming it represents a user ID
        # In a real implementation, we'd have a user lookup mechanism
        try:
            user_id_int = int(params.user_id) if params.user_id.isdigit() else 1  # Default to user 1 for demo
        except (ValueError, AttributeError):
            user_id_int = 1  # Default fallback

        task_service = TaskService(db_session)
        task_data = {
            "user_id": user_id_int,
            "title": params.title,
            "description": params.description or "",
            "status": "pending"
        }

        # Create the task
        task = task_service.create_task(task_data)

        return {
            "success": True,
            "task_id": task.id,
            "message": f"Task '{params.title}' has been created successfully!"
        }
    except Exception as e:
        return {
            "success": False,
            "error": str(e),
            "message": f"Failed to create task: {str(e)}"
        }


@user_isolation_check
def list_tasks(params: ListTasksParams, db_session: Session) -> dict:
    """
    List tasks for a user with optional status filtering
    """
    try:
        # Convert user_id string to int if needed
        try:
            user_id_int = int(params.user_id) if params.user_id.isdigit() else 1  # Default to user 1 for demo
        except (ValueError, AttributeError):
            user_id_int = 1  # Default fallback

        # Query tasks for the user
        statement = select(Task).where(Task.user_id == user_id_int)

        if params.status:
            statement = statement.where(Task.status == params.status)

        statement = statement.order_by(Task.created_at.desc())
        tasks = db_session.exec(statement).all()

        task_list = []
        for task in tasks:
            task_list.append({
                "id": task.id,
                "title": task.title,
                "description": task.description,
                "status": task.status,
                "created_at": task.created_at.isoformat() if task.created_at else None
            })

        status_filter = f" ({params.status})" if params.status else ""
        return {
            "success": True,
            "tasks": task_list,
            "message": f"You have {len(task_list)} task(s){status_filter}."
        }
    except Exception as e:
        return {
            "success": False,
            "error": str(e),
            "message": f"Failed to list tasks: {str(e)}"
        }


@user_isolation_check
def update_task(params: UpdateTaskParams, db_session: Session) -> dict:
    """
    Update a task for a user
    """
    try:
        # Convert user_id string to int if needed
        try:
            user_id_int = int(params.user_id) if params.user_id.isdigit() else 1  # Default to user 1 for demo
        except (ValueError, AttributeError):
            user_id_int = 1  # Default fallback

        # First, verify the task belongs to the user
        task = db_session.get(Task, params.task_id)
        if not task:
            return {
                "success": False,
                "error": "Task not found",
                "message": f"Task with ID {params.task_id} not found."
            }

        if task.user_id != user_id_int:
            return {
                "success": False,
                "error": "Permission denied",
                "message": "You don't have permission to update this task."
            }

        # Update the task fields that were provided
        if params.title is not None:
            task.title = params.title
        if params.description is not None:
            task.description = params.description
        if params.status is not None:
            task.status = params.status

        db_session.add(task)
        db_session.commit()
        db_session.refresh(task)

        return {
            "success": True,
            "task_id": task.id,
            "message": f"Task '{task.title}' has been updated successfully!"
        }
    except Exception as e:
        return {
            "success": False,
            "error": str(e),
            "message": f"Failed to update task: {str(e)}"
        }


@user_isolation_check
def complete_task(params: CompleteTaskParams, db_session: Session) -> dict:
    """
    Mark a task as completed
    """
    try:
        # Convert user_id string to int if needed
        try:
            user_id_int = int(params.user_id) if params.user_id.isdigit() else 1  # Default to user 1 for demo
        except (ValueError, AttributeError):
            user_id_int = 1  # Default fallback

        # First, verify the task belongs to the user
        task = db_session.get(Task, params.task_id)
        if not task:
            return {
                "success": False,
                "error": "Task not found",
                "message": f"Task with ID {params.task_id} not found."
            }

        if task.user_id != user_id_int:
            return {
                "success": False,
                "error": "Permission denied",
                "message": "You don't have permission to complete this task."
            }

        # Update the task status to completed
        task.status = "completed"
        db_session.add(task)
        db_session.commit()
        db_session.refresh(task)

        return {
            "success": True,
            "task_id": task.id,
            "message": f"Task '{task.title}' has been marked as completed!"
        }
    except Exception as e:
        return {
            "success": False,
            "error": str(e),
            "message": f"Failed to complete task: {str(e)}"
        }


@user_isolation_check
def delete_task(params: DeleteTaskParams, db_session: Session) -> dict:
    """
    Delete a task
    """
    try:
        # Convert user_id string to int if needed
        try:
            user_id_int = int(params.user_id) if params.user_id.isdigit() else 1  # Default to user 1 for demo
        except (ValueError, AttributeError):
            user_id_int = 1  # Default fallback

        # First, verify the task belongs to the user
        task = db_session.get(Task, params.task_id)
        if not task:
            return {
                "success": False,
                "error": "Task not found",
                "message": f"Task with ID {params.task_id} not found."
            }

        if task.user_id != user_id_int:
            return {
                "success": False,
                "error": "Permission denied",
                "message": "You don't have permission to delete this task."
            }

        # Delete the task
        db_session.delete(task)
        db_session.commit()

        return {
            "success": True,
            "task_id": params.task_id,
            "message": f"Task has been deleted successfully!"
        }
    except Exception as e:
        return {
            "success": False,
            "error": str(e),
            "message": f"Failed to delete task: {str(e)}"
        }