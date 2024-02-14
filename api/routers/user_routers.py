from fastapi import APIRouter, Depends, Response, HTTPException, status
from typing import Union, List, Optional
from queries.users import UsersIn, UsersRepo, UsersOut, Error, DuplicateAccountError

router = APIRouter()


@router.post("/users", response_model=Union[UsersOut, Error])
def create_user(
    user: UsersIn, 
    repo: UsersRepo = Depends(),
):
    try:
        new_user = repo.create_user(user)
        return new_user
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Duplicate username",
        )
    

@router.get("/users", response_model=Union[Error, List[UsersOut]])
def get_all_users(
    repo: UsersRepo = Depends(),
):
    return repo.get_all_users()


@router.put("/users/{user_id}", response_model=Union[UsersOut, Error])
def update_user(
    user_id: int, 
    user: UsersIn,
    repo: UsersRepo = Depends(),
) -> Union[Error, UsersOut]:
    return repo.update_user(user_id, user)


@router.get("/users/{user_id}", response_model=Optional[UsersOut])
def get_one_user(
    user_id: int,
    response: Response,
    repo: UsersRepo = Depends(),
) -> UsersOut:
    return repo.get_one_user(user_id)


@router.delete("/users/{user_id}", response_model=bool)
def delete_user(
    user_id: int,
    repo: UsersRepo = Depends(),
) -> bool:
    return repo.delete_user(user_id)