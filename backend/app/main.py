from fastapi import FastAPI
from routers import user
import uvicorn

app = FastAPI()
app.include_router(user.router)


# to test/start the app go to localhost:8000/docs or /redoc
@app.get("/")
async def root():
    return {"message": "Hi mom"}


if __name__ == "main":
    uvicorn.run(app, port=10000)
