from pydantic import BaseModel
from datetime import datetime


class ReviewCreate(BaseModel):
    anime_id: int
    user_id: int
    rating: float
    content: str


class ReviewUpdate(BaseModel):
    rating: float
    content: str


class UserCreate(BaseModel):
    username: str
    password: str
    first_name: str
    last_name: str
    description: str
    email: str
    last_log_in: datetime
    role_id: int


class UserUpdate(BaseModel):
    password: str
    first_name: str
    last_name: str
    description: str
    role_id: int
