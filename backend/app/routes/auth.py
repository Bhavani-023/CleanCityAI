from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.auth.jwt_handler import create_access_token
from app.auth.security import (
    hash_password,
    verify_password
)

from app.database import get_db
from app.models.user import User
from app.schemas.user import UserCreate

router = APIRouter()

# =========================
# REGISTER
# =========================

@router.post("/register")
def register(

    user: UserCreate,

    db: Session = Depends(get_db)

):

    try:

        # CLEAN EMAIL

        email = user.email.strip().lower()

        # CHECK EXISTING USER

        existing_user = db.query(User).filter(

            User.email == email

        ).first()

        if existing_user:

            raise HTTPException(

                status_code=400,

                detail="Email already registered"

            )

        # CREATE USER

        new_user = User(

            email=email,

            password=hash_password(user.password)

        )

        db.add(new_user)

        db.commit()

        db.refresh(new_user)

        return {

            "message": "User created successfully"

        }

    except Exception as e:

        print("REGISTER ERROR:", e)

        raise HTTPException(

            status_code=500,

            detail="Registration Failed"

        )

# =========================
# LOGIN
# =========================

@router.post("/login")
def login(

    user: UserCreate,

    db: Session = Depends(get_db)

):

    try:

        # CLEAN EMAIL

        email = user.email.strip().lower()

        # FIND USER

        existing_user = db.query(User).filter(

            User.email == email

        ).first()

        # CHECK EMAIL

        if not existing_user:

            raise HTTPException(

                status_code=401,

                detail="Invalid Email"

            )

        # VERIFY PASSWORD

        print("USER PASSWORD:", user.password)
        print("DB HASH:", existing_user.password)
        password_valid = verify_password(
              user.password,
              existing_user.password
              )
        print("PASSWORD VALID:", password_valid)
        if not password_valid:

            raise HTTPException(

                status_code=401,

                detail="Invalid Password"

            )

        # CREATE JWT TOKEN

        token = create_access_token({

            "user_id": existing_user.id

        })

        return {

            "access_token": token,

            "token_type": "bearer"

        }

    except Exception as e:

        print("LOGIN ERROR:", e)

        raise HTTPException(

            status_code=500,

            detail="Login Failed"

        )