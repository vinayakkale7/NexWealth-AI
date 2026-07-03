from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, Float, ForeignKey
from app.database.session import Base
from app.models.base import TimestampMixin
import uuid

def generate_uuid():
    return str(uuid.uuid4())

class Holding(Base, TimestampMixin):
    __tablename__ = "holdings"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=generate_uuid)
    name: Mapped[str] = mapped_column(String, nullable=False)
    symbol: Mapped[str] = mapped_column(String, nullable=False)
    category: Mapped[str] = mapped_column(String, nullable=False) # Equity, Mutual Funds, Gold, Bonds
    shares: Mapped[float] = mapped_column(Float, nullable=False)
    avg_price: Mapped[float] = mapped_column(Float, nullable=False)
    ltp: Mapped[float] = mapped_column(Float, nullable=False)
    change: Mapped[str] = mapped_column(String, nullable=False) # e.g. "+4.2%"
    
    family_id: Mapped[str] = mapped_column(ForeignKey("families.id"), nullable=False)
    family = relationship("Family", back_populates="holdings")
