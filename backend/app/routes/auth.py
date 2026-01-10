from fastapi import APIRouter, HTTPException, status, Depends, Body
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from app.models.user import UserCreate, UserLogin, UserResponse, UserInDB, UserProfile
from app.core.security import get_password_hash, verify_password, create_access_token, oauth2_scheme
from app.core.db import db
from datetime import timedelta
from bson import ObjectId

router = APIRouter()

@router.post("/register", response_model=dict)
def register(user: UserCreate):
    existing_user = db.users.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = get_password_hash(user.password)
    new_user = UserInDB(
        email=user.email,
        hashed_password=hashed_password,
        profile=UserProfile(), # Empty initially
        daily_usage=0
    )
    
    # Insert
    user_dict = new_user.dict()
    result = db.users.insert_one(user_dict)
    
    # Token
    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer", "user_id": str(result.inserted_id)}

@router.post("/login", response_model=dict)
def login_json(user_login: UserLogin):
    user = db.users.find_one({"email": user_login.email})
    if not user or not verify_password(user_login.password, user["hashed_password"]):
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    
    access_token = create_access_token(data={"sub": user["email"]})
    return {"access_token": access_token, "token_type": "bearer", "user": {"email": user["email"], "id": str(user["_id"])}}
