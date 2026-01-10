from fastapi import APIRouter, Depends, Body
from app.core.db import db
from app.routes.users import get_current_user
from bson import ObjectId
from pydantic import BaseModel
from datetime import datetime

router = APIRouter()

class IncomeCreate(BaseModel):
    amount: float
    client: str
    platform: str
    date: str # YYYY-MM-DD

@router.get("/income")
def get_income(current_user: dict = Depends(get_current_user)):
    cursor = db.income.find({"user_id": current_user["_id"]}).sort("date", -1)
    incomes = []
    for i in cursor:
        i["id"] = str(i["_id"])
        del i["_id"]
        if "user_id" in i: del i["user_id"]
        incomes.append(i)
    return incomes

@router.post("/income")
def add_income(income: IncomeCreate, current_user: dict = Depends(get_current_user)):
    record = income.dict()
    record["user_id"] = current_user["_id"]
    result = db.income.insert_one(record)
    return {"id": str(result.inserted_id), "status": "added"}

@router.get("/income/summary")
def get_income_summary(current_user: dict = Depends(get_current_user)):
    # Aggregation for chart
    pipeline = [
        {"$match": {"user_id": current_user["_id"]}},
        {
            "$group": {
                "_id": {"$substr": ["$date", 0, 7]}, # YYYY-MM
                "total": {"$sum": "$amount"}
            }
        },
        {"$sort": {"_id": 1}}
    ]
    summary = list(db.income.aggregate(pipeline))
    return summary
