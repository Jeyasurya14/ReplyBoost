from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime

class UserProfile(BaseModel):
    skill: Optional[str] = None
    niche: Optional[str] = None
    platform: Optional[str] = None
    experience: Optional[str] = None

class UserBase(BaseModel):
    email: EmailStr

class UserCreate(UserBase):
    password: str

class UserLogin(UserBase):
    password: str

class UserInDB(UserBase):
    plan: str = "free"
    profile: UserProfile = Field(default_factory=UserProfile)
    daily_usage: int = 0
    created_at: datetime = Field(default_factory=datetime.utcnow)
    hashed_password: str

class UserResponse(UserBase):
    id: str
    plan: str
    profile: UserProfile
    daily_usage: int
    created_at: datetime

    class Config:
        from_attributes = True
