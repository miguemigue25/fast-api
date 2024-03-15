from fastapi import APIRouter, Depends, HTTPException
from queries.flashcard import (
    FlashcardRepo, 
    FlashcardsResponse, 
    FlashcardItem, 
    Error
)
from typing import Union
from pydantic import ValidationError
from authenticator import authenticator

router = APIRouter()

@router.post("/generate_flashcards/", response_model=Union[FlashcardsResponse, Error])
async def generate_flashcards(
    topic: str,
    repo: FlashcardRepo = Depends(),
    data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        flashcards_response = repo.generate_flashcards(user_id=data["user_id"], topic=topic)
        return flashcards_response
    except Error as e:
        raise HTTPException(status_code=500, detail=e.message)


@router.get("/flashcards", response_model=Union[FlashcardsResponse, Error])
def get_all_flashcards(
    repo: FlashcardRepo = Depends(),
    data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        return repo.get_all_flashcards(data["user_id"])
    except ValidationError as e:
        raise HTTPException(status_code=500, detail=str(e))
    

@router.get("/flashcards/{flashcard_id}", response_model=Union[FlashcardItem, Error])
def get_flashcard_by_id(
    flashcard_id: int, 
    repo: FlashcardRepo = Depends(),
    data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        return repo.get_flashcard_by_id(data["user_id"], flashcard_id)
    except ValidationError as e:
        raise HTTPException(status_code=500, detail=str(e))
    

@router.delete("/flashcards/{flashcard_id}", response_model=bool)
def delete_flashcard(
    flashcard_id: int,
    repo: FlashcardRepo = Depends(),
    data: dict = Depends(authenticator.get_current_account_data),
) -> bool:
    return repo.delete_flashcard(data["user_id"], flashcard_id)
