import os
import json
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

# Use Groq or OpenAI. Default to checking GROQ_API_KEY first.
API_KEY = os.getenv("GROQ_API_KEY") or os.getenv("OPENAI_API_KEY")
BASE_URL = "https://api.groq.com/openai/v1" if os.getenv("GROQ_API_KEY") else None

client = OpenAI(api_key=API_KEY, base_url=BASE_URL) if API_KEY else None

FRAMEWORK_PROMPTS = {
    "Fast Hook": """
    STRATEGY: FAST HOOK
    - Goal: Grab attention in the first 3 seconds.
    - Structure:
      1. HOOK: One short, punchy sentence addressing their biggest pain point.
      2. SOLUTION: Briefly state you can fix it.
      3. CTA: Ask a simple "Yes/No" or "When" question.
    - Omit: Background, extensive portfolio, generic greetings.
    """,
    "Proof-Driven": """
    STRATEGY: PROOF-DRIVEN
    - Goal: Build trust immediately through past wins.
    - Structure:
      1. RELEVANCE: Mention a similar project you solved.
      2. OUTCOME: State the specific result (metrics if possible) of that past project.
      3. TIE-IN: Explain how this applies to *their* job.
      4. CTA: Ask to share that specific case study.
    """,
    "Problem-Solution": """
    STRATEGY: PROBLEM-SOLUTION
    - Goal: Show you understand the complexity.
    - Structure:
      1. DIAGNOSIS: Restate their problem in technical terms to show understanding.
      2. PLAN: Bullet points (max 3) of your technical approach.
      3. CTA: Ask a technical question about their stack/requirements.
    """,
    "Authority": """
    STRATEGY: AUTHORITY
    - Goal: Dominate the frame. You are the expert selection them.
    - Structure:
      1. ASSERTION: State clearly that you are the right fit.
      2. QUALIFICATION: Minimal brag (e.g. "I've done this for X years").
      3. NEXT STEP: Tell them to book a call if they are serious.
    """
}

def analyze_job_signals(job_description: str) -> list:
    """Detects key signals in the job description for UI badges."""
    signals = []
    text = job_description.lower()
    
    if any(w in text for w in ["urgent", "asap", "immediately", "deadline"]):
        signals.append({"label": "Urgent", "code": "urgent", "color": "red"})
    
    if any(w in text for w in ["budget", "price", "fixed", "rate", "$"]):
        signals.append({"label": "Budget Mentioned", "code": "budget", "color": "green"})
        
    if any(w in text for w in ["long term", "ongoing", "contract", "full time"]):
        signals.append({"label": "Long Term", "code": "long_term", "color": "blue"})
        
    if any(w in text for w in ["expert", "senior", "advanced", "experience"]):
        signals.append({"label": "High Intent", "code": "high_intent", "color": "purple"})
        
    return signals

def calculate_reply_strength(reply: str, job_description: str) -> dict:
    """
    Analyzes the reply against the job description to provide a strength score.
    Uses simple heuristics for speed and cost-efficiency (could be LLM-based in future).
    """
    score = 50 # Base score
    breakdown = []
    
    # 1. Length Check (Optimal: 50-150 words)
    word_count = len(reply.split())
    if 50 <= word_count <= 150:
        score += 10
        breakdown.append("Perfect Length")
    elif word_count < 50:
        breakdown.append("Too Short")
    else:
        score -= 5
        breakdown.append("Too Long")
        
    # 2. Key Terms (Relevance)
    job_words = set(job_description.lower().split())
    # Filter common stop words would be better, but simple check for now
    keywords = [w for w in job_words if len(w) > 5] 
    reply_lower = reply.lower()
    matches = sum(1 for w in keywords if w in reply_lower)
    
    if matches > 2:
        score += 15
        breakdown.append("Good Keyword Usage")
    elif matches > 0:
        score += 5
    else:
        breakdown.append("Missed Keywords")
        
    # 3. Question/CTA Check
    if "?" in reply:
        score += 15
        breakdown.append("Clear CTA")
    else:
        score -= 10
        breakdown.append("Missing Question")
        
    # 4. formatting
    if "\n" in reply: # Paragraphs used
        score += 10
        
    return {
        "score": min(100, max(0, score)),
        "breakdown": breakdown,
        "label": "Strong" if score > 80 else "Average" if score > 60 else "Weak"
    }

def generate_proposal(job_description: str, user_profile: dict, framework: str = "Fast Hook", cta_style: str = "Confident", tone_level: int = 50) -> str:
    if not client:
        return "Error: AI API Key not configured."
    
    # Determine Tone prompt
    tone_instruction = "Balanced professional tone."
    if tone_level < 30:
        tone_instruction = "Very friendly, warm, and enthusiastic tone."
    elif tone_level > 70:
        tone_instruction = "Very direct, concise, and no-nonsense tone."
        
    framework_instruction = FRAMEWORK_PROMPTS.get(framework, FRAMEWORK_PROMPTS["Fast Hook"])
    
    system_prompt = f"""
    You are an expert freelancer. Write a proposal based on the following framework.
    
    {framework_instruction}
    
    ADDITIONAL RULES:
    - Tone: {tone_instruction}
    - CTA Style: {cta_style} (e.g. Soft = "chat?", Confident = "ready?", Action = "see demo").
    - MAX 150 Words.
    - NO placeholders.
    """

    user_prompt = f"""
    MY PROFILE:
    Skill: {user_profile.get('skill', 'General')}
    Niche: {user_profile.get('niche', 'General')}
    Experience: {user_profile.get('experience', 'Mid')}
    
    JOB DESCRIPTION:
    {job_description}
    """

    try:
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile" if os.getenv("GROQ_API_KEY") else "gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            temperature=0.7,
            max_tokens=350
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        return f"Error: {str(e)}"

def refine_proposal(existing_proposal: str, instruction: str) -> str:
    if not client:
        return existing_proposal
        
    system_prompt = f"""
    You are an expert editor. Rewrite the following proposal based on the instruction.
    Keep the core message but change the style/length as requested.
    INSTRUCTION: {instruction}
    """
    
    try:
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile" if os.getenv("GROQ_API_KEY") else "gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": existing_proposal}
            ],
            temperature=0.7,
            max_tokens=350
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        return existing_proposal
