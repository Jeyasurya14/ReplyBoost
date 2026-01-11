from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="ReplyBoost API")

import os

origins = [
    "http://localhost:3000",
    os.getenv("FRONTEND_URL", "*"), # Allow production URL
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_origin_regex="https://.*\\.vercel\\.app", # Auto-allow all Vercel apps
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
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

