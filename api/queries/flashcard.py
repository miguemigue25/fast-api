from pydantic import BaseModel, Field
from typing import Dict, List, Union
import openai
import os
from datetime import datetime
from queries.pool import pool
import json


class FlashcardItem(BaseModel):
    flashcard_id: int
    user_id: int
    topic: str
    flashcards: List[Dict[str, Union[str, str]]]
    created_at: datetime = Field(default_factory=datetime.now)

    class Config:
        json_encoders = {
            datetime: lambda dt: dt.strftime('%m/%d/%Y')
        }


class FlashcardsResponse(BaseModel):
    flashcards: List[FlashcardItem]

class Error(BaseModel):
    message: str


class FlashcardRepo:
    flashcard_id = 1 

    @staticmethod
    def _get_flashcard_item_from_row(row):
        flashcard_id, user_id, topic, flashcards_json, created_at = row
        flashcards_data = json.loads(flashcards_json)
        flashcards = [{"question": item["question"], "answer": item["answer"]} for item in flashcards_data]
        return FlashcardItem(
            flashcard_id=flashcard_id,
            user_id=user_id, 
            topic=topic, 
            flashcards=flashcards,
            created_at=created_at
        )

    def generate_flashcards(self, user_id, topic: str) -> Union[FlashcardsResponse, Error]:
        try:
            client = openai.OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))
            completion = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": f"Create flashcards on the topic: {topic}. Each flashcard should cover a key concept or term related to this topic."},
                    {"role": "user", "content": "Generate flashcards."}
                ]
            )

            flashcards_list = []

            with pool.connection() as conn:
                with conn.cursor() as db:
                    for choice in completion.choices:
                        flashcard_texts = choice.message.content.split('\n\n')
                        flashcards = []

                        for flashcard_text in flashcard_texts:
                            flashcard_parts = flashcard_text.split('\n')
                            if len(flashcard_parts) == 2:
                                question = flashcard_parts[0].split(': ')[1]
                                answer = flashcard_parts[1].split(': ')[1]
                                flashcards.append({"question": question, "answer": answer})

                        flashcards_json = json.dumps(flashcards)

                        db.execute(
                            """
                            INSERT INTO flashcards 
                                (user_id, topic, flashcard, created_at) 
                            VALUES 
                                (%s, %s, %s, %s)
                            """, 
                            (
                                user_id,
                                topic, 
                                flashcards_json,
                                datetime.now()
                            )
                        )
                        conn.commit()

                        flashcards_list.append(FlashcardRepo._get_flashcard_item_from_row(
                            (FlashcardRepo.flashcard_id, user_id, topic, flashcards_json, datetime.now())
                        ))
                        FlashcardRepo.flashcard_id += 1  

            return FlashcardsResponse(flashcards=flashcards_list)
        except Exception as e:
            return Error(message=str(e))

    def get_all_flashcards(self, user_id) -> Union[List[FlashcardItem], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT 
                            flashcard_id, user_id, topic, flashcard, created_at
                        FROM flashcards
                        WHERE user_id = %s;
                        """,
                        [user_id]
                    )
                    
                    rows = db.fetchall()

                    flashcards_list = []

                    for row in rows:
                        flashcards_list.append(FlashcardRepo._get_flashcard_item_from_row(row))

                    return FlashcardsResponse(flashcards=flashcards_list)
        except Exception as e:
            return Error(message=str(e))
        

    def get_flashcard_by_id(self, user_id, flashcard_id: int) -> Union[FlashcardItem, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT 
                            flashcard_id, user_id, topic, flashcard, created_at 
                        FROM flashcards 
                        WHERE flashcard_id = %s AND user_id = %s
                        """, 
                        (
                            flashcard_id,
                            user_id
                        )
                    )
                    
                    row = db.fetchone()

                    if not row:
                        return Error(message=f"Flashcard with flashcard_id {flashcard_id} not found")

                    flashcard_id, user_id, topic, flashcards_json, created_at = row
                    flashcards_data = json.loads(flashcards_json)
                    flashcards = [{"question": item["question"], "answer": item["answer"]} for item in flashcards_data]

                    return FlashcardItem(
                        flashcard_id=flashcard_id, 
                        user_id=user_id,
                        topic=topic,
                        flashcards=flashcards,
                        created_at=created_at    
                    )
        except Exception as e:
            return Error(message=str(e))
        
        
    def delete_flashcard(self, user_id, flashcard_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM flashcards
                        WHERE flashcard_id = %s AND user_id = %s
                        """,
                        [
                            flashcard_id,
                            user_id
                        ],
                    )
                    return True
        except Exception as e:
            print(e)
            return False