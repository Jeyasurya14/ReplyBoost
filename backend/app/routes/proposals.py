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
