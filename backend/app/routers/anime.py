from fastapi import status, HTTPException, Depends, APIRouter
from database import get_db
from sqlalchemy import desc
from sqlalchemy.sql import func, select
from sqlalchemy.orm import Session
from models import Review, Anime, User

router = APIRouter(
    prefix="/animes",
    tags=['Animes']
)


# TO-DO: response model
@router.get("/search/{anime}")
def get_anime(anime: str, db: Session = Depends(get_db)):
    search = f"%{anime}%"
    animes = db\
        .query(Anime.name, Anime.english_name)\
        .filter(Anime.name.like(search))\
        .limit(20)

    if not animes:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Best rated anime is not available")
    return animes

