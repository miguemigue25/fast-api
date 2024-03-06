from fastapi import APIRouter, Depends, HTTPException
from queries.flashcard import FlashcardRepo, FlashcardsResponse, FlashcardItem, Error
from typing import Union, Optional, List
from pydantic import ValidationError

router = APIRouter()

@router.post("/generate_flashcards/", response_model=Union[FlashcardsResponse, Error])
async def generate_flashcards(
    topic: str,
    repo: FlashcardRepo = Depends(),
):
    try:
        flashcards_response = repo.generate_flashcards(topic)
        return flashcards_response
    except Error as e:
        raise HTTPException(status_code=500, detail=e.message)


@router.get("/flashcards", response_model=Union[FlashcardsResponse, Error])
def get_all_flashcards(repo: FlashcardRepo = Depends()):
    try:
        return repo.get_all_flashcards()
    except ValidationError as e:
        raise HTTPException(status_code=500, detail=str(e))
    

@router.get("/flashcards/{flashcard_id}", response_model=Union[FlashcardItem, Error])
def get_flashcard_by_id(flashcard_id: int, repo: FlashcardRepo = Depends()):
    try:
        return repo.get_flashcard_by_id(flashcard_id)
    except ValidationError as e:
        raise HTTPException(status_code=500, detail=str(e))