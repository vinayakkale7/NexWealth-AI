from pydantic import BaseModel
from typing import Optional

class GoalBase(BaseModel):
    title: str
    target: float
    current: float = 0.0
    deadline: str
    icon: str
    color: str

class GoalCreate(GoalBase):
    pass

class GoalUpdate(GoalBase):
    pass

class GoalResponse(GoalBase):
    id: str
    family_id: str

    class Config:
        from_attributes = True
