import sys
from app.database.session import SessionLocal
from app.models.user import User
from app.models.family import Family
from app.core.security import get_password_hash

def create_user():
    db = SessionLocal()
    email = "testuser@nexwealth.com"
    password = "Password123"
    
    user = db.query(User).filter(User.email == email).first()
    if not user:
        family = Family(name="Test Family")
        db.add(family)
        db.commit()
        db.refresh(family)
        
        user = User(
            email=email,
            hashed_password=get_password_hash(password),
            full_name="Test User",
            role="owner",
            family_id=family.id
        )
        db.add(user)
        db.commit()
        db.refresh(user)
        print("User created successfully!")
    else:
        print("User already exists, adding dummy data...")

    # Add dummy data
    from app.models.holding import Holding
    from app.models.goal import Goal
    
    # clear old data
    db.query(Holding).filter(Holding.family_id == user.family_id).delete()
    db.query(Goal).filter(Goal.family_id == user.family_id).delete()
    
    holdings = [
        Holding(name="Reliance Industries", symbol="RELIANCE", category="Stocks", shares=150, avg_price=2500, ltp=2950.5, change="+450.5", family_id=user.family_id),
        Holding(name="TCS", symbol="TCS", category="Stocks", shares=80, avg_price=3100, ltp=3900.2, change="+800.2", family_id=user.family_id),
        Holding(name="Parag Parikh Flexi Cap", symbol="PPFAS", category="Mutual Funds", shares=1200, avg_price=45.2, ltp=68.4, change="+23.2", family_id=user.family_id),
        Holding(name="Digital Gold", symbol="GOLD", category="Gold", shares=50, avg_price=6000, ltp=7200, change="+1200", family_id=user.family_id)
    ]
    db.add_all(holdings)
    
    goals = [
        Goal(title="Retirement Fund", target=50000000, current=1580000, deadline="2045", icon="target", color="blue", family_id=user.family_id),
        Goal(title="Dream House", target=25000000, current=3500000, deadline="2030", icon="home", color="emerald", family_id=user.family_id)
    ]
    db.add_all(goals)
    
    db.commit()
    print("Dummy data added successfully!")

if __name__ == "__main__":
    create_user()
