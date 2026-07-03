from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, Float, ForeignKey
from app.database.session import Base
from app.models.base import TimestampMixin
import uuid

def generate_uuid():
    return str(uuid.uuid4())

class Goal(Base, TimestampMixin):
    __tablename__ = "goals"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=generate_uuid)
    title: Mapped[str] = mapped_column(String, nullable=False)
    target: Mapped[float] = mapped_column(Float, nullable=False)
    current: Mapped[float] = mapped_column(Float, default=0.0)
    deadline: Mapped[str] = mapped_column(String, nullable=False) # e.g. "2030"
    icon: Mapped[str] = mapped_column(String, nullable=False)
    color: Mapped[str] = mapped_column(String, nullable=False)
    
    family_id: Mapped[str] = mapped_column(ForeignKey("families.id"), nullable=False)
    family = relationship("Family", back_populates="goals")
