from fastapi import APIRouter, HTTPException

from pydantic import BaseModel

from jose import jwt

from passlib.context import CryptContext

router = APIRouter()

# =========================
# SECRET KEY
# =========================

SECRET_KEY = "SECRET123"

ALGORITHM = "HS256"

# =========================
# PASSWORD HASHING
# =========================

pwd_context = CryptContext(

    schemes=["bcrypt"],

    deprecated="auto"

)

# =========================
# FAKE DATABASE
# =========================

users_db = {}

# =========================
# USER MODEL
# =========================

class User(BaseModel):

    email: str

    password: str

# =========================
# REGISTER
# =========================

@router.post("/register")

def register(user: User):

    # CHECK EXISTING USER

    if user.email in users_db:

        raise HTTPException(

            status_code=400,

            detail="User already exists"

        )

    # HASH PASSWORD

    hashed_password = pwd_context.hash(

        user.password

    )

    # SAVE USER

    users_db[user.email] = {

        "email": user.email,

        "password": hashed_password,

    }

    return {

        "message": "User created successfully"

    }

# =========================
# LOGIN
# =========================

@router.post("/login")

def login(user: User):

    # CHECK USER

    db_user = users_db.get(user.email)

    if not db_user:

        raise HTTPException(

            status_code=401,

            detail="Invalid credentials"

        )

    # VERIFY PASSWORD

    if not pwd_context.verify(

        user.password,

        db_user["password"]

    ):

        raise HTTPException(

            status_code=401,

            detail="Invalid credentials"

        )

    # CREATE TOKEN

    token = jwt.encode(

        {

            "sub": user.email

        },

        SECRET_KEY,

        algorithm=ALGORITHM

    )

    return {

        "access_token": token,

        "token_type": "bearer"

    }