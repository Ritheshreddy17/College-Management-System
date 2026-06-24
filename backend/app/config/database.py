from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
DATABASE_NAME = os.getenv("DATABASE_NAME")

print("MONGO_URI =", MONGO_URI)
print("DATABASE_NAME =", DATABASE_NAME)

if not MONGO_URI:
    raise Exception("MONGO_URI not found in .env")

if not DATABASE_NAME:
    raise Exception("DATABASE_NAME not found in .env")

client = MongoClient(MONGO_URI)

db = client[DATABASE_NAME]

students_collection = db["students"]
colleges_collection = db["colleges"]
departments_collection = db["departments"]
courses_collection = db["courses"]
faculty_collection = db["faculty"]
admins_collection = db["admins"]
users_collection = db["users"]