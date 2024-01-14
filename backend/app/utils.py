from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"])


def hash_bcrypt(password: str):
    return pwd_context.hash(password)


def verify(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_dict(list_of_models: list):
    if list_of_models is None or len(list_of_models) == 0:
        return None
    if len(list_of_models[0]) == 4:
        for index, model in enumerate(list_of_models):
            list_of_models[index] = {"anime": model[0], "review_rating": model[1], "comment": model[2], "user": model[3]}
    else:
        pass

    return list_of_models
