from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from openai import OpenAI
import os

app = FastAPI()

class FlashcardSet(BaseModel):
    topic: str

class Flashcard(BaseModel):
    content: str

client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

@app.post("/flashcards/", response_model=list[Flashcard])
async def generate_flashcards(flashcard_set: FlashcardSet):
    try:
        completion = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": f"Create flashcards on the topic: {flashcard_set.topic}. Each flashcard should cover a key concept or term related to this topic."},
                {"role": "user", "content": "Generate flashcards."}
            ]
        )
        
        flashcards = [Flashcard(content=choice.message.content) for choice in completion.choices]
        return flashcards
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))




















# # from dotenv import load_dotenv
# # from openai import OpenAI
# # import os

# # # Load environment variables from .env file
# # load_dotenv()

# # client = OpenAI(
# #     api_key=os.environ.get("OPENAI_API_KEY"),
# # )

# # def create_flashcard_set(topic):
# #     completion = client.chat.completions.create(
# #         model="gpt-3.5-turbo",
# #         messages=[
# #             {"role": "system", "content": f"Create flashcards on the topic: {topic}. Each flashcard should cover a key concept or term related to this topic."},
# #             {"role": "user", "content": "Generate flashcards."}
# #         ]
# #     )

# #     # Extract the content of the completion
# #     flashcards = [choice.message for choice in completion.choices]
# #     return flashcards

# # def main():
# #     topic = input("Enter the topic for your flashcard set: ")
# #     flashcards = create_flashcard_set(topic)

# #     print("Generated Flashcard Set:")
# #     for idx, flashcard in enumerate(flashcards):
# #         print(f"Flashcard {idx + 1}: {flashcard}")

# # if __name__ == "__main__":
# #     main()


# from dotenv import load_dotenv
# from openai import OpenAI
# import os

# # Load environment variables from .env file
# load_dotenv()

# client = OpenAI(
#     api_key=os.environ.get("OPENAI_API_KEY"),
# )

# def create_flashcard_set(topic):
#     completion = client.chat.completions.create(
#         model="gpt-3.5-turbo",
#         messages=[
#             {"role": "system", "content": f"Create flashcards on the topic: {topic}. Each flashcard should cover a key concept or term related to this topic."},
#             {"role": "user", "content": "Generate flashcards."}
#         ]
#     )

#     # Extract the content of the completion
#     flashcards = [choice.message.content for choice in completion.choices]
#     return flashcards

# def main():
#     topic = input("Enter the topic for your flashcard set: ")
#     flashcards = create_flashcard_set(topic)

#     print("Generated Flashcard Set:")
#     for idx, content in enumerate(flashcards):
#         print(f"Flashcard {idx + 1}: {content}")

# if __name__ == "__main__":
#     main()
