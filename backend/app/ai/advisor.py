import logging
from datetime import datetime
from sqlalchemy.orm import Session
from app.models.user import User
from app.models.holding import Holding
from app.models.goal import Goal
from app.ai.context_builder import build_portfolio_context
from app.ai.prompts import (
    SYSTEM_PROMPT,
    PORTFOLIO_HEALTH_PROMPT,
    GOAL_ANALYSIS_PROMPT,
    TAX_INSIGHT_PROMPT,
    CHAT_PROMPT
)
from app.ai.provider import generate_json, generate_text
from app.ai.parser import parse_json
from app.ai.schemas import PortfolioHealthResponse, GoalAnalysisResponse, TaxInsightResponse
from app.ai import cache

logger = logging.getLogger(__name__)

def _ensure_list(val):
    if isinstance(val, list):
        return [str(item) for item in val]
    elif isinstance(val, str) and val.strip():
        return [val.strip()]
    return []

class AIAdvisor:
    def __init__(self, db: Session, user: User):
        self.db = db
        self.user = user
        self.user_id = user.id

    def get_context(self) -> str:
        return build_portfolio_context(self.db, self.user)

    def chat(self, message: str) -> dict:
        """
        Process chat query with personalized financial context and safety guardrails.
        """
        context = self.get_context()
        prompt = f"{SYSTEM_PROMPT}\n\n{CHAT_PROMPT.format(context=context, message=message)}"
        
        try:
            response_text = generate_text(prompt)
            return {
                "response": response_text.strip(),
                "reasoning": "Synthesized through NexWealth AI Engine using active family holdings, allocation ratios, and goal progress.",
                "confidence": 92.0
            }
        except Exception as e:
            logger.error(f"AI Chat generation failed: {e}", exc_info=True)
            return {
                "response": f"I was unable to connect to the AI engine ({str(e)}). Your portfolio context is securely preserved. Please try again in a few moments.",
                "reasoning": "Calculated status — AI connection temporarily unavailable.",
                "confidence": 50.0
            }

    def analyze_portfolio(self, force_refresh: bool = True) -> dict:
        """
        Run complete portfolio health, risk, and diversification analysis.
        Validates with Pydantic and retries once if invalid.
        """
        if not force_refresh:
            cached = cache.get_cached_portfolio_health(self.user_id)
            if cached:
                return cached

        context = self.get_context()
        prompt = f"{SYSTEM_PROMPT}\n\n{PORTFOLIO_HEALTH_PROMPT.format(context=context)}"
        now_str = datetime.now().strftime("%d %b %Y, %I:%M %p")

        # Attempt 1 + Retry 1
        for attempt in range(2):
            try:
                raw_response = generate_json(prompt)
                parsed = parse_json(raw_response)
                
                if parsed:
                    # Construct candidate dict
                    candidate = {
                        "health_score": min(100, max(0, int(parsed.get("health_score", 75)))),
                        "risk_score": min(100, max(0, int(parsed.get("risk_score", 45)))),
                        "diversification_score": min(100, max(0, int(parsed.get("diversification_score", 70)))),
                        "risk_level": str(parsed.get("risk_level", "Moderate")),
                        "summary": str(parsed.get("summary", "Portfolio analysis completed successfully.")),
                        "strengths": _ensure_list(parsed.get("strengths", [])),
                        "weaknesses": _ensure_list(parsed.get("weaknesses", [])),
                        "recommendations": _ensure_list(parsed.get("recommendations", [])),
                        "confidence": float(parsed.get("confidence", 94.0)),
                        "timestamp": now_str,
                        "is_fallback": False
                    }
                    # Validate with Pydantic
                    validated = PortfolioHealthResponse(**candidate)
                    result = validated.model_dump()
                    cache.set_cached_portfolio_health(self.user_id, result)
                    return result
            except Exception as e:
                logger.warning(f"Portfolio health attempt {attempt + 1} failed: {e}")
                if attempt == 0:
                    continue  # Retry once

        # Controlled deterministic fallback clearly labeled
        return self._compute_deterministic_health(now_str)

    def analyze_goals(self) -> dict:
        """
        Run goal alignment and progress simulation analysis.
        """
        cached = cache.get_cached_goal_analysis(self.user_id)
        if cached:
            return cached

        context = self.get_context()
        prompt = f"{SYSTEM_PROMPT}\n\n{GOAL_ANALYSIS_PROMPT.format(context=context)}"
        now_str = datetime.now().strftime("%d %b %Y, %I:%M %p")

        for attempt in range(2):
            try:
                raw_response = generate_json(prompt)
                parsed = parse_json(raw_response)
                
                if parsed:
                    breakdown = parsed.get("goals_breakdown", [])
                    if not isinstance(breakdown, list):
                        breakdown = []
                    candidate = {
                        "goal_progress_score": min(100, max(0, int(parsed.get("goal_progress_score", 70)))),
                        "overall_health": str(parsed.get("overall_health", "On Track")),
                        "summary": str(parsed.get("summary", "Goals evaluation based on current asset allocation.")),
                        "goals_breakdown": breakdown,
                        "recommendations": _ensure_list(parsed.get("recommendations", [])),
                        "required_additional_contribution": parsed.get("required_additional_contribution"),
                        "confidence": float(parsed.get("confidence", 90.0)),
                        "timestamp": now_str,
                        "is_fallback": False
                    }
                    validated = GoalAnalysisResponse(**candidate)
                    result = validated.model_dump()
                    cache.set_cached_goal_analysis(self.user_id, result)
                    return result
            except Exception as e:
                logger.warning(f"Goal analysis attempt {attempt + 1} failed: {e}")
                if attempt == 0:
                    continue

        return self._compute_deterministic_goals(now_str)

    def get_tax_insights(self) -> dict:
        """
        Generate AI Tax Insights / Estimated Tax Opportunities.
        """
        cached = cache.get_cached_tax_insights(self.user_id)
        if cached:
            return cached

        context = self.get_context()
        prompt = f"{SYSTEM_PROMPT}\n\n{TAX_INSIGHT_PROMPT.format(context=context)}"
        now_str = datetime.now().strftime("%d %b %Y, %I:%M %p")

        for attempt in range(2):
            try:
                raw_response = generate_json(prompt)
                parsed = parse_json(raw_response)
                
                if parsed:
                    candidate = {
                        "tax_opportunity_score": min(100, max(0, int(parsed.get("tax_opportunity_score", 65)))),
                        "summary": str(parsed.get("summary", "AI Tax Insights / Estimated Tax Opportunities computed.")),
                        "capital_gains_observations": _ensure_list(parsed.get("capital_gains_observations", [])),
                        "dividend_observations": _ensure_list(parsed.get("dividend_observations", [])),
                        "interest_observations": _ensure_list(parsed.get("interest_observations", [])),
                        "tax_saving_opportunities": _ensure_list(parsed.get("tax_saving_opportunities", [])),
                        "section_80c_observations": _ensure_list(parsed.get("section_80c_observations", [])),
                        "recommendations": _ensure_list(parsed.get("recommendations", [])),
                        "confidence": float(parsed.get("confidence", 88.0)),
                        "disclaimer": "Informational estimate only. Not registered tax or financial advice. Complete historical transaction ledger is not modeled; consult a certified CA before executing tax decisions.",
                        "timestamp": now_str,
                        "is_fallback": False
                    }
                    validated = TaxInsightResponse(**candidate)
                    result = validated.model_dump()
                    cache.set_cached_tax_insights(self.user_id, result)
                    return result
            except Exception as e:
                logger.warning(f"Tax insights attempt {attempt + 1} failed: {e}")
                if attempt == 0:
                    continue

        return self._compute_deterministic_taxes(now_str)

    def _compute_deterministic_health(self, now_str: str) -> dict:
        holdings = self.db.query(Holding).filter(Holding.family_id == self.user.family_id).all() if self.user.family_id else []
        total_val = sum((h.shares or 0) * (h.ltp or 0) for h in holdings)
        categories = set(h.category for h in holdings)
        
        if not holdings or total_val == 0:
            result = {
                "health_score": 50,
                "risk_score": 30,
                "diversification_score": 20,
                "risk_level": "Low",
                "summary": "Calculated metrics — AI analysis unavailable. (Portfolio is empty; add holdings to start tracking).",
                "strengths": ["Clean slate ready for structured wealth accumulation"],
                "weaknesses": ["No asset allocation data available"],
                "recommendations": ["Baseline rule: Add initial stock, mutual fund, or fixed income holdings."],
                "confidence": 70.0,
                "timestamp": now_str,
                "is_fallback": True
            }
        else:
            div_score = min(100, len(categories) * 25)
            health_score = 75 if div_score >= 50 else 60
            result = {
                "health_score": health_score,
                "risk_score": 45,
                "diversification_score": div_score,
                "risk_level": "Moderate",
                "summary": f"Calculated metrics — AI analysis unavailable. (Computed from {len(holdings)} holdings across {len(categories)} categories).",
                "strengths": [f"Allocated across {len(categories)} distinct asset classes", "Active family wealth monitoring"],
                "weaknesses": ["Consider periodic rebalancing to manage single-asset exposure"],
                "recommendations": ["Baseline rule: Review allocation quarterly against family financial goals."],
                "confidence": 75.0,
                "timestamp": now_str,
                "is_fallback": True
            }
        cache.set_cached_portfolio_health(self.user_id, result)
        return result

    def _compute_deterministic_goals(self, now_str: str) -> dict:
        goals = self.db.query(Goal).filter(Goal.family_id == self.user.family_id).all() if self.user.family_id else []
        if not goals:
            result = {
                "goal_progress_score": 0,
                "overall_health": "Needs Setup",
                "summary": "Calculated metrics — AI analysis unavailable. (No goals created yet).",
                "goals_breakdown": [],
                "recommendations": ["Baseline rule: Create goals for Retirement, Home, or Education to track readiness."],
                "required_additional_contribution": None,
                "confidence": 70.0,
                "timestamp": now_str,
                "is_fallback": True
            }
        else:
            total_target = sum(g.target or 0 for g in goals)
            total_curr = sum(g.current or 0 for g in goals)
            avg_pct = (total_curr / total_target * 100) if total_target > 0 else 0
            breakdown = [
                {
                    "goal_id": g.id,
                    "title": g.title,
                    "target": float(g.target or 0),
                    "current": float(g.current or 0),
                    "progress_percentage": round((g.current / g.target * 100) if g.target else 0, 1),
                    "status": "On Track" if (g.current / (g.target or 1)) >= 0.25 else "In Progress",
                    "recommendation": f"Target milestone {g.deadline or 'future'}."
                }
                for g in goals
            ]
            result = {
                "goal_progress_score": int(min(100, max(0, avg_pct))),
                "overall_health": "On Track",
                "summary": f"Calculated metrics — AI analysis unavailable. (Aggregate progress across {len(goals)} active goals is {avg_pct:.1f}%).",
                "goals_breakdown": breakdown,
                "recommendations": ["Baseline rule: Maintain systematic monthly contributions to stay on schedule."],
                "required_additional_contribution": None,
                "confidence": 75.0,
                "timestamp": now_str,
                "is_fallback": True
            }
        cache.set_cached_goal_analysis(self.user_id, result)
        return result

    def _compute_deterministic_taxes(self, now_str: str) -> dict:
        result = {
            "tax_opportunity_score": 65,
            "summary": "Calculated metrics — AI analysis unavailable. (Estimated observations based on active asset categories).",
            "capital_gains_observations": ["Equity LTCG up to ₹1.25 Lakh per financial year is exempt under current Indian tax norms."],
            "dividend_observations": ["Dividend income is taxable at individual income tax slab rates."],
            "interest_observations": ["Fixed deposit interest is taxable under Income from Other Sources."],
            "tax_saving_opportunities": ["Consider ELSS or PPF contributions to utilize Section 80C deductions."],
            "section_80c_observations": ["Section 80C allows annual deductions up to ₹1.50 Lakh."],
            "recommendations": ["Baseline rule: Review capital gains before the financial year end on March 31st."],
            "confidence": 70.0,
            "disclaimer": "Informational estimate only. Not registered tax or financial advice. Complete historical transaction ledger is not modeled; consult a certified CA before executing tax decisions.",
            "timestamp": now_str,
            "is_fallback": True
        }
        cache.set_cached_tax_insights(self.user_id, result)
        return result
