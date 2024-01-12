from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"])


def hash_bcrypt(password: str):
    return pwd_context.hash(password)
