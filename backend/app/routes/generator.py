from fastapi import APIRouter, HTTPException, Depends, Body
from app.core.db import db
from app.routes.users import get_current_user
from app.core.llm import generate_proposal
from pydantic import BaseModel

router = APIRouter()

class GenerateRequest(BaseModel):
    job_description: str
    platform: str

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
    limit = 1 if plan == "free" else 10 # Example Pro limit
    
    if current_usage >= limit:
         raise HTTPException(status_code=403, detail=f"Daily limit of {limit} reached. Upgrade to Pro for more.")

    if not request.job_description:
        raise HTTPException(status_code=400, detail="Job description is required")
    
    profile = current_user.get("profile", {})
    
    proposal_text = generate_proposal(request.job_description, profile)
    
    # Increment usage
    db.users.update_one({"_id": current_user["_id"]}, {"$inc": {"daily_usage": 1}})
    
    # Save to history
    proposal_record = {
        "user_id": current_user["_id"],
        "job_description": request.job_description[:200] + "...", # Truncate for storage efficiency? Or store full?
        "full_job_description": request.job_description,
        "proposal_text": proposal_text,
        "platform": request.platform,
        "status": "sent", # Default to sent? Or "generated" then user marks sent? 
        # Spec says: "List of generated proposals... Each proposal can be marked as: Sent, Viewed, Replied"
        # So initial status is probably just "generated" or "draft". Spec says "Proposals Sent".
        # Let's say "generated".
        "status": "generated",
        "created_at": str(db.users.find_one({"_id": current_user["_id"]})), # Timestamp needed.
    }
    # Fix import for datetime
    from datetime import datetime
    proposal_record["created_at"] = datetime.utcnow()
    
    result = db.proposals.insert_one(proposal_record)
    
    return {
        "proposal_text": proposal_text, 
        "id": str(result.inserted_id),
        "remaining_credits": 100 # Placeholder
    }
