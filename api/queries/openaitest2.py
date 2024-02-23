from dotenv import load_dotenv
from openai import OpenAI
import os
import json

# Load environment variables from .env file
load_dotenv()

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),
)

def create_flashcard_set(topic):
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": f"Create flashcards on the topic: {topic}. Each flashcard should cover a key concept or term related to this topic."},
            {"role": "user", "content": "Generate flashcards."}
        ]
    )

    # Extract the content of the completion
    flashcards = [choice.message for choice in completion.choices]
    return flashcards

def main():
    topic = input("Enter the topic for your flashcard set: ")
    flashcards = create_flashcard_set(topic)

    print("Generated Flashcard Set:")
    for idx, flashcard in enumerate(flashcards):
        print(f"Flashcard {idx + 1}: {flashcard}")

if __name__ == "__main__":
    main()