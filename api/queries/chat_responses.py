from pydantic import BaseModel
from typing import List, Union, Optional
from queries.pool import pool
from datetime import datetime
from openai import create_flashcard_set

class Response(BaseModel):
    question: str
    answer: str

class ResponseText(BaseModel):
    response_one: str
    response_two: str
    response_three: str
    response_four: str
    response_five: str
    response_six: str
    response_seven: str 
    response_eight: str
    response_nine: str
    response_ten: str


class ResponsesIn(BaseModel):
    subject: str


class ResponsesOut(BaseModel):
    response_id: int
    user_id: int
    subject: str
    response_text: ResponseText
    additional_info: Optional[str]
    created_at: datetime
    
    class timeConfig:
        json_encoders = {
            datetime: lambda dt: dt.time('%m/%d/%Y %H:%M:%S')
        }


class Error(BaseModel):
    message: str


class CreateResponseError(ValueError):
    pass


class ResponseRepository:
    def create_response(self, responses: ResponsesIn, user_id: int) -> Union[ResponsesOut, Error]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                try:
                    # Use the OpenAI function to generate flashcards
                    flashcards = create_flashcard_set(responses.subject)

                    # Insert a new row into chat_responses
                    db.execute(
                        """
                        INSERT INTO chat_responses
                            (user_id, subject, created_at)
                        VALUES
                            (%s, %s, %s)
                        RETURNING response_id, user_id, subject, additional_info, created_at;
                        """,
                        (
                            user_id,
                            responses.subject,
                            datetime.now(),
                        )
                    )

                    # Fetch the inserted row
                    inserted_row = db.fetchone()

                    # If the row is fetched successfully, construct ResponsesOut object
                    if inserted_row:
                        response_out = ResponsesOut(
                            response_id=inserted_row[0],
                            user_id=inserted_row[1],
                            subject=inserted_row[2],
                            response_text=ResponseText(
                                response_one=flashcards[0],
                                response_two=flashcards[1],
                                response_three=flashcards[2],
                                response_four=flashcards[3],
                                response_five=flashcards[4],
                                response_six=flashcards[5],
                                response_seven=flashcards[6],
                                response_eight=flashcards[7],
                                response_nine=flashcards[8],
                                response_ten=flashcards[9],
                            ),
                            additional_info=inserted_row[3],
                            created_at=inserted_row[4]
                        )
                        return response_out
                    else:
                        # Handle the case where fetching the inserted row fails
                        return Error(message="Failed to fetch inserted row")

                except Exception as e:
                    # Handle database errors and return an Error object
                    return Error(message=str(e))
                

                # result = db.execute(
                #     """"
                #     INSERT INTO chat_responses
                #         (user_id, subject, response_text, additional_info, created_at)
                #     VALUES
                #         (%s, %s, %s, %s, %s)
                #     RETURNING (response_id, user_id, subject, response_text, additional_info, created_at);
                #     """,
                #     [
                #         responses.response_id,
                #         responses.user_id,
                #         responses.subject,
                #         responses.response_text.dict(),
                #         responses.additional_info,
                #         responses.created_at,
                #     ]
                # )
                # responses_id = result.fetchone()[0]
                # old_data = responses.dict()
                # return ResponsesOut(
                #     responses_id=responses_id, **old_data
                # )