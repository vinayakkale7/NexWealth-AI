from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String
from app.database.session import Base
from app.models.base import TimestampMixin
import uuid

def generate_uuid():
    return str(uuid.uuid4())

class Family(Base, TimestampMixin):
    __tablename__ = "families"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=generate_uuid)
    name: Mapped[str] = mapped_column(String, nullable=False)
    
    members = relationship("User", back_populates="family")
    holdings = relationship("Holding", back_populates="family", cascade="all, delete-orphan")
    goals = relationship("Goal", back_populates="family", cascade="all, delete-orphan")
