from fastapi import APIRouter, HTTPException, status, Depends, Body, Request
from fastapi.responses import RedirectResponse
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from app.models.user import UserCreate, UserLogin, UserResponse, UserInDB, UserProfile
from app.core.security import get_password_hash, verify_password, create_access_token, oauth2_scheme
from app.core.db import db
from app.core.oauth import oauth
from datetime import timedelta
from bson import ObjectId
import os

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

# OAuth Routes
@router.get("/login/{provider}")
async def login_oauth(provider: str, request: Request):
    request_oauth = oauth.create_client(provider)
    if not request_oauth:
        raise HTTPException(status_code=404, detail="Provider not found")
    
    redirect_uri = os.getenv("BACKEND_URL", "http://localhost:8000") + f"/api/auth/callback/{provider}"
    return await request_oauth.authorize_redirect(request, redirect_uri)

@router.get("/callback/{provider}")
async def auth_callback(provider: str, request: Request):
    request_oauth = oauth.create_client(provider)
    if not request_oauth:
        raise HTTPException(status_code=404, detail="Provider not found")
    
    try:
        # Get token
        token = await request_oauth.authorize_access_token(request)
        user_info = await request_oauth.parse_id_token(request, token) if provider == 'google' else await request_oauth.userinfo(token=token)
        
        # GitHub user_info structure is different
        email = user_info.get('email')
        
        # Fallback for GitHub if email is private
        if provider == 'github' and not email:
            # We might need to make another request to 'https://api.github.com/user/emails'
            # For now, let's try to get it from the token response or profile
            # This is a simplification; production GitHub auth often needs a separate call for emails
            pass 

        if not email:
             raise HTTPException(status_code=400, detail="Could not retrieve email from provider")

        # Check existing user
        user = db.users.find_one({"email": email})
        if not user:
            # Create new user
            new_user = UserInDB(
                email=email,
                hashed_password="", # No password for OAuth users
                profile=UserProfile(),
                daily_usage=0,
                provider=provider
            )
            result = db.users.insert_one(new_user.dict())
            user_id = str(result.inserted_id)
        else:
            user_id = str(user["_id"])
            
        # Create Access Token
        access_token = create_access_token(data={"sub": email})
        
        # Redirect to Frontend
        frontend_url = os.getenv("FRONTEND_URL", "http://localhost:3000")
        redirect_url = f"{frontend_url}/auth/callback?token={access_token}"
        return RedirectResponse(url=redirect_url)

    except Exception as e:
        print(f"OAuth Error: {e}")
        frontend_error_url = os.getenv("FRONTEND_URL", "http://localhost:3000") + "/login?error=oauth_failed"
        return RedirectResponse(url=frontend_error_url)
