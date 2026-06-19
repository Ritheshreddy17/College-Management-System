from fastapi import APIRouter
from bson import ObjectId

from app.config.database import courses_collection
from app.schemas.course_schema import Course

router = APIRouter(
    prefix="/courses",
    tags=["Courses"]
)


def serialize_course(course):
    return {
        "_id": str(course["_id"]),
        "name": course["name"],
        "code": course["code"],
        "duration": course["duration"],
        "department": course["department"]
    }


@router.get("/")
def get_courses():

    courses = courses_collection.find()

    return [
        serialize_course(course)
        for course in courses
    ]


@router.post("/")
def create_course(course: Course):

    result = courses_collection.insert_one(
        course.model_dump()
    )

    return {
        "message": "Course Created Successfully",
        "id": str(result.inserted_id)
    }


@router.get("/{course_id}")
def get_course(course_id: str):

    course = courses_collection.find_one(
        {"_id": ObjectId(course_id)}
    )

    if course:
        return serialize_course(course)

    return {
        "message": "Course Not Found"
    }


@router.put("/{course_id}")
def update_course(
    course_id: str,
    course: Course
):

    courses_collection.update_one(
        {"_id": ObjectId(course_id)},
        {"$set": course.model_dump()}
    )

    return {
        "message": "Course Updated Successfully"
    }


@router.delete("/{course_id}")
def delete_course(course_id: str):

    courses_collection.delete_one(
        {"_id": ObjectId(course_id)}
    )

    return {
        "message": "Course Deleted Successfully"
    }