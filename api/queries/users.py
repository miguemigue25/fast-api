from pydantic import BaseModel
from typing import List, Union, Optional
from queries.pool import pool


class Error(BaseModel):
    message: str

class UsersIn(BaseModel):
    username: str
    password: str


class UsersOut(BaseModel):
    user_id: int
    username: str
    password: str

class DuplicateAccountError(ValueError):
    pass

class UsersRepo:
    def create_user(self, user: UsersIn) -> Union[UsersOut, Error]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # run our INSERT
                    result = db.execute(
                        """
                        INSERT INTO users 
                            (username, password)
                        VALUES
                            (%s, %s)
                        RETURNING user_id;
                        """,
                        [
                            user.username, 
                            user.password
                        ] 
                    )
                    user_id = result.fetchone()[0]
                    # Return new data
                    old_data = user.dict()
                    return UsersOut(user_id=user_id, **old_data)
        except Exception:
            return {"message": "error when creating user"}
            
    
    def get_all_users(self) -> Union[Error, List[UsersOut]]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # run our SELECT statement
                    result = db.execute(
                        """
                        SELECT user_id, username, password
                        FROM users
                        ORDER BY user_id;
                        """
                    )
                    result = []
                    for record in db:
                        user = UsersOut(
                            user_id=record[0],
                            username=record[1],
                            password=record[2],
                        )
                        result.append(user)
                    return result
        except Exception as e:
            print(e)
            return {"message": "Could not get all users"}

    def update_user(self, user_id: int, user: UsersIn) -> Union[UsersOut, Error]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        UPDATE users
                        SET username = %s, password = %s
                        WHERE user_id = %s
                        RETURNING user_id, username, password
                        """,
                        [
                            user.username,
                            user.password,
                            user_id
                        ],
                    )
                    record = result.fetchone()
                    return UsersOut(
                        user_id=record[0],
                        username=record[1],
                        password=record[2]
                    )
        except Exception as e:
            print (e)
            return {"message": "Could not update user"}
        

    def get_one_user(self, user_id: int) -> Optional[UsersOut]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # run our SELECT statement
                    result = db.execute(
                        """
                        SELECT user_id, username, password
                        FROM users
                        WHERE user_id = %s    
                        """,
                            [user_id]
                    )
                    record = result.fetchone()
                    print(record)
                    if record is None:
                        return None
                    return UsersOut(
                        user_id=record[0],
                        username=record[1],
                        password=record[2]
                    )
        except Exception as e:
            print (e)
            return {"message": "Could not get that user"}
        
    
    def delete_user(self, user_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM users
                        WHERE user_id=%s
                        """,
                        [user_id] 
                    )
                    return True
        except Exception as e:
            print(e)
            return False