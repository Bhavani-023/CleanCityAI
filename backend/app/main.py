from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import os

from app.routes import auth, complaint
from app.database import engine

from app.models.user import User

from app.models.complaint import Complaint

# =========================
# CREATE FASTAPI APP
# =========================
app = FastAPI()
User.metadata.create_all(bind=engine)

Complaint.metadata.create_all(bind=engine)

# =========================
# CORS
# =========================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================
# INCLUDE ROUTES
# =========================
app.include_router(auth.router)
app.include_router(complaint.router)

# =========================
# CREATE UPLOADS FOLDER
# =========================
os.makedirs("uploads", exist_ok=True)

# =========================
# SERVE UPLOADED IMAGES
# =========================
app.mount(
    "/uploads",
    StaticFiles(directory="uploads"),
    name="uploads"
)

# =========================
# ROOT API
# =========================
@app.get("/")
def home():

    return {
        "message": "CleanCityAI Backend Running"
    }