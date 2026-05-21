from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session

from jose import jwt, JWTError

from app.database import get_db
from app.models.complaint import Complaint

from app.auth.jwt_handler import SECRET_KEY, ALGORITHM

from fastapi import File, UploadFile

import shutil
import os

# =========================
# ROUTER
# =========================

router = APIRouter()

# =========================
# JWT SECURITY
# =========================

security = HTTPBearer()

# =========================
# VERIFY TOKEN
# =========================

def verify_token(

    credentials: HTTPAuthorizationCredentials = Depends(security)

):

    token = credentials.credentials

    try:

        payload = jwt.decode(

            token,

            SECRET_KEY,

            algorithms=[ALGORITHM]

        )

        user_id = payload.get("user_id")

        if user_id is None:

            raise HTTPException(

                status_code=401,

                detail="Invalid token"

            )

        return user_id

    except JWTError:

        raise HTTPException(

            status_code=401,

            detail="Invalid token"

        )

# =========================
# CREATE COMPLAINT
# =========================

@router.post("/complaint")
def create_complaint(

    description: str,
    latitude: float,
    longitude: float,

    image: UploadFile = File(...),

    user_id: int = Depends(verify_token),

    db: Session = Depends(get_db)

):

    try:

        # CREATE UPLOADS FOLDER

        os.makedirs("uploads", exist_ok=True)

        # UNIQUE IMAGE NAME

        file_name = image.filename.replace(" ", "_")

        file_path = f"uploads/{file_name}"

        # SAVE IMAGE

        with open(file_path, "wb") as buffer:

            shutil.copyfileobj(image.file, buffer)

        # SAVE TO DATABASE

        new_complaint = Complaint(

            description=description,

            image_url=file_path,

            latitude=latitude,

            longitude=longitude,

            status="Pending",

            user_id=user_id

        )

        db.add(new_complaint)

        db.commit()

        db.refresh(new_complaint)

        return {

            "message": "Complaint submitted successfully",

            "complaint_id": new_complaint.id

        }

    except Exception as e:

        print("COMPLAINT ERROR:", e)

        raise HTTPException(

            status_code=500,

            detail=str(e)

        )

# =========================
# GET COMPLAINTS
# =========================

@router.get("/complaints")
def get_complaints(

    db: Session = Depends(get_db)

):

    complaints = db.query(Complaint).all()

    return complaints

# =========================
# UPDATE STATUS
# =========================

@router.put("/complaint/{complaint_id}")
def update_status(

    complaint_id: int,

    status: str,

    db: Session = Depends(get_db)

):

    complaint = db.query(Complaint).filter(

        Complaint.id == complaint_id

    ).first()

    if not complaint:

        raise HTTPException(

            status_code=404,

            detail="Complaint not found"

        )

    complaint.status = status

    db.commit()

    return {

        "message": "Complaint status updated",

        "updated_status": status

    }