from pydantic import BaseSettings


class Settings(BaseSettings):
    reddit_username: str
    reddit_password: str
    app_id: str
    app_secret: str
    base_url: str

    class Config:
        env_file = ".env"


settings = Settings()
