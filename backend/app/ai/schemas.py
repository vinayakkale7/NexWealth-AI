from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str
    reasoning: Optional[str] = None
    confidence: float = 90.0

class AnalyzeRequest(BaseModel):
    force_refresh: bool = False

class PortfolioHealthResponse(BaseModel):
    health_score: int = Field(..., ge=0, le=100, description="Overall health score between 0 and 100")
    risk_score: int = Field(..., ge=0, le=100, description="Portfolio risk score between 0 and 100")
    diversification_score: int = Field(..., ge=0, le=100, description="Asset diversification score between 0 and 100")
    risk_level: str = Field(..., description="Low, Moderate, High, or Aggressive")
    summary: str
    strengths: List[str] = []
    weaknesses: List[str] = []
    recommendations: List[str] = []
    confidence: float = Field(default=92.0, ge=0.0, le=100.0)
    timestamp: Optional[str] = None
    is_fallback: bool = False

class GoalItemAnalysis(BaseModel):
    goal_id: Optional[str] = None
    title: str
    target: float
    current: float
    progress_percentage: float
    status: str
    recommendation: Optional[str] = None

class GoalAnalysisResponse(BaseModel):
    goal_progress_score: int = Field(..., ge=0, le=100)
    overall_health: str = "On Track"
    summary: str
    goals_breakdown: List[GoalItemAnalysis] = []
    recommendations: List[str] = []
    required_additional_contribution: Optional[str] = None
    confidence: float = Field(default=90.0, ge=0.0, le=100.0)
    timestamp: Optional[str] = None
    is_fallback: bool = False

class TaxInsightResponse(BaseModel):
    tax_opportunity_score: int = Field(..., ge=0, le=100)
    summary: str
    capital_gains_observations: List[str] = []
    dividend_observations: List[str] = []
    interest_observations: List[str] = []
    tax_saving_opportunities: List[str] = []
    section_80c_observations: List[str] = []
    recommendations: List[str] = []
    confidence: float = Field(default=88.0, ge=0.0, le=100.0)
    disclaimer: str = "Informational estimate only. Not registered tax or financial advice. Complete historical transaction ledger is not modeled; consult a certified CA before executing tax decisions."
    timestamp: Optional[str] = None
    is_fallback: bool = False

class HealthCacheStatusResponse(BaseModel):
    status: str
    cached: bool
    data: Optional[PortfolioHealthResponse] = None
    message: Optional[str] = None

class AIStatusResponse(BaseModel):
    ai_available: bool
    model: str
    has_cached_analysis: bool
    last_analyzed: Optional[str] = None
    user_version: int = 1
