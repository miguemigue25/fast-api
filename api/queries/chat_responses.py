from pydantic import BaseModel
from typing import List, Union, Optional
from queries.pool import pool
from datetime import datetime


class ResponsesIn(BaseModel):
    subject: str
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
    additional_info: Optional[str]
    


class ResponsesOut(BaseModel):
    response_id: int
    user_id: int
    subject: str
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
                    # Insert a new row into chat_responses
                    db.execute(
                        """
                        INSERT INTO chat_responses
                            (user_id, subject, response_one, response_two, response_three, response_four,
                            response_five, response_six, response_seven, response_eight, response_nine,
                            response_ten, additional_info, created_at)
                        VALUES
                            (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                        RETURNING response_id, user_id, subject, response_one, response_two, response_three,
                                  response_four, response_five, response_six, response_seven, response_eight,
                                  response_nine, response_ten, additional_info, created_at;
                        """,
                        (
                            user_id,
                            responses.subject,
                            responses.response_one,
                            responses.response_two,
                            responses.response_three,
                            responses.response_four,
                            responses.response_five,
                            responses.response_six,
                            responses.response_seven,
                            responses.response_eight,
                            responses.response_nine,
                            responses.response_ten,
                            responses.additional_info,
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
                            response_one=inserted_row[3],
                            response_two=inserted_row[4],
                            response_three=inserted_row[5],
                            response_four=inserted_row[6],
                            response_five=inserted_row[7],
                            response_six=inserted_row[8],
                            response_seven=inserted_row[9],
                            response_eight=inserted_row[10],
                            response_nine=inserted_row[11],
                            response_ten=inserted_row[12],
                            additional_info=inserted_row[13],
                            created_at=inserted_row[14]
                        )
                        return response_out
                    else:
                        # Handle the case where fetching the inserted row fails
                        return Error(message="Failed to fetch inserted row")

                except Exception as e:
                    # Handle database errors and return an Error object
                    return Error(message=str(e))
    
    def get_all_responses(self) -> Union[List[ResponsesOut], Error]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # run our SELECT statement
                    result = db.execute(
                        """
                        SELECT response_id, user_id, subject, response_one, response_two, response_three,
                            response_four, response_five, response_six, response_seven, response_eight,
                            response_nine, response_ten, additional_info, created_at
                        FROM chat_responses
                        ORDER BY user_id;
                        """
                    )
                    result = []
                    for record in db:
                        responses = ResponsesOut(
                            response_id=record[0],
                            user_id=record[1],
                            subject=record[2],
                            response_one=record[3],
                            response_two=record[4],
                            response_three=record[5],
                            response_four=record[6],
                            response_five=record[7],
                            response_six=record[8],
                            response_seven=record[9],
                            response_eight=record[10],
                            response_nine=record[11],
                            response_ten=record[12],
                            additional_info=record[13],
                            created_at=record[14]
                        )
                        result.append(responses)
                    return result
        except Exception as e:
            print(e)
            return {"message": "Could not get all responses"}