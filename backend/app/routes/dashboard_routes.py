from fastapi import APIRouter

from app.config.database import (
    students_collection,
    colleges_collection,
    departments_collection,
    courses_collection,
    faculty_collection,
)

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)

@router.get("/stats")
def get_dashboard_stats():
    return {
        "students": students_collection.count_documents({}),
        "colleges": colleges_collection.count_documents({}),
        "departments": departments_collection.count_documents({}),
        "courses": courses_collection.count_documents({}),
        "faculty": faculty_collection.count_documents({})
    }