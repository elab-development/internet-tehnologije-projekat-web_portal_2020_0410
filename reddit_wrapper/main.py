from util import opinion, weekly_top_posts, hot_posts
import uvicorn
from fastapi import FastAPI

app = FastAPI()


@app.get('/opinion/{anime_name}')
def get_opinion(anime_name: str) -> str:
    op = opinion(anime_name)
    if op >= 0.7:
        return 'great'
    elif op >= 0.4:
        return 'good'
    elif op >= 0.3:
        return 'ok'
    else:
        return 'bad'


@app.get('/top')
def get_top():
    return weekly_top_posts()


@app.get('/hot')
def get_hot():
    return hot_posts()


if __name__ == '__main__':
    uvicorn.run(app, port=10001)

