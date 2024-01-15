from fastapi import status, HTTPException, Depends, APIRouter, Response
import requests

router = APIRouter(
    prefix="/quotes",
    tags=['Quotes']
)


@router.get("/")
def get_quotes():
    return requests.get("https://animechan.xyz/api/quotes").json()


@router.get("/anime")
def get_quotes_by_anime(name: str, page: int = 1):
    return requests.get(f"https://animechan.xyz/api/quotes/anime?title={name}&page={page}").json()


@router.get("/character")
def get_quotes_by_character(name: str, page: int = 1):
    return requests.get(f"https://animechan.xyz/api/quotes/character?name={name}&page={page}").json()
