from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="ReplyBoost API")

import os

origins = [
    "http://localhost:3000",
    "https://replyboost.learn-made.in", # Custom Domain
    os.getenv("FRONTEND_URL", "*"), # Allow production URL
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allow all for now to rule out CORS
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(
    SessionMiddleware,
    secret_key=os.getenv("SECRET_KEY", "super-secret-key-change-me"),
    https_only=False # Set to True in production with HTTPS
)

from app.routes import auth, users, generator, proposals, income

app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(users.router, prefix="/api/users", tags=["users"])
app.include_router(generator.router, prefix="/api", tags=["generator"])
app.include_router(proposals.router, prefix="/api", tags=["proposals"])
app.include_router(income.router, prefix="/api", tags=["income"])

@app.get("/")
def read_root():
    return {"status": "ok", "message": "ReplyBoost API is running"}

