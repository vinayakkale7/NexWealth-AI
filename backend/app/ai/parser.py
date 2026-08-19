import json
import re
import logging

logger = logging.getLogger(__name__)

def parse_json(text: str) -> dict:
    """
    Safely parses JSON from an LLM response string.
    Handles markdown code blocks, non-standard quotes, and trailing content.
    """
    if not text or not isinstance(text, str):
        return {}

    # Strip code block fences
    cleaned = re.sub(r'```(?:json)?', '', text).strip()
    
    # Locate first '{' and matching last '}'
    start = cleaned.find('{')
    end = cleaned.rfind('}')
    
    if start != -1 and end != -1 and end > start:
        candidate = cleaned[start:end+1]
    else:
        candidate = cleaned

    try:
        return json.loads(candidate)
    except json.JSONDecodeError:
        # Second attempt: remove trailing commas before closing braces/brackets
        fixed = re.sub(r',\s*([\]}])', r'\1', candidate)
        try:
            return json.loads(fixed)
        except Exception as e:
            logger.warning(f"Failed to parse JSON response from LLM: {e}. Raw: {text[:200]}")
            return {}
