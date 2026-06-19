from fastapi import APIRouter
from bson import ObjectId

from app.config.database import departments_collection
from app.schemas.department_schema import Department

router = APIRouter(
    prefix="/departments",
    tags=["Departments"]
)


def serialize_department(department):
    return {
        "_id": str(department["_id"]),
        "name": department["name"],
        "code": department["code"],
        "hod": department["hod"]
    }


@router.get("/")
def get_departments():

    departments = departments_collection.find()

    return [
        serialize_department(department)
        for department in departments
    ]


@router.post("/")
def create_department(
    department: Department
):

    result = departments_collection.insert_one(
        department.model_dump()
    )

    return {
        "message": "Department Created Successfully",
        "id": str(result.inserted_id)
    }


@router.get("/{department_id}")
def get_department(
    department_id: str
):

    department = departments_collection.find_one(
        {"_id": ObjectId(department_id)}
    )

    if department:
        return serialize_department(department)

    return {
        "message": "Department Not Found"
    }


@router.put("/{department_id}")
def update_department(
    department_id: str,
    department: Department
):

    departments_collection.update_one(
        {"_id": ObjectId(department_id)},
        {"$set": department.model_dump()}
    )

    return {
        "message": "Department Updated Successfully"
    }


@router.delete("/{department_id}")
def delete_department(
    department_id: str
):

    departments_collection.delete_one(
        {"_id": ObjectId(department_id)}
    )

    return {
        "message": "Department Deleted Successfully"
    }