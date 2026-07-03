from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database.session import get_db
from app.models.user import User
from app.models.family import Family
from app.schemas.user import UserResponse
from app.auth.dependencies import get_current_user

router = APIRouter()

@router.get("/", response_model=List[UserResponse])
def get_family_members(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    members = db.query(User).filter(User.family_id == current_user.family_id).all()
    return members
