from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, Boolean, ForeignKey
from app.database.session import Base
from app.models.base import TimestampMixin
import uuid

def generate_uuid():
    return str(uuid.uuid4())

class User(Base, TimestampMixin):
    __tablename__ = "users"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=generate_uuid)
    email: Mapped[str] = mapped_column(String, unique=True, index=True, nullable=False)
    hashed_password: Mapped[str] = mapped_column(String, nullable=False)
    full_name: Mapped[str] = mapped_column(String, nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    role: Mapped[str] = mapped_column(String, default="Owner") # Owner, Co-Owner, Child
    
    family_id: Mapped[str | None] = mapped_column(ForeignKey("families.id"), nullable=True)
    family = relationship("Family", back_populates="members")
