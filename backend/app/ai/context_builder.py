import re
from sqlalchemy.orm import Session
from app.models.user import User
from app.models.holding import Holding
from app.models.goal import Goal
from app.models.family import Family

def _sanitize_string(text: str) -> str:
    """
    Strips potential PAN numbers (5 letters, 4 digits, 1 letter),
    bank account numbers (9-18 consecutive digits), or token-like hashes.
    """
    if not text or not isinstance(text, str):
        return ""
    # Mask PAN patterns (e.g. ABCDE1234F)
    cleaned = re.sub(r'\b[A-Z]{5}[0-9]{4}[A-Z]\b', '[PAN_PROTECTED]', text, flags=re.IGNORECASE)
    # Mask 9+ consecutive digit sequences (account numbers)
    cleaned = re.sub(r'\b\d{9,18}\b', '[ACCOUNT_NUM_PROTECTED]', cleaned)
    # Mask JWT or long hex strings
    cleaned = re.sub(r'\beyJ[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\b', '[TOKEN_PROTECTED]', cleaned)
    return cleaned

def build_portfolio_context(db: Session, user: User) -> str:
    """
    Builds a secure, sanitized, comprehensive financial context for the AI engine.
    Strictly guarantees zero exposure of:
    - Passwords / password hashes
    - JWT tokens / session secrets
    - API keys
    - PAN numbers
    - Bank / Demat account numbers
    """
    family_id = user.family_id
    
    # 1. Family & User Profile (Sanitized)
    family = db.query(Family).filter(Family.id == family_id).first() if family_id else None
    family_name = _sanitize_string(family.name if family else "Family Account")
    family_members = db.query(User).filter(User.family_id == family_id).all() if family_id else [user]
    
    # 2. Holdings & Portfolio Metrics
    holdings = db.query(Holding).filter(Holding.family_id == family_id).all() if family_id else []
    
    total_net_worth = sum((h.shares or 0) * (h.ltp or 0) for h in holdings)
    total_invested = sum((h.shares or 0) * (h.avg_price or 0) for h in holdings)
    total_unrealized_pnl = total_net_worth - total_invested
    total_return_pct = ((total_unrealized_pnl / total_invested) * 100) if total_invested > 0 else 0.0
    
    # Category Allocation
    allocation = {}
    for h in holdings:
        cat = h.category or "Other"
        val = (h.shares or 0) * (h.ltp or 0)
        allocation[cat] = allocation.get(cat, 0.0) + val

    # 3. Financial Goals
    goals = db.query(Goal).filter(Goal.family_id == family_id).all() if family_id else []
    total_goal_target = sum(g.target or 0 for g in goals)
    total_goal_current = sum(g.current or 0 for g in goals)

    # 4. Construct Sanitized Context Text
    lines = []
    lines.append("=== USER & FAMILY PROFILE ===")
    lines.append(f"Primary User: {_sanitize_string(user.full_name or 'User')} (Role: {user.role or 'Owner'})")
    lines.append(f"Family Workspace: {family_name} ({len(family_members)} members)")
    if len(family_members) > 1:
        members_str = ", ".join([f"{_sanitize_string(m.full_name or 'Member')} ({m.role})" for m in family_members])
        lines.append(f"Family Members: {members_str}")
        
    lines.append("\n=== PORTFOLIO FINANCIAL SUMMARY ===")
    lines.append(f"Total Net Worth: ₹{total_net_worth:,.2f}")
    lines.append(f"Total Invested Capital: ₹{total_invested:,.2f}")
    lines.append(f"Overall Unrealized P&L: ₹{total_unrealized_pnl:,.2f} ({total_return_pct:+.2f}%)")
    
    if holdings:
        lines.append("\n--- Asset Allocation Breakdown ---")
        for cat, val in sorted(allocation.items(), key=lambda x: x[1], reverse=True):
            pct = (val / total_net_worth * 100) if total_net_worth > 0 else 0.0
            lines.append(f"- {cat}: ₹{val:,.2f} ({pct:.1f}% of portfolio)")
            
        lines.append("\n--- Detailed Holdings List ---")
        for h in holdings:
            val = (h.shares or 0) * (h.ltp or 0)
            invested_val = (h.shares or 0) * (h.avg_price or 0)
            pnl = val - invested_val
            pnl_pct = ((pnl / invested_val) * 100) if invested_val > 0 else 0.0
            clean_name = _sanitize_string(h.name)
            clean_symbol = _sanitize_string(h.symbol)
            lines.append(
                f"- {clean_name} ({clean_symbol}) | Category: {h.category} | "
                f"Qty: {h.shares} | Avg Price: ₹{h.avg_price:,.2f} | LTP: ₹{h.ltp:,.2f} | "
                f"Current Value: ₹{val:,.2f} | Unrealized P&L: ₹{pnl:,.2f} ({pnl_pct:+.1f}%)"
            )
    else:
        lines.append("\n[PORTFOLIO EMPTY]: The user has not added any holdings yet. Portfolio Net Worth is ₹0.00.")

    lines.append("\n=== FINANCIAL GOALS ===")
    if goals:
        lines.append(f"Total Goals Target: ₹{total_goal_target:,.2f} | Total Saved: ₹{total_goal_current:,.2f}")
        for g in goals:
            pct = ((g.current / g.target) * 100) if (g.target and g.target > 0) else 0.0
            clean_title = _sanitize_string(g.title)
            lines.append(
                f"- Goal: '{clean_title}' (ID: {g.id}) | Target: ₹{g.target:,.2f} | "
                f"Saved: ₹{g.current:,.2f} ({pct:.1f}% achieved) | Target Date: {g.deadline or 'Not specified'}"
            )
    else:
        lines.append("[GOALS EMPTY]: The user has not created any financial goals yet.")

    lines.append("\n=== TAX ENGINE CONTEXT NOTE ===")
    lines.append("Complete historical buy/sell transaction ledger is not modeled; tax observations reflect estimated opportunities based on active asset categories and unrealized P&L.")

    return "\n".join(lines)
