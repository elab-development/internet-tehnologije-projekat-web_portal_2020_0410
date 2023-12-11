from fastapi import status, HTTPException, Depends, APIRouter
from database import get_db
from sqlalchemy import desc
from sqlalchemy.sql import func, select
from sqlalchemy.orm import Session
from models import Review, Anime, User
from dtos import ReviewPost

router = APIRouter(
    prefix="/reviews",
    tags=['Reviews']
)


# TO-DO: response model
@router.get("/top/{limit}")
def get_top(limit: int = 5, db: Session = Depends(get_db)):
    animes = db\
        .query(Anime.name, func.avg(Review.rating).label('average'))\
        .group_by(Anime.name)\
        .join(Review)\
        .order_by(desc(func.avg(Review.rating).label('average'))).limit(limit)

    if not animes:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Best rated anime is not available")
    return animes


@router.get("/anime/{anime}")
def get_review_by_anime_id(anime: str, db: Session = Depends(get_db)):
    search = f"%{anime}%"
    subquery = db\
        .query(Anime.anime_id)\
        .filter(Anime.name.like(search))\
        .subquery()

    contents = db\
        .query(Anime.name, Review)\
        .join(Anime)\
        .filter(Review.anime_id.in_(select(subquery)))
    contents.all()

    if not contents:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Anime reviews with the name: {anime} are "
                                                                          f"not available")
    return contents


@router.get("/user/{user_id}")
def get_reviews_by_user_id(user_id: int, db: Session = Depends(get_db)):
    reviews = db.query(Review).filter(Review.user_id == user_id).all()
    if not reviews:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"reviews for user with id:{user_id} were "
                                                                          f"not found")
    return reviews


# TO-DO: current user
@router.post("/", status_code=status.HTTP_201_CREATED)
def create_review(review: ReviewPost, db: Session = Depends(get_db)):
    new_review = Review(**review.dict())
    db.add(new_review)
    db.commit()
    db.refresh(new_review)
    return new_review
