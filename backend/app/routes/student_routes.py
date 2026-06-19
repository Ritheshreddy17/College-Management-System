from fastapi import APIRouter
from bson import ObjectId

from app.config.database import students_collection
from app.schemas.student_schema import Student

router = APIRouter(
    prefix="/students",
    tags=["Students"]
)


def serialize_student(student):
    return {
        "_id": str(student["_id"]),
        "name": student["name"],
        "usn": student["usn"],
        "email": student["email"],
        "phone": student["phone"],
        "department": student["department"],
        "course": student["course"],
    }


# GET ALL STUDENTS
@router.get("/")
def get_students():
    students = students_collection.find()

    return [
        serialize_student(student)
        for student in students
    ]


# CREATE STUDENT
@router.post("/")
def create_student(student: Student):

    new_student = student.dict()

    result = students_collection.insert_one(
        new_student
    )

    return {
        "message": "Student Created Successfully",
        "id": str(result.inserted_id)
    }


# GET SINGLE STUDENT
@router.get("/{student_id}")
def get_student(student_id: str):

    student = students_collection.find_one(
        {"_id": ObjectId(student_id)}
    )

    if student:
        return serialize_student(student)

    return {
        "message": "Student Not Found"
    }


# UPDATE STUDENT
@router.put("/{student_id}")
def update_student(
    student_id: str,
    student: Student
):

    students_collection.update_one(
        {"_id": ObjectId(student_id)},
        {"$set": student.dict()}
    )

    return {
        "message": "Student Updated Successfully"
    }


# DELETE STUDENT
@router.delete("/{student_id}")
def delete_student(student_id: str):

    students_collection.delete_one(
        {"_id": ObjectId(student_id)}
    )

    return {
        "message": "Student Deleted Successfully"
    }