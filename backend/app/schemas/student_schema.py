from pydantic import BaseModel, EmailStr


class Student(BaseModel):
    name: str
    usn: str
    email: EmailStr
    phone: str
    department: str
    course: str