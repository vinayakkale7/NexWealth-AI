from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.models.holding import Holding
from app.models.user import User
from app.auth.dependencies import get_current_user

router = APIRouter()

@router.get("/summary")
def get_dashboard_summary(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    holdings = db.query(Holding).filter(Holding.family_id == current_user.family_id).all()
    
    total_value = sum(h.shares * h.ltp for h in holdings)
    
    # Mocking Monthly Growth and Today's Gain for now
    monthly_growth = 245000 if total_value > 0 else 0
    todays_gain = -12400 if total_value > 0 else 0
    
    allocation = {"Equity": 0, "Mutual Funds": 0, "Gold": 0, "Bonds": 0}
    for h in holdings:
        if h.category in allocation:
            allocation[h.category] += (h.shares * h.ltp)
            
    alloc_list = [
        {"name": k, "value": round((v / total_value * 100) if total_value > 0 else 0, 1)} 
        for k, v in allocation.items() if v > 0
    ]
    
    return {
        "total_net_worth": total_value,
        "monthly_growth": monthly_growth,
        "todays_gain": todays_gain,
        "allocation": alloc_list
    }
