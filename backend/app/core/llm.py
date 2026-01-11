import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

# Use Groq or OpenAI. Default to checking GROQ_API_KEY first.
API_KEY = os.getenv("GROQ_API_KEY") or os.getenv("OPENAI_API_KEY")
BASE_URL = "https://api.groq.com/openai/v1" if os.getenv("GROQ_API_KEY") else None

client = OpenAI(api_key=API_KEY, base_url=BASE_URL) if API_KEY else None

def generate_proposal(job_description: str, user_profile: dict):
    if not client:
        return "Error: AI API Key not configured. Please set GROQ_API_KEY or OPENAI_API_KEY."
    
    profile_text = f"""
    My Skill: {user_profile.get('skill', 'General Freelancer')}
    My Niche: {user_profile.get('niche', 'General')}
    Experience: {user_profile.get('experience', 'Mid-Level')}
    """

    system_prompt = """
    You are an expert freelancer top-rated on Upwork. 
    Your goal is to write a high-converting proposal reply.
    
    RULES:
    - Length: 120-180 words maximum.
    - Structure:
      1. HOOK: Address the client's core pain point immediately. No "Hi", no fluff.
      2. RELEVANCE: Briefly mention why you fit (based on provided profile).
      3. SOLUTION: Specific approach to their problem.
      4. CTA: Clear, low-friction question to start a chat.
    - Tone: Professional, confident, direct.
    - NO placeholders like [Insert Name]. content must be ready to send.
    """

    user_prompt = f"""
    CONTEXT (My Profile):
    {profile_text}

    JOB DESCRIPTION:
    {job_description}

    Write the proposal.
    """

    try:
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile" if os.getenv("GROQ_API_KEY") else "gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            temperature=0.7,
            max_tokens=300
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        return f"Error generating proposal: {str(e)}"
