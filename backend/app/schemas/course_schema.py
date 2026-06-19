from pydantic import BaseModel


class Course(BaseModel):
    name: str
    code: str
    duration: str
    department: str