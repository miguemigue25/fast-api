steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE users (
            username VARCHAR(20) NOT NULL UNIQUE,
            password VARCHAR(250) NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE users;
        """
    ]
]
