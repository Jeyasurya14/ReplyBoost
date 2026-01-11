from fastapi import APIRouter, Depends
from app.core.db import db
from app.routes.users import get_current_user
from bson import ObjectId
from typing import List

router = APIRouter()

@router.get("/proposals")
def get_proposals(current_user: dict = Depends(get_current_user)):
    cursor = db.proposals.find({"user_id": current_user["_id"]}).sort("created_at", -1)
    proposals = []
    for p in cursor:
        p["id"] = str(p["_id"])
        if "user_id" in p: del p["user_id"]
        del p["_id"]
        proposals.append(p)
    return proposals

from pydantic import BaseModel
class StatusUpdate(BaseModel):
    status: str

@router.put("/proposals/{proposal_id}/status")
def update_proposal_status(proposal_id: str, update: StatusUpdate, current_user: dict = Depends(get_current_user)):
    result = db.proposals.update_one(
        {"_id": ObjectId(proposal_id), "user_id": current_user["_id"]},
        {"$set": {"status": update.status}}
    )
    if result.modified_count == 0:
         return {"message": "No change or not found"}
    return {"status": "updated"}

@router.get("/proposals/analytics")
def get_analytics(current_user: dict = Depends(get_current_user)):
    user_id = current_user["_id"]
    
    # 1. Total Proposals
    total_proposals = db.proposals.count_documents({"user_id": user_id})
    
    # 2. Response Rate
    replied_count = db.proposals.count_documents({"user_id": user_id, "status": "replied"})
    response_rate = (replied_count / total_proposals * 100) if total_proposals > 0 else 0
    
    # 3. Profile Views (this is per proposal status='viewed'?)
    # Let's assume 'viewed' status means profile view or proposal view.
    viewed_count = db.proposals.count_documents({"user_id": user_id, "status": "viewed"})
    
    # 4. Chart Data (Last 7 Days)
    from datetime import datetime, timedelta
    seven_days_ago = datetime.utcnow() - timedelta(days=7)
    
    pipeline = [
        {
            "$match": {
                "user_id": user_id,
                "created_at": {"$gte": seven_days_ago}
            }
        },
        {
            "$group": {
                "_id": {"$dateToString": {"format": "%Y-%m-%d", "date": "$created_at"}},
                "count": {"$sum": 1}
            }
        },
        {"$sort": {"_id": 1}}
    ]
    
    daily_counts = list(db.proposals.aggregate(pipeline))
    # Fill in missing days? For simplicity, frontend can handle or we just send what we have.
    # Let's map it to a simple list.
    chart_data = [{"name": d["_id"], "sent": d["count"]} for d in daily_counts]
    
    # 5. Funnel Data
    # Sent (All) -> Viewed -> Replied
    funnel_data = [
        {"name": "Sent", "value": total_proposals},
        {"name": "Viewed", "value": viewed_count},
        {"name": "Replied", "value": replied_count}
    ]
    
    return {
        "total_proposals": total_proposals,
        "response_rate": round(response_rate, 1),
        "profile_views": viewed_count,
        "chart_data": chart_data,
        "funnel_data": funnel_data
    }
