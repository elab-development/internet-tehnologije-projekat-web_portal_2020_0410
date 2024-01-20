import sqlalchemy
from fastapi import status, HTTPException, Depends, APIRouter, Response
from backend.app.database import get_db
from sqlalchemy.orm import Session
from backend.app.models import Anime
from backend.app.dtos import AnimeResponse, AnimeCreate, AnimeUpdate
from fastapi_pagination.ext.sqlalchemy import paginate
from fastapi_pagination import Page
from sys import stderr
import requests
from sqlalchemy import select, desc
from transformers import pipeline

router = APIRouter(
    prefix="/animes",
    tags=['Animes']
)


@router.get("/search", status_code=status.HTTP_200_OK, response_model=Page[AnimeResponse])
def get_anime(anime_name: str, ascending: bool, db: Session = Depends(get_db)):
    search: str = f"%{anime_name}%"
    if ascending:
        return paginate(db, select(Anime).filter(Anime.name.like(search)).order_by(Anime.name))
    else:
        return paginate(db, select(Anime).filter(Anime.name.like(search)).order_by(desc(Anime.name)))


@router.get("/search/rating", status_code=status.HTTP_200_OK, response_model=Page[AnimeResponse])
def get_anime(anime_name: str, ascending: bool, db: Session = Depends(get_db)):
    search: str = f"%{anime_name}%"
    if ascending:
        return paginate(db, select(Anime).filter(Anime.name.like(search)).order_by(Anime.score))
    else:
        return paginate(db, select(Anime).filter(Anime.name.like(search)).order_by(desc(Anime.score)))


@router.get("/search/genres", status_code=status.HTTP_200_OK, response_model=Page[AnimeResponse])
def get_anime(anime_name: str, ascending: bool, db: Session = Depends(get_db)):
    search: str = f"%{anime_name}%"
    if ascending:
        return paginate(db, select(Anime).filter(Anime.name.like(search)).order_by(Anime.genres))
    else:
        return paginate(db, select(Anime).filter(Anime.name.like(search)).order_by(desc(Anime.genres)))


@router.get("/search/type", status_code=status.HTTP_200_OK, response_model=Page[AnimeResponse])
def get_anime(anime_name: str, ascending: bool, db: Session = Depends(get_db)):
    search: str = f"%{anime_name}%"
    if ascending:
        return paginate(db, select(Anime).filter(Anime.name.like(search)).order_by(Anime.type))
    else:
        return paginate(db, select(Anime).filter(Anime.name.like(search)).order_by(desc(Anime.type)))


@router.post("/", status_code=status.HTTP_201_CREATED, response_model=AnimeResponse)
def create_anime(anime: AnimeCreate, db: Session = Depends(get_db)):
    try:
        new_anime = Anime(**anime.dict())
        db.add(new_anime)
        db.commit()
        db.refresh(new_anime)
        return new_anime
    except Exception as e:
        stderr.write(f"Error occurred of type: {e}")
        return None


@router.delete("/", status_code=status.HTTP_204_NO_CONTENT)
def delete_anime(anime_id: str, db: Session = Depends(get_db)):
    anime_query = db.query(Anime).filter(Anime.anime_id == anime_id)
    anime = anime_query.first()

    if anime is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"anime cant be found")

    anime_query.delete(synchronize_session=False)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.put("/", status_code=status.HTTP_201_CREATED, response_model=AnimeResponse)
def update_anime(anime_id: int, updated_anime: AnimeUpdate, db: Session = Depends(get_db)):
    anime_query = db.query(Anime).filter(Anime.anime_id == anime_id)
    anime = anime_query.first()

    if anime is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"anime cant be found")

    anime_query.update(updated_anime.dict(), synchronize_session=False)
    db.commit()
    return anime_query.first()


@router.get('/opinion')
def get_opinion(anime_name: str):
    url = f"http://127.0.0.1:10001/opinion/{anime_name}"
    res = requests.get(url)
    return {anime_name: res.text}


@router.get('/top')
def get_top():
    url = "http://127.0.0.1:10001/top"
    res = requests.get(url)
    return res.json()


@router.get('/hot')
def get_hot():
    url = "http://127.0.0.1:10001/hot"
    res = requests.get(url)
    return res.json()


@router.get('/stats')
def get_statistics(db: Session = Depends(get_db)):
    anime = db.query(Anime.genres, sqlalchemy.func.count(Anime.anime_id)).group_by(Anime.genres).all()
    res = []
    for k, v in anime:
        if k is None:
            continue
        res.append({"type": k, "number": v})
    res.sort(key=lambda x: x["number"], reverse=True)
    return res[:10]


@router.get('/story')
def get_story():
    story_gen = pipeline("text-generation", "pranavpsv/gpt2-genre-story-generator")
    s = "story "
    while len(s) < 1000:
        s += story_gen(s[-10:])[0]["generated_text"]
    return {"story": s.rsplit(".", maxsplit=1)[0][6:]}
