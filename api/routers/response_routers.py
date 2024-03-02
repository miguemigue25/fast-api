from fastapi import (
    Depends,
    HTTPException,
    Response,
    APIRouter,
    Request,
)
from authenticator import authenticator

from pydantic import BaseModel
from typing import Union, List
from queries.chat_responses import (
    ResponsesIn,
    ResponsesOut,
    ResponseRepository,
    Error,
    CreateResponseError
)


class HttpError(BaseModel):
    detail: str


router = APIRouter()


@router.post("/responses", response_model=ResponsesOut | HttpError)
async def create_response(
    info: ResponsesIn,
    request: Request,
    response: Response,
    data: dict = Depends(authenticator.get_current_account_data),
    repo: ResponseRepository = Depends(),
):
    try:
        user_id = data["user_id"]
        responses = repo.create_response(info, user_id=user_id)
    except CreateResponseError:
        raise HTTPException(
            status_code=response.status_code == 404,
            detail="Could not create a response",
        )
    return responses

@router.get("/responses", response_model=Union[List[ResponsesOut], Error])
def get_all_responses(
    repo: ResponseRepository = Depends(),
    user_data: dict = Depends(authenticator.get_current_account_data),
):

    return repo.get_all_responses()