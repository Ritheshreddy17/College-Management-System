from pydantic import BaseModel, EmailStr

class Student(BaseModel):
    name: str
    usn: str
    email: EmailStr
    phone: str

    college: str
    department: str
    course: str