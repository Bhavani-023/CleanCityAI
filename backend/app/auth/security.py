from passlib.context import CryptContext

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)

# =========================
# HASH PASSWORD
# =========================

def hash_password(password: str):

    password = password.strip()

    return pwd_context.hash(password)

# =========================
# VERIFY PASSWORD
# =========================

def verify_password(
    plain_password,
    hashed_password
):

    try:

        plain_password = plain_password.strip()

        return pwd_context.verify(
            plain_password,
            hashed_password
        )

    except Exception as e:

        print("PASSWORD VERIFY ERROR:", e)

        return False