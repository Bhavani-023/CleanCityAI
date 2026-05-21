from passlib.context import CryptContext

# =========================
# PASSWORD HASHING CONFIG
# =========================

pwd_context = CryptContext(

    schemes=["bcrypt"],

    deprecated="auto"

)

# =========================
# HASH PASSWORD
# =========================

def hash_password(password: str):

    # FIX BCRYPT 72 CHAR LIMIT

    password = password[:72]

    return pwd_context.hash(password)

# =========================
# VERIFY PASSWORD
# =========================

def verify_password(

    plain_password: str,

    hashed_password: str

):

    try:

        # FIX BCRYPT 72 CHAR LIMIT

        plain_password = plain_password[:72]

        return pwd_context.verify(

            plain_password,

            hashed_password

        )

    except Exception as e:

        print("PASSWORD VERIFY ERROR:", e)

        return False