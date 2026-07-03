from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database.session import get_db
from app.models.goal import Goal
from app.schemas.goal import GoalCreate, GoalResponse, GoalUpdate
from app.models.user import User
from app.auth.dependencies import get_current_user

router = APIRouter()

@router.get("/", response_model=List[GoalResponse])
def get_goals(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    goals = db.query(Goal).filter(Goal.family_id == current_user.family_id).all()
    return goals

@router.post("/", response_model=GoalResponse)
def create_goal(goal_in: GoalCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    goal = Goal(**goal_in.model_dump(), family_id=current_user.family_id)
    db.add(goal)
    db.commit()
    db.refresh(goal)
    return goal

@router.put("/{goal_id}", response_model=GoalResponse)
def update_goal(goal_id: str, goal_in: GoalUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    goal = db.query(Goal).filter(Goal.id == goal_id, Goal.family_id == current_user.family_id).first()
    if not goal:
        raise HTTPException(status_code=404, detail="Goal not found")
    
    for key, value in goal_in.model_dump().items():
        setattr(goal, key, value)
    
    db.commit()
    db.refresh(goal)
    return goal

@router.delete("/{goal_id}")
def delete_goal(goal_id: str, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    goal = db.query(Goal).filter(Goal.id == goal_id, Goal.family_id == current_user.family_id).first()
    if not goal:
        raise HTTPException(status_code=404, detail="Goal not found")
    
    db.delete(goal)
    db.commit()
    return {"status": "deleted"}
