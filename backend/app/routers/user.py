import sqlalchemy.exc
from fastapi import status, HTTPException, Depends, APIRouter, Response
from backend.app.database import get_db
from sqlalchemy.orm import Session
from backend.app.models import User
from backend.app.dtos import UserCreate, UserUpdate, UserResponse
from typing import List
import backend.app.utils as utils
from sys import stderr
import fastapi
from typing import Union
import backend.app.oauth2 as oauth2

router = APIRouter(
    prefix="/users",
    tags=['Users']
)


@router.get("/search", status_code=status.HTTP_200_OK, response_model=UserResponse)
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.user_id == user_id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"User with id: {user_id} does not exist")
    return user


@router.get("/", status_code=status.HTTP_200_OK, response_model=List[UserResponse])
def get_all_users(db: Session = Depends(get_db)):
    users = db.query(User).all()
    if not users:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"There are no users")
    return users


@router.post("/", status_code=status.HTTP_201_CREATED, response_model=Union[UserResponse, None])
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    try:
        hashed_password = utils.hash_bcrypt(user.password)
        user.password = hashed_password
        new_user: User = User(**user.dict())
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return new_user
    except sqlalchemy.exc.IntegrityError as e:
        stderr.write(f"\nIntegrity error {e}\n")
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=f"Integrity error {str(e.__dict__['orig'])}")
    except fastapi.exceptions.ResponseValidationError as e:
        stderr.write(f"\nviolated response model {e}\n")
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"violated response model")


@router.put("/", status_code=status.HTTP_201_CREATED, response_model=UserResponse)
def update_user(user_id: int, updated_user: UserUpdate, db: Session = Depends(get_db)):
    user_query = db.query(User).filter(User.user_id == user_id)
    user = user_query.first()

    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"user cant be found")
    hashed_password = utils.hash_bcrypt(updated_user.password)
    updated_user.password = hashed_password
    user_query.update(updated_user.dict(), synchronize_session=False)
    db.commit()
    return user_query.first()


@router.delete("/", status_code=status.HTTP_204_NO_CONTENT)
def delete_user(user_id: int, db: Session = Depends(get_db)):
    user_query = db.query(User).filter(User.user_id == user_id)
    user = user_query.first()

    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"user cant be found")

    user_query.delete(synchronize_session=False)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.get("/me", response_model=UserResponse)
def get_current_user(current_user: int = Depends(oauth2.get_current_user)):
    return current_user
