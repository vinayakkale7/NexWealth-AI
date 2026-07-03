from pydantic import BaseModel, EmailStr
from typing import Optional

class UserBase(BaseModel):
    email: EmailStr
    full_name: str
    role: str = "Owner"

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: str
    family_id: Optional[str] = None
    is_active: bool

    class Config:
        from_attributes = True
