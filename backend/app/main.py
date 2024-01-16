from fastapi import FastAPI
from backend.app.routers import user, review, anime, auth, animeChan
import uvicorn
from fastapi_pagination import add_pagination
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
app.include_router(user.router)
app.include_router(review.router)
app.include_router(anime.router)
app.include_router(auth.router)
app.include_router(animeChan.router)

origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


# to test/start the app go to localhost:8000/docs or /redoc
@app.get("/")
async def root():
    return {"message": "Hi mom"}


if __name__ == "__main__":
    add_pagination(app)
    uvicorn.run(app, port=8000)
