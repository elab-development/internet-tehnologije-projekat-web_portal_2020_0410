from fastapi import status, HTTPException, Depends, APIRouter
from database import get_db
from sqlalchemy import desc
from sqlalchemy.sql import func, select
from sqlalchemy.orm import Session
from models import Review, Anime, User

router = APIRouter(
    prefix="/reviews",
    tags=['Reviews']
)


# TO-DO: response model
@router.get("/top/{limit}")
def get_user(limit: int = 5, db: Session = Depends(get_db)):
    animes = db\
        .query(Anime.name, func.avg(Review.rating).label('average'))\
        .group_by(Anime.name)\
        .join(Review)\
        .order_by(desc(func.avg(Review.rating).label('average'))).limit(limit)

    if not animes:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Best rated anime is not available")
    return animes


@router.get("/content/{anime}")
def get_content(anime: str, db: Session = Depends(get_db)):
    search = f"%{anime}%"
    subquery = db\
        .query(Anime.anime_id)\
        .filter(Anime.name.like(search))\
        .subquery()

    contents = db\
        .query(Review.content, Anime.name)\
        .join(Anime)\
        .filter(Review.anime_id.in_(select(subquery)))
    contents.all()

    if not contents:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Anime reviews are not available")
    return contents
