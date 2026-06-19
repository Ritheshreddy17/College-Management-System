from fastapi import APIRouter
from bson import ObjectId

from app.config.database import faculty_collection
from app.schemas.faculty_schema import Faculty

router = APIRouter(
    prefix="/faculty",
    tags=["Faculty"]
)


def serialize_faculty(faculty):
    return {
        "_id": str(faculty["_id"]),
        "name": faculty["name"],
        "email": faculty["email"],
        "phone": faculty["phone"],
        "department": faculty["department"],
        "designation": faculty["designation"]
    }


@router.get("/")
def get_faculty():

    faculty_members = faculty_collection.find()

    return [
        serialize_faculty(member)
        for member in faculty_members
    ]


@router.post("/")
def create_faculty(faculty: Faculty):

    result = faculty_collection.insert_one(
        faculty.model_dump()
    )

    return {
        "message": "Faculty Created Successfully",
        "id": str(result.inserted_id)
    }


@router.get("/{faculty_id}")
def get_faculty_by_id(faculty_id: str):

    faculty = faculty_collection.find_one(
        {"_id": ObjectId(faculty_id)}
    )

    if faculty:
        return serialize_faculty(faculty)

    return {
        "message": "Faculty Not Found"
    }


@router.put("/{faculty_id}")
def update_faculty(
    faculty_id: str,
    faculty: Faculty
):

    faculty_collection.update_one(
        {"_id": ObjectId(faculty_id)},
        {"$set": faculty.model_dump()}
    )

    return {
        "message": "Faculty Updated Successfully"
    }


@router.delete("/{faculty_id}")
def delete_faculty(faculty_id: str):

    faculty_collection.delete_one(
        {"_id": ObjectId(faculty_id)}
    )

    return {
        "message": "Faculty Deleted Successfully"
    }