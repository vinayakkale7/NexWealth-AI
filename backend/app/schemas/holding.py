from pydantic import BaseModel

class HoldingBase(BaseModel):
    name: str
    symbol: str
    category: str
    shares: float
    avg_price: float
    ltp: float
    change: str

class HoldingCreate(HoldingBase):
    pass

class HoldingUpdate(HoldingBase):
    pass

class HoldingResponse(HoldingBase):
    id: str
    family_id: str

    class Config:
        from_attributes = True
