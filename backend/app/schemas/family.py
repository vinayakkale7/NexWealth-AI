from pydantic import BaseModel
from typing import Optional

class FamilyBase(BaseModel):
    name: str

class FamilyCreate(FamilyBase):
    pass

class FamilyResponse(FamilyBase):
    id: str

    class Config:
        from_attributes = True
