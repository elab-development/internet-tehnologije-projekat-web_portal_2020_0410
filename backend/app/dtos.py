from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class AnimeResponse(BaseModel):
    name: str
    score: Optional[float] = 0.0
    genres: Optional[str] = None
    synopsis: Optional[str] = None
    type: Optional[str] = None
    episodes: Optional[int] = 0
    aired: Optional[str] = None
    image_url: Optional[str] = None

    class Config:
        orm_mode = True


class AnimeCreate(AnimeResponse):
    pass


class AnimeUpdate(BaseModel):
    score: int
    episodes: int


class ReviewGet(BaseModel):
    anime_id: int
    user_id: int
    rating: float
    content: str


class ReviewCreate(ReviewGet):
    pass


class ReviewResponse(ReviewGet):
    class Config:
        orm_mode = True


class ReviewUpdate(BaseModel):
    rating: float
    content: str


class UserResponse(BaseModel):
    username: str
    first_name: str
    last_name: str
    description: Optional[str] = None
    email: str
    role_id: int

    class Config:
        orm_mode = True


class UserCreate(BaseModel):
    username: str
    password: str
    first_name: str
    last_name: str
    description: Optional[str] = None
    email: str
    last_log_in: datetime
    role_id: int


class UserUpdate(BaseModel):
    password: str
    first_name: str
    last_name: str
    description: Optional[str] = None
    role_id: int
