from fastapi import APIRouter, HTTPException, Depends
from app.core.db import db
from app.models.user import UserResponse, UserProfile
from app.core.security import oauth2_scheme
from jose import jwt, JWTError
from app.core.security import SECRET_KEY, ALGORITHM
from bson import ObjectId

router = APIRouter()

async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        # Debug: Print token (be careful in real prod, but fine for debugging)
        print(f"DEBUG: Verifying token: {token[:10]}...") 
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            print("DEBUG: No 'sub' in payload")
            raise credentials_exception
    except JWTError as e:
        print(f"DEBUG: JWT Error: {str(e)}")
        raise credentials_exception
    
    user = db.users.find_one({"email": email})
    if user is None:
        print(f"DEBUG: User not found for email: {email}")
        raise credentials_exception
    return user

@router.get("/me", response_model=UserResponse)
def read_users_me(current_user: dict = Depends(get_current_user)):
    current_user["id"] = str(current_user["_id"])
    return current_user

@router.put("/me/profile", response_model=UserResponse)
def update_profile(profile: UserProfile, current_user: dict = Depends(get_current_user)):
    db.users.update_one(
        {"_id": current_user["_id"]},
        {"$set": {"profile": profile.dict()}}
    )
    current_user["profile"] = profile.dict()
    current_user["id"] = str(current_user["_id"])
    return current_user
