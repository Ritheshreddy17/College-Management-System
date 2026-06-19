from pydantic import BaseModel, EmailStr


class Faculty(BaseModel):
    name: str
    email: EmailStr
    phone: str
    department: str
    designation: str