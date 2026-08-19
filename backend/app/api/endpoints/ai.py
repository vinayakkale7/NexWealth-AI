import time
import logging
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.models.user import User
from app.auth.dependencies import get_current_user
from app.ai.advisor import AIAdvisor
from app.ai.schemas import (
    ChatRequest,
    ChatResponse,
    PortfolioHealthResponse,
    GoalAnalysisResponse,
    TaxInsightResponse,
    HealthCacheStatusResponse,
    AIStatusResponse
)
from app.ai import cache

router = APIRouter()
logger = logging.getLogger(__name__)

@router.get("/status", response_model=AIStatusResponse)
def get_ai_status(
    current_user: User = Depends(get_current_user)
):
    """
    Returns whether AI is available and whether cached analysis exists for the current user.
    """
    status_info = cache.get_ai_status(current_user.id)
    return AIStatusResponse(**status_info)

@router.post("/chat", response_model=ChatResponse)
def chat_with_ai(
    request: ChatRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    start_time = time.time()
    try:
        advisor = AIAdvisor(db, current_user)
        result = advisor.chat(request.message)
        
        execution_time = time.time() - start_time
        logger.info(f"AI Chat | User: {current_user.id} | Time: {execution_time:.2f}s")
        
        return ChatResponse(
            response=result["response"],
            reasoning=result.get("reasoning"),
            confidence=result.get("confidence", 92.0)
        )
    except Exception as e:
        logger.error(f"AI Chat Error | User: {current_user.id} | Error: {str(e)}", exc_info=True)
        return ChatResponse(
            response="I'm temporarily experiencing connectivity issues with the AI service. Please try your request again in a few seconds.",
            reasoning="Calculated status — AI connection temporarily unavailable.",
            confidence=50.0
        )

@router.post("/analyze", response_model=PortfolioHealthResponse)
def analyze_portfolio(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    start_time = time.time()
    try:
        advisor = AIAdvisor(db, current_user)
        analysis = advisor.analyze_portfolio(force_refresh=True)
        
        execution_time = time.time() - start_time
        logger.info(f"AI Analyze | User: {current_user.id} | Time: {execution_time:.2f}s")
        
        return PortfolioHealthResponse(**analysis)
    except Exception as e:
        logger.error(f"AI Analyze Error | User: {current_user.id} | Error: {str(e)}", exc_info=True)
        advisor = AIAdvisor(db, current_user)
        fallback = advisor._compute_deterministic_health(time.strftime("%d %b %Y, %I:%M %p"))
        return PortfolioHealthResponse(**fallback)

@router.get("/portfolio-health", response_model=HealthCacheStatusResponse)
@router.post("/portfolio-health", response_model=HealthCacheStatusResponse)
def get_portfolio_health(
    force: bool = Query(default=False),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Returns cached analysis for the current user if available.
    Does NOT call Gemini unless `force=true`.
    """
    if force:
        advisor = AIAdvisor(db, current_user)
        analysis = advisor.analyze_portfolio(force_refresh=True)
        return HealthCacheStatusResponse(
            status="success",
            cached=False,
            data=PortfolioHealthResponse(**analysis),
            message="Fresh analysis generated."
        )
        
    cached = cache.get_cached_portfolio_health(current_user.id)
    if cached:
        return HealthCacheStatusResponse(
            status="cached",
            cached=True,
            data=PortfolioHealthResponse(**cached),
            message="Cached analysis retrieved."
        )
        
    return HealthCacheStatusResponse(
        status="no_cache",
        cached=False,
        data=None,
        message="No recent analysis found for this user. Click Analyze to generate."
    )

@router.post("/goal-analysis", response_model=GoalAnalysisResponse)
def get_goal_analysis(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    start_time = time.time()
    try:
        advisor = AIAdvisor(db, current_user)
        analysis = advisor.analyze_goals()
        
        execution_time = time.time() - start_time
        logger.info(f"AI Goal Analysis | User: {current_user.id} | Time: {execution_time:.2f}s")
        
        return GoalAnalysisResponse(**analysis)
    except Exception as e:
        logger.error(f"AI Goal Analysis Error | User: {current_user.id} | Error: {str(e)}", exc_info=True)
        advisor = AIAdvisor(db, current_user)
        fallback = advisor._compute_deterministic_goals(time.strftime("%d %b %Y, %I:%M %p"))
        return GoalAnalysisResponse(**fallback)

@router.post("/tax-insights", response_model=TaxInsightResponse)
def get_tax_insights(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    start_time = time.time()
    try:
        advisor = AIAdvisor(db, current_user)
        analysis = advisor.get_tax_insights()
        
        execution_time = time.time() - start_time
        logger.info(f"AI Tax Insights | User: {current_user.id} | Time: {execution_time:.2f}s")
        
        return TaxInsightResponse(**analysis)
    except Exception as e:
        logger.error(f"AI Tax Insights Error | User: {current_user.id} | Error: {str(e)}", exc_info=True)
        advisor = AIAdvisor(db, current_user)
        fallback = advisor._compute_deterministic_taxes(time.strftime("%d %b %Y, %I:%M %p"))
        return TaxInsightResponse(**fallback)
