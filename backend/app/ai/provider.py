import os
import logging
from google import genai
from google.genai import types
from app.core.config import settings

logger = logging.getLogger(__name__)

def get_client() -> genai.Client:
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise ValueError("GEMINI_API_KEY environment variable is not set. Please add it to .env.")
    return genai.Client(api_key=api_key)

def generate_json(prompt: str, schema: dict = None) -> str:
    """
    Generate structured JSON response using Google Gen AI SDK.
    """
    client = get_client()
    model = settings.GEMINI_MODEL or "gemini-3.6-flash"
    
    config = types.GenerateContentConfig(
        response_mime_type="application/json",
        temperature=0.2,
    )
    
    logger.info(f"Calling Gemini API (model={model}) for JSON generation...")
    response = client.models.generate_content(
        model=model,
        contents=prompt,
        config=config,
    )
    return response.text

def generate_text(prompt: str) -> str:
    """
    Generate unstructured text (markdown) response.
    """
    client = get_client()
    model = settings.GEMINI_MODEL or "gemini-3.6-flash"
    
    config = types.GenerateContentConfig(
        temperature=0.7,
    )
    
    logger.info(f"Calling Gemini API (model={model}) for Text generation...")
    response = client.models.generate_content(
        model=model,
        contents=prompt,
        config=config,
    )
    return response.text
