from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from jwtdown_fastapi.authentication import Token
from authenticator import authenticator

from pydantic import BaseModel

from queries.users import (
    UsersIn,
    UsersOut,
    UsersRepo,
    Error,
    DuplicateAccountError,
    UserOutWithPassword
)

from typing import Optional, Union, List

class UserForm(BaseModel):
    username: str
    password: str

class UserToken(Token):
    user: UsersOut

class HttpError(BaseModel):
    detail: str


router = APIRouter()


@router.post("/users", response_model=UserToken | HttpError)
async def create_user(
    info: UsersIn,
    request: Request,
    response: Response,
    repo: UsersRepo = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    try:
        user = repo.create_user(info, hashed_password)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    form = UserForm(username=info.username, password=info.password)
    token = await authenticator.login(response, request, form, repo)
    return UserToken(user=user, **token.dict())


@router.get("/token", response_model=UserToken | None)
async def get_token(
    request: Request,
    user: UsersIn = Depends(authenticator.try_get_current_account_data),
) -> UserToken | None:
    if user and authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "user": user,
        }


@router.get("/users", response_model=Union[List[UsersOut], Error])
def get_all_users(
    repo: UsersRepo = Depends(),
    user_data: dict = Depends(authenticator.get_current_account_data),
):

    return repo.get_all_users()


@router.get("/users/{username}", response_model=Optional[UserOutWithPassword])
def get_user_by_username(
    username: str,
    response: Response,
    repo: UsersRepo = Depends(),
    user_data: dict = Depends(authenticator.get_current_account_data),
) -> UserOutWithPassword:
    user = repo.get(username)
    if user is None:
        response.status_code = 404
    return user


@router.get("/users/id/{user_id}", response_model=Optional[UsersOut])
def get_user_by_user_id(
    user_id: int,
    response: Response,
    repo: UsersRepo = Depends(),
    user_data: dict = Depends(authenticator.get_current_account_data),
) -> UsersOut:
    user = repo.get_one_user(user_id)
    if user is None:
        response.status_code = 404
    return user


@router.put("/users/{user_id}", response_model=Union[UsersOut, Error])
def update_user(
    user_id: int,
    user: UsersIn,
    user_data: dict = Depends(authenticator.get_current_account_data),
    repo: UsersRepo = Depends(),
) -> Union[UsersOut, Error]:
    return repo.update_user(user_id, user)


@router.delete("/users/{user_id}", response_model=bool)
def delete_user(
    user_id: int,
    user_data: dict = Depends(authenticator.get_current_account_data),
    repo: UsersRepo = Depends(),
) -> bool:
    return repo.delete_user(user_id)

# @router.post("/users", response_model=Union[UsersOut, Error])
# def create_user(
#     user: UsersIn, 
#     repo: UsersRepo = Depends(),
# ):
#     try:
#         new_user = repo.create_user(user)
#         return new_user
#     except DuplicateAccountError:
#         raise HTTPException(
#             status_code=status.HTTP_400_BAD_REQUEST,
#             detail="Duplicate username",
#         )
    

# @router.get("/users", response_model=Union[Error, List[UsersOut]])
# def get_all_users(
#     repo: UsersRepo = Depends(),
# ):
#     return repo.get_all_users()


# @router.put("/users/{user_id}", response_model=Union[UsersOut, Error])
# def update_user(
#     user_id: int, 
#     user: UsersIn,
#     repo: UsersRepo = Depends(),
# ) -> Union[Error, UsersOut]:
#     return repo.update_user(user_id, user)


# @router.get("/users/{user_id}", response_model=Optional[UsersOut])
# def get_one_user(
#     user_id: int,
#     response: Response,
#     repo: UsersRepo = Depends(),
# ) -> UsersOut:
#     return repo.get_one_user(user_id)


# @router.delete("/users/{user_id}", response_model=bool)
# def delete_user(
#     user_id: int,
#     repo: UsersRepo = Depends(),
# ) -> bool:
#     return repo.delete_user(user_id)