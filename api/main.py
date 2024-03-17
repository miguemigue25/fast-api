from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from routers import user_routers, flashcard_router, response_routers
from authenticator import authenticator

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.environ.get("CORS_HOST", "http://localhost:3000")
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(authenticator.router)
app.include_router(user_routers.router)
# app.include_router(response_routers.router)
# app.include_router(response_routers.router, prefix="/api")
app.include_router(flashcard_router.router)

@app.get("/api/launch-details")
def launch_details():
    return {
        "launch_details": {
            "module": 3,
            "week": 17,
            "day": 5,
            "hour": 19,
            "min": "00"
        }
    }

