import os
from typing import Dict, Any, Optional
from datetime import datetime
from app.core.config import settings

# User-scoped Cache and Version Store for NexWealth AI
# Version store maps user_id -> integer version (incremented whenever user's holdings/goals mutate)
_user_versions: Dict[str, int] = {}

# Cache storage format:
# {
#   f"{user_id}:{version}": {
#       "portfolio_health": { "data": dict, "timestamp": str },
#       "goal_analysis": { "data": dict, "timestamp": str },
#       "tax_insights": { "data": dict, "timestamp": str }
#   }
# }
_cache: Dict[str, Dict[str, Any]] = {}

def get_user_version(user_id: str) -> int:
    if not user_id:
        return 1
    if user_id not in _user_versions:
        _user_versions[user_id] = 1
    return _user_versions[user_id]

def bump_user_version(user_id: str) -> int:
    """
    Increments the version counter for a user when their portfolio or goals mutate.
    This safely invalidates previous cache entries for that user without risk of cross-user leakage.
    """
    if not user_id:
        return 1
    curr = _user_versions.get(user_id, 1)
    _user_versions[user_id] = curr + 1
    return _user_versions[user_id]

def _get_cache_key(user_id: str) -> str:
    version = get_user_version(user_id)
    return f"{user_id}:{version}"

def _get_user_store(user_id: str) -> Dict[str, Any]:
    key = _get_cache_key(user_id)
    if key not in _cache:
        _cache[key] = {}
    return _cache[key]

def get_cached_portfolio_health(user_id: str) -> Optional[Dict[str, Any]]:
    if not user_id:
        return None
    store = _get_user_store(user_id)
    entry = store.get("portfolio_health")
    if entry:
        return entry.get("data")
    return None

def set_cached_portfolio_health(user_id: str, analysis: dict):
    if not user_id or not analysis:
        return
    now_str = datetime.now().strftime("%d %b %Y, %I:%M %p")
    if "timestamp" not in analysis or not analysis["timestamp"]:
        analysis["timestamp"] = now_str
    store = _get_user_store(user_id)
    store["portfolio_health"] = {
        "data": analysis,
        "timestamp": now_str
    }

def get_cached_goal_analysis(user_id: str) -> Optional[Dict[str, Any]]:
    if not user_id:
        return None
    store = _get_user_store(user_id)
    entry = store.get("goal_analysis")
    if entry:
        return entry.get("data")
    return None

def set_cached_goal_analysis(user_id: str, analysis: dict):
    if not user_id or not analysis:
        return
    now_str = datetime.now().strftime("%d %b %Y, %I:%M %p")
    if "timestamp" not in analysis or not analysis["timestamp"]:
        analysis["timestamp"] = now_str
    store = _get_user_store(user_id)
    store["goal_analysis"] = {
        "data": analysis,
        "timestamp": now_str
    }

def get_cached_tax_insights(user_id: str) -> Optional[Dict[str, Any]]:
    if not user_id:
        return None
    store = _get_user_store(user_id)
    entry = store.get("tax_insights")
    if entry:
        return entry.get("data")
    return None

def set_cached_tax_insights(user_id: str, analysis: dict):
    if not user_id or not analysis:
        return
    now_str = datetime.now().strftime("%d %b %Y, %I:%M %p")
    if "timestamp" not in analysis or not analysis["timestamp"]:
        analysis["timestamp"] = now_str
    store = _get_user_store(user_id)
    store["tax_insights"] = {
        "data": analysis,
        "timestamp": now_str
    }

def get_ai_status(user_id: str) -> Dict[str, Any]:
    """
    Returns AI service availability and whether cached analysis exists for this user.
    """
    api_key_present = bool(os.getenv("GEMINI_API_KEY"))
    store = _get_user_store(user_id)
    cached_health = store.get("portfolio_health")
    
    return {
        "ai_available": api_key_present,
        "model": settings.GEMINI_MODEL,
        "has_cached_analysis": bool(cached_health),
        "last_analyzed": cached_health.get("timestamp") if cached_health else None,
        "user_version": get_user_version(user_id)
    }

def clear_cache(user_id: Optional[str] = None):
    if user_id:
        key = _get_cache_key(user_id)
        _cache.pop(key, None)
    else:
        _cache.clear()
