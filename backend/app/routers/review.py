from fastapi import status, HTTPException, Depends, APIRouter, Response
from database import get_db
from sqlalchemy import desc
from sqlalchemy.sql import func, select
from sqlalchemy.orm import Session
from models import Review, Anime, User
from dtos import ReviewCreate, ReviewUpdate, ReviewGet, ReviewResponse
from typing import List
from sys import stderr
import oauth2
from utils import get_dict


router = APIRouter(
    prefix="/reviews",
    tags=['Reviews']
)


# TO-DO: response model
@router.get("/top", status_code=status.HTTP_200_OK)
def get_top_rated_animes(limit: int = 5, db: Session = Depends(get_db),
                         current_user: int = Depends(oauth2.get_current_user)):
    animes = db\
        .query(Anime.name, func.avg(Review.rating).label('average'))\
        .group_by(Anime.name)\
        .join(Review)\
        .order_by(desc(func.avg(Review.rating).label('average'))).limit(limit)

    if not animes:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Best rated animes are not available")
    return animes


@router.get("/anime", status_code=status.HTTP_200_OK)
def get_review_by_anime_name(for_anime: str, db: Session = Depends(get_db),
                             current_user: int = Depends(oauth2.get_current_user)):
    search: str = f"%{for_anime}%"
    subquery = db\
        .query(Anime.anime_id)\
        .filter(Anime.name.like(search))\
        .subquery()
    reviews = db\
        .query(Anime.name, Review.rating, Review.content, User.username)\
        .join(Anime)\
        .join(User)\
        .filter(Review.anime_id.in_(select(subquery)))
    reviews = get_dict(reviews.all())

    if not reviews:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Anime reviews with the name: {for_anime} "
                                                                          f"are not available")
    return reviews


@router.get("/user", status_code=status.HTTP_200_OK)
def get_reviews_by_user_id(user_id: int, db: Session = Depends(get_db),
                           current_user: int = Depends(oauth2.get_current_user)):
    subquery = db \
        .query(User.user_id) \
        .filter(User.user_id == user_id) \
        .subquery()
    reviews = db\
        .query(Anime.name, Review.rating, Review.content, User.username)\
        .join(Anime)\
        .join(User)\
        .filter(User.user_id.in_(select(subquery)))

    reviews = get_dict(reviews.all())
    if not reviews:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"reviews for user with id:{user_id} were "
                                                                          f"not found")
    return reviews


# TO-DO: current user
@router.post("/", status_code=status.HTTP_201_CREATED, response_model=ReviewResponse)
def create_review(review: ReviewCreate, db: Session = Depends(get_db),
                  current_user: int = Depends(oauth2.get_current_user)):
    try:
        new_review = Review(**review.dict())
        db.add(new_review)
        db.commit()
        db.refresh(new_review)
        return new_review

    except Exception as e:
        stderr.write(f"Error occurred of type: {e}")
        return None


@router.put("/", status_code=status.HTTP_201_CREATED, response_model=ReviewResponse)
def update_review(username: str, anime_id: int, updated_review: ReviewUpdate, db: Session = Depends(get_db),
                  current_user: int = Depends(oauth2.get_current_user)):
    user = db.query(User).filter(User.username == username).first()

    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"review cant be found")

    review_query = db.query(Review).filter(Review.anime_id == anime_id and Review.user_id == user.user_id)
    review = review_query.first()

    if review is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"review cant be found")

    review_query.update(updated_review.dict(), synchronize_session=False)
    db.commit()
    return review_query.first()


@router.delete("/", status_code=status.HTTP_204_NO_CONTENT)
def delete_review(username: str, anime_id: int, db: Session = Depends(get_db),
                  current_user: int = Depends(oauth2.get_current_user)):
    user_query = db.query(User).filter(User.username == username)
    user = user_query.first()

    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"review cant be found")

    review_query = db.query(Review).filter(Review.anime_id == anime_id and Review.user_id == user.user_id)
    review = review_query.first()

    if review is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"review cant be found")

    review_query.delete(synchronize_session=False)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)
