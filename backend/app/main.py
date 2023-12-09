from fastapi import FastAPI
from routers import user, review, anime
import uvicorn

app = FastAPI()
app.include_router(user.router)
app.include_router(review.router)
app.include_router(anime.router)


# to test/start the app go to localhost:8000/docs or /redoc
@app.get("/")
async def root():
    return {"message": "Hi mom"}


if __name__ == "__main__":
    uvicorn.run(app, port=10000)
