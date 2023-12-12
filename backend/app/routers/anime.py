from fastapi import status, HTTPException, Depends, APIRouter
from database import get_db
from sqlalchemy.orm import Session
from models import Review, Anime, User
from dtos import AnimeResponse
from typing import List

router = APIRouter(
    prefix="/animes",
    tags=['Animes']
)


# TO-DO: response model
@router.get("/search/{anime_name}", status_code=status.HTTP_200_OK, response_model=List[AnimeResponse])
def get_anime(anime_name: str, db: Session = Depends(get_db)):
    search: str = f"%{anime_name}%"
    animes = db\
        .query(Anime)\
        .filter(Anime.name.like(search))\
        .all()

    if not animes:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Best rated anime is not available")
    return animes

