from fastapi import APIRouter
from fastapi import HTTPException
from app.config.database import (
    students_collection,
    faculty_collection,
    users_collection
)
router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

@router.get("/test")
def test_auth():
    return {"message": "Auth route working"}
@router.post("/register/student")
def register_student(data: dict):

    student_data = {
        "name": data["name"],
        "usn": data["usn"],
        "email": data.get("email", ""),
        "phone": data["phone"],
        "college": data["college"],
        "department": data["department"],
        "course": data["course"]
    }

    students_collection.insert_one(student_data)

    users_collection.insert_one({
        "role": "student",
        "username": data["usn"],
        "password": data["phone"],
        "name": data["name"],
        "college": data["college"]
    })

    return {
        "message": "Student Registered Successfully"
    }
@router.post("/register/faculty")
def register_faculty(data: dict):

    faculty_data = {
        "name": data["name"],
        "employee_id": data["employee_id"],
        "phone": data["phone"],
        "department": data["department"],
        "college": data["college"],
        "designation": data["designation"]
    }

    faculty_collection.insert_one(faculty_data)

    users_collection.insert_one({
        "role": "faculty",
        "username": data["employee_id"],
        "password": data["phone"],
        "name": data["name"],
        "college": data["college"]
    })

    return {
        "message": "Faculty Registered Successfully"
    }
@router.post("/login")
def login(data: dict):

    user = users_collection.find_one({
        "role": data["role"],
        "username": data["username"],
        "password": data["password"]
    })

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid Credentials"
        )

    return {
        "message": "Login Successful",
        "role": user["role"],
        "name": user["name"],
        "college": user["college"]
    }