from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"])


def hash_bcrypt(password: str):
    return pwd_context.hash(password)


def verify(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)