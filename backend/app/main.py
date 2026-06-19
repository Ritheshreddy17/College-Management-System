from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.college_routes import router as college_router
from app.routes.student_routes import router as student_router
from app.routes.department_routes import router as department_router
from app.routes.course_routes import router as course_router
from app.routes.faculty_routes import router as faculty_router
from app.routes.dashboard_routes import router as dashboard_router
app = FastAPI(
    title="College Management API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(student_router)
app.include_router(college_router)
app.include_router(department_router)
app.include_router(course_router)
app.include_router(faculty_router)
app.include_router(dashboard_router)
@app.get("/")
def home():
    return {
        "message": "College Management API Running"
    }