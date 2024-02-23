# from fastapi import (
#     Depends,
#     HTTPException,
#     Response,
#     APIRouter,
#     Request,
# )
# from authenticator import authenticator

# from pydantic import BaseModel
# from typing import Union, List
# from queries.chat_responses import (
#     ResponsesIn,
#     ResponsesOut,
#     ResponseRepository,
#     Error,
#     CreateResponseError
# )


# class HttpError(BaseModel):
#     detail: str


# router = APIRouter()


# @router.post("/responses", response_model=ResponsesOut | HttpError)
# async def create_response(
#     info: ResponsesIn,
#     request: Request,
#     response: Response,
#     data: dict = Depends(authenticator.get_current_account_data),
#     repo: ResponseRepository = Depends(),
# ):
#     try:
#         responses = repo.create_response(info)
#     except CreateResponseError:
#         raise HTTPException(
#             status_code=response.status_code == 404,
#             detail="Could not create a response",
#         )
#     return responses