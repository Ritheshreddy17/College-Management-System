from pydantic import BaseModel

class User(BaseModel):
    role: str
    college_id: str
    department_id: str
    username: str
    password: str
    name: str
    mobile: str