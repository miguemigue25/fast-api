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

from dotenv import load_dotenv
import openai
import os

load_dotenv()


class HttpError(BaseModel):
    detail: str

class FlashcardItem(BaseModel):
    question: str
    answer: str

class FlashcardsResponse(BaseModel):
    flashcards: List[FlashcardItem]


router = APIRouter()

OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")

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


@router.post("/generate_flashcards/", response_model=Union[FlashcardsResponse, HttpError])
async def generate_flashcards(topic: str):
    try:
        # Make a call to the OpenAI API to generate flashcards
        print("Topic:", topic)  # Log the topic received
        client = openai.OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))
        completion = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": f"Create flashcards on the topic: {topic}. Each flashcard should cover a key concept or term related to this topic."},
                {"role": "user", "content": "Generate flashcards."}
            ]
        )
        print("Completion:", completion)  # Log the completion response
        flashcards = []
        for choice in completion.choices:
            # Splitting content into flashcards
            flashcard_texts = choice.message.content.split('\n\n')
            for flashcard_text in flashcard_texts:
                # Splitting each flashcard into term and definition
                flashcard_parts = flashcard_text.split('\n')
                if len(flashcard_parts) == 2:
                    term = flashcard_parts[0].split(': ')[1]
                    definition = flashcard_parts[1].split(': ')[1]
                    flashcards.append(FlashcardItem(question=term, answer=definition))
        return FlashcardsResponse(flashcards=flashcards)
    except Exception as e:
        # Log the error for debugging purposes
        print(f"Error occurred: {e}")
        # Return an HTTPError with appropriate detail
        return HttpError(detail="Internal Server Error")
