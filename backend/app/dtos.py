from pydantic import BaseModel


class ReviewPost(BaseModel):
    anime_id: int
    user_id: int
    rating: float
    content: str


class ReviewPut(BaseModel):
    rating: float
    content: str
