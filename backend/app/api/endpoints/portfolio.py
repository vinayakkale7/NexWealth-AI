from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database.session import get_db
from app.models.holding import Holding
from app.schemas.holding import HoldingCreate, HoldingResponse, HoldingUpdate
from app.models.user import User
from app.auth.dependencies import get_current_user

router = APIRouter()

@router.get("/", response_model=List[HoldingResponse])
def get_portfolio(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    holdings = db.query(Holding).filter(Holding.family_id == current_user.family_id).all()
    return holdings

@router.post("/", response_model=HoldingResponse)
def create_holding(holding_in: HoldingCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    holding = Holding(**holding_in.model_dump(), family_id=current_user.family_id)
    db.add(holding)
    db.commit()
    db.refresh(holding)
    return holding

@router.put("/{holding_id}", response_model=HoldingResponse)
def update_holding(holding_id: str, holding_in: HoldingUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    holding = db.query(Holding).filter(Holding.id == holding_id, Holding.family_id == current_user.family_id).first()
    if not holding:
        raise HTTPException(status_code=404, detail="Holding not found")
    
    for key, value in holding_in.model_dump().items():
        setattr(holding, key, value)
    
    db.commit()
    db.refresh(holding)
    return holding

@router.delete("/{holding_id}")
def delete_holding(holding_id: str, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    holding = db.query(Holding).filter(Holding.id == holding_id, Holding.family_id == current_user.family_id).first()
    if not holding:
        raise HTTPException(status_code=404, detail="Holding not found")
    
    db.delete(holding)
    db.commit()
    return {"status": "deleted"}
