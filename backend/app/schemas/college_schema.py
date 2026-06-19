from pydantic import BaseModel, EmailStr

class College(BaseModel):
    name: str
    code: str
    email: EmailStr
    phone: str
    address: str