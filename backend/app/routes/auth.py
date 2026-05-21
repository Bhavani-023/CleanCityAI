from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.user import User
from app.schemas.user import UserCreate

from passlib.context import CryptContext

router = APIRouter()

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)

# =========================
# HASH PASSWORD
# =========================

def hash_password(password: str):

    return pwd_context.hash(password)

# =========================
# VERIFY PASSWORD
# =========================

def verify_password(
    plain_password,
    hashed_password
):

    return pwd_context.verify(
        plain_password,
        hashed_password
    )

# =========================
# REGISTER
# =========================

@router.post("/register")
def register(
    user: UserCreate,
    db: Session = Depends(get_db)
):

    try:

        existing_user = db.query(User).filter(
            User.email == user.email
        ).first()

        if existing_user:

            raise HTTPException(
                status_code=400,
                detail="Email already registered"
            )

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

    except Exception as e:

        print("REGISTER ERROR:", e)

        raise HTTPException(
            status_code=500,
            detail=str(e)
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

        existing_user = db.query(User).filter(
            User.email == user.email
        ).first()

        if not existing_user:

            raise HTTPException(
                status_code=401,
                detail="Invalid Email"
            )

        if not verify_password(
            user.password,
            existing_user.password
        ):

            raise HTTPException(
                status_code=401,
                detail="Invalid Password"
            )

        return {
            "access_token": "login_success"
        }

    except Exception as e:

        print("LOGIN ERROR:", e)

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )