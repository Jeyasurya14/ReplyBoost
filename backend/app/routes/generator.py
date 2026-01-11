from fastapi import APIRouter, HTTPException, Depends, Body
from app.core.db import db
from app.routes.users import get_current_user
from app.core.llm import generate_proposal, analyze_job_signals, calculate_reply_strength, refine_proposal
from pydantic import BaseModel
from typing import Optional

router = APIRouter()

class GenerateRequest(BaseModel):
    job_description: str
    platform: str
    framework: Optional[str] = "Fast Hook"
    cta_style: Optional[str] = "Confident"
    tone_level: Optional[int] = 50

class RefineRequest(BaseModel):
    proposal_text: str
    instruction: str

@router.post("/generate")
def generate_reply(request: GenerateRequest, current_user: dict = Depends(get_current_user)):
    # Daily Limit Logic
    from datetime import datetime
    today_str = datetime.utcnow().strftime("%Y-%m-%d")
    
    last_date = current_user.get("last_usage_date")
    current_usage = current_user.get("daily_usage", 0)
    
    if last_date != today_str:
        # Reset for new day
        current_usage = 0
        db.users.update_one(
            {"_id": current_user["_id"]}, 
            {"$set": {"daily_usage": 0, "last_usage_date": today_str}}
        )
    
    plan = current_user.get("plan", "free")
    limit = 1 if plan == "free" else 100 # STRICT 1/day for free users as per Plan
    
    if current_usage >= limit:
         raise HTTPException(status_code=403, detail=f"Daily limit of {limit} reached. Upgrade to Pro for more.")

    if not request.job_description:
        raise HTTPException(status_code=400, detail="Job description is required")
    
    # 1. Analyze Signals
    signals = analyze_job_signals(request.job_description) # Logic from llm.py
    
    # 2. Generate Proposal
    profile = current_user.get("profile", {})
    # Handle the "frontend trick" where JD might contain instructions. Clean it if needed or just pass it.
    # The frontend currently appends [SYSTEM...] instructions to JD. 
    # With this new API, we should prefer the structured params if passed, but handle the legacy trick too.
    # For now, we pass request.job_description as is to generate_proposal which uses it in prompts.
    
    proposal_text = generate_proposal(
        job_description=request.job_description,
        user_profile=profile,
        framework=request.framework,
        cta_style=request.cta_style,
        tone_level=request.tone_level
    )
    
    # 3. Calculate Strength
    analysis = calculate_reply_strength(proposal_text, request.job_description)
    
    # Increment usage
    db.users.update_one({"_id": current_user["_id"]}, {"$inc": {"daily_usage": 1}})
    
    # Save to history
    proposal_record = {
        "user_id": current_user["_id"],
        "job_description": request.job_description[:200] + "...",
        "full_job_description": request.job_description,
        "proposal_text": proposal_text,
        "platform": request.platform,
        "framework": request.framework,
        "score": analysis["score"],
        "status": "generated",
        "created_at": datetime.utcnow()
    }
    
    result = db.proposals.insert_one(proposal_record)
    
    return {
        "proposal_text": proposal_text, 
        "id": str(result.inserted_id),
        "signals": signals,
        "analysis": analysis,
        "remaining_credits": limit - (current_usage + 1)
    }

@router.post("/refine")
def refine_reply(request: RefineRequest, current_user: dict = Depends(get_current_user)):
    # Gate Refinement for Pro Users
    plan = current_user.get("plan", "free")
    if plan == "free":
        raise HTTPException(status_code=403, detail="Refinement is a Pro feature. Upgrade to unlock.")
        
    refined_text = refine_proposal(request.proposal_text, request.instruction)
    return {"refined_text": refined_text}

@router.get("/usage/today")
def get_usage(current_user: dict = Depends(get_current_user)):
    from datetime import datetime
    today_str = datetime.utcnow().strftime("%Y-%m-%d")
    
    last_date = current_user.get("last_usage_date")
    current_usage = current_user.get("daily_usage", 0)
    
    if last_date != today_str:
        current_usage = 0
        
    plan = current_user.get("plan", "free")
    limit = 1 if plan == "free" else 100
    
    return {
        "usage": current_usage,
        "limit": limit,
        "remaining": max(0, limit - current_usage),
        "plan": plan
    }
