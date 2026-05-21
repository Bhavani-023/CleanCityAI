from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.user import User
from app.schemas.user import UserCreate
from app.utils.security import hash_password

router = APIRouter()

@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):

    # CHECK EXISTING USER
    existing_user = db.query(User).filter(User.email == user.email).first()

    if existing_user:

        raise HTTPException(

            status_code=400,

            detail="Email already registered"

        )

    # CREATE NEW USER
    new_user = User(

        email=user.email,

        password=hash_password(user.password)

    )

    db.add(new_user)

    db.commit()

    db.refresh(new_user)

    return {

        "message": "User created successfully"

    }