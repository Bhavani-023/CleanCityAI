from fastapi import APIRouter, Depends, HTTPException

from sqlalchemy.orm import Session

from app.database import get_db

from app.models.complaint import Complaint

from fastapi import File, UploadFile

import shutil

import os

# =========================
# ROUTER
# =========================

router = APIRouter()

# =========================
# CREATE COMPLAINT
# =========================

@router.post("/complaint")

def create_complaint(

    description: str,

    latitude: float,

    longitude: float,

    image: UploadFile = File(...),

    db: Session = Depends(get_db)

):

    # =========================
    # CREATE UPLOADS FOLDER
    # =========================

    os.makedirs("uploads", exist_ok=True)

    # =========================
    # SAVE IMAGE
    # =========================

    file_path = f"uploads/{image.filename}"

    with open(file_path, "wb") as buffer:

        shutil.copyfileobj(image.file, buffer)

    # =========================
    # SIMPLE AI RESULT
    # =========================

    prediction = "Garbage Detected"

    # =========================
    # SAVE COMPLAINT
    # =========================

    new_complaint = Complaint(

        description=description,

        image_url=file_path,

        latitude=latitude,

        longitude=longitude,

        user_id=1

    )

    db.add(new_complaint)

    db.commit()

    db.refresh(new_complaint)

    return {

        "message": "Complaint submitted successfully",

        "complaint_id": new_complaint.id,

        "ai_result": prediction

    }

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