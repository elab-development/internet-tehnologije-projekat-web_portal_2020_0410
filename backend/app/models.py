from sqlalchemy import Column, Integer, String, ForeignKey, Numeric
from sqlalchemy.orm import relationship
from sqlalchemy.sql.sqltypes import TIMESTAMP
from sqlalchemy.orm import declarative_base
from datetime import datetime

Base = declarative_base()


class Role(Base):
    __tablename__ = 'roles'
    role_id: int = Column(Integer, primary_key=True, nullable=False)
    title: str = Column(String, nullable=False)
    displayName: str = Column(String, nullable=False)


class User(Base):
    __tablename__ = 'users'
    user_id: int = Column(Integer, primary_key=True, nullable=False)
    username: str = Column(String, nullable=False, unique=True)
    password: str = Column(String, nullable=False)
    first_name: str = Column(String, nullable=False)
    last_name: str = Column(String, nullable=False)
    description: str = Column(String, nullable=True)
    email: str = Column(String, nullable=False, unique=True)
    last_log_in: datetime = Column(TIMESTAMP(timezone=True), nullable=False, default=datetime.utcnow)
    role_id: int = Column(Integer, ForeignKey("roles.role_id", ondelete="CASCADE"), nullable=False)
    role = relationship("Role")


class Anime(Base):
    __tablename__ = 'animes'
    anime_id: int = Column(Integer, primary_key=True, nullable=False)
    name: str = Column(String, nullable=True)
    english_name: str = Column(String, nullable=True)
    score: float = Column(Numeric, nullable=True)
    genres: str = Column(String, nullable=True)
    synopsis: str = Column(String, nullable=True)
    type: str = Column(String, nullable=True)
    episodes: int = Column(String, nullable=True)
    aired: str = Column(String, nullable=True)
    image_url: str = Column(String, nullable=True)


class Review(Base):
    __tablename__ = 'review'
    anime_id: int = Column(Integer, ForeignKey("animes.anime_id", ondelete="CASCADE"), primary_key=True, nullable=False)
    anime = relationship("Anime")
    user_id: int = Column(Integer, ForeignKey("users.user_id", ondelete="CASCADE"), primary_key=True, nullable=False)
    user = relationship("User")
    rating: float = Column(Numeric, nullable=False)
    content: str = Column(String, nullable=False)
