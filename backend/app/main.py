from fastapi import FastAPI
from backend.app.routers import user, review, anime, auth
import uvicorn
from fastapi_pagination import add_pagination

app = FastAPI()
app.include_router(user.router)
app.include_router(review.router)
app.include_router(anime.router)
app.include_router(auth.router)


# to test/start the app go to localhost:8000/docs or /redoc
@app.get("/")
async def root():
    return {"message": "Hi mom"}


if __name__ == "__main__":
    add_pagination(app)
    uvicorn.run(app, port=10000)
