from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

import os

from app.routes import auth, complaint
from app.database import engine

from app.models.user import User
from app.models.complaint import Complaint

app = FastAPI()

# DATABASE TABLES
User.metadata.create_all(bind=engine)
Complaint.metadata.create_all(bind=engine)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ROUTES
app.include_router(auth.router)
app.include_router(complaint.router)

# UPLOADS
os.makedirs("uploads", exist_ok=True)

app.mount(
    "/uploads",
    StaticFiles(directory="uploads"),
    name="uploads"
)

@app.get("/")
def home():
    return {"message": "CleanCityAI Backend Running"}