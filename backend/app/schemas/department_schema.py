from pydantic import BaseModel


class Department(BaseModel):
    name: str
    code: str
    hod: str