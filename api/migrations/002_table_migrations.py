steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE users (
            user_id SERIAL PRIMARY KEY NOT NULL,
            username VARCHAR(20) NOT NULL UNIQUE,
            hashed_password VARCHAR(250) NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE users;
        """
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE chat_responses (
            response_id SERIAL PRIMARY KEY NOT NULL,
            user_id INT REFERENCES users(user_id),
            subject VARCHAR(30) NOT NULL UNIQUE,
            response_one VARCHAR(250) NOT NULL,
            response_two VARCHAR(250) NOT NULL,
            response_three VARCHAR(250) NOT NULL,
            response_four VARCHAR(250) NOT NULL,
            response_five VARCHAR(250) NOT NULL,
            response_six VARCHAR(250) NOT NULL,
            response_seven VARCHAR(250) NOT NULL,
            response_eight VARCHAR(250) NOT NULL,
            response_nine VARCHAR(250) NOT NULL,
            response_ten VARCHAR(250) NOT NULL,
            additional_info VARCHAR(250),
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(user_id)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE chat_responses;
        """
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE flashcard_set (
            flashcard_id SERIAL PRIMARY KEY NOT NULL UNIQUE,
            question VARCHAR(20) NOT NULL UNIQUE,
            answer VARCHAR(250) NOT NULL,
            set_id SERIAL NOT NULL UNIQUE,
            FOREIGN KEY (set_id) REFERENCES chat_responses(response_id)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE flashcard_set;
        """
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE flashcards (
            flashcard_id SERIAL PRIMARY KEY NOT NULL,
            topic VARCHAR(50) NOT NULL,
            flashcard VARCHAR(10000) NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE flashcards;
        """
    ]
]






# user_id column in the chat_responses table, and 
# the FOREIGN KEY constraint references the user_id 
# column in the users table. It allows you to associate 
# each chat_response with a specific user. If this meets 
# your requirements, then your table structure is appropriate.

