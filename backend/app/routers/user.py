from fastapi import status, HTTPException, Depends, APIRouter
from database import get_db
from sqlalchemy.orm import Session
from models import User

router = APIRouter(
    prefix="/users",
    tags=['Users']
)


# TO-DO: response model
@router.get("/{id}")
def get_user(ID: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.user_id == ID).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"User with id: {ID} does not exist")
    return user
