from pydantic import BaseModel
from typing import Dict, List, Union
import openai
import os
from datetime import datetime
from queries.pool import pool
import json

class FlashcardItem(BaseModel):
    flashcard_id: int
    topic: str
    flashcards: List[Dict[str, Union[str, str]]]

class FlashcardsResponse(BaseModel):
    flashcards: List[FlashcardItem]

class Error(BaseModel):
    message: str


class FlashcardRepo:
    flashcard_id = 1 

    def generate_flashcards(self, topic: str) -> Union[FlashcardsResponse, Error]:
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

                        db.execute("INSERT INTO flashcards (topic, flashcard) VALUES (%s, %s)", (topic, flashcards_json))
                        conn.commit()

                        flashcards_list.append(FlashcardItem(flashcard_id=FlashcardRepo.flashcard_id, topic=topic, flashcards=flashcards))
                        FlashcardRepo.flashcard_id += 1  

            return FlashcardsResponse(flashcards=flashcards_list)
        except Exception as e:
            return Error(message=str(e))


    def get_all_flashcards(self) -> Union[List[FlashcardItem], Error]:
        try:
            # Connect to the database
            with pool.connection() as conn:
                with conn.cursor() as db:
                    # Execute the SQL query to fetch all flashcards
                    db.execute("SELECT flashcard_id, topic, flashcard FROM flashcards")
                    
                    rows = db.fetchall()

                    flashcards_list = []

                    for row in rows:
                        flashcard_id, topic, flashcards_json = row
                        flashcards_data = json.loads(flashcards_json) 
                        flashcards = [{"question": item["question"], "answer": item["answer"]} for item in flashcards_data]
                        flashcards_list.append(FlashcardItem(flashcard_id=flashcard_id, topic=topic, flashcards=flashcards))

                    return FlashcardsResponse(flashcards=flashcards_list)
        except Exception as e:
            return Error(message=str(e))
        


    # flashcard_id = 1  # Class variable to track flashcard_id

    # def generate_flashcards(self, topic: str) -> Union[FlashcardsResponse, Error]:
    #     try:
    #         client = openai.OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))
    #         completion = client.chat.completions.create(
    #             model="gpt-3.5-turbo",
    #             messages=[
    #                 {"role": "system", "content": f"Create flashcards on the topic: {topic}. Each flashcard should cover a key concept or term related to this topic."},
    #                 {"role": "user", "content": "Generate flashcards."}
    #             ]
    #         )

    #         flashcards_list = []

    #         for choice in completion.choices:
    #             flashcard_texts = choice.message.content.split('\n\n')
    #             flashcards = []

    #             for flashcard_text in flashcard_texts:
    #                 flashcard_parts = flashcard_text.split('\n')
    #                 if len(flashcard_parts) == 2:
    #                     question = flashcard_parts[0].split(': ')[1]
    #                     answer = flashcard_parts[1].split(': ')[1]
    #                     flashcards.append({"question": question, "answer": answer})

    #             flashcards_list.append(FlashcardItem(flashcard_id=FlashcardRepo.flashcard_id, topic=topic, flashcards=flashcards))
    #             FlashcardRepo.flashcard_id += 1  # Increment flashcard_id within the loop to ensure uniqueness

    #         return FlashcardsResponse(flashcards=flashcards_list)
    #     except Exception as e:
    #         return Error(message=str(e))