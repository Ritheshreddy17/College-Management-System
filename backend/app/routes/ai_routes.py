from fastapi import APIRouter

router = APIRouter()

@router.post("/chat")
async def chat(data: dict):

    message = data["message"]

    return {
        "response": f"You asked: {message}"
    }