from fastapi import APIRouter
from bson import ObjectId

from app.config.database import colleges_collection
from app.schemas.college_schema import College

router = APIRouter(
    prefix="/colleges",
    tags=["Colleges"]
)


def serialize_college(college):
    return {
        "_id": str(college["_id"]),
        "name": college["name"],
        "code": college["code"],
        "email": college["email"],
        "phone": college["phone"],
        "address": college["address"]
    }


@router.get("/")
def get_colleges():
    colleges = colleges_collection.find()

    return [
        serialize_college(college)
        for college in colleges
    ]


@router.post("/")
def create_college(college: College):

    result = colleges_collection.insert_one(
        college.model_dump()
    )

    return {
        "message": "College Created Successfully",
        "id": str(result.inserted_id)
    }


@router.get("/{college_id}")
def get_college(college_id: str):

    college = colleges_collection.find_one(
        {"_id": ObjectId(college_id)}
    )

    if college:
        return serialize_college(college)

    return {
        "message": "College Not Found"
    }


@router.put("/{college_id}")
def update_college(
    college_id: str,
    college: College
):

    colleges_collection.update_one(
        {"_id": ObjectId(college_id)},
        {"$set": college.model_dump()}
    )

    return {
        "message": "College Updated Successfully"
    }


@router.delete("/{college_id}")
def delete_college(college_id: str):

    colleges_collection.delete_one(
        {"_id": ObjectId(college_id)}
    )

    return {
        "message": "College Deleted Successfully"
    }