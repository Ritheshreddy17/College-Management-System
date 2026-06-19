import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import DataTable from "../components/DataTable";
import CourseModal from "../components/CourseModal";

import {
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../services/courseService";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editCourse, setEditCourse] = useState(null);

  const role = localStorage.getItem("role");

  useEffect(() => {
    fetchCourses();
  }, []);

  async function fetchCourses() {
    try {
      const response = await getCourses();
      setCourses(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load courses");
    } finally {
      setLoading(false);
    }
  }

  const columns = [
    {
      key: "name",
      label: "Course Name",
    },
    {
      key: "code",
      label: "Code",
    },
    {
      key: "duration",
      label: "Duration",
    },
    {
      key: "department",
      label: "Department",
    },
  ];

  const filteredCourses = courses.filter(
    (course) =>
      course.name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      course.code
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      course.department
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this course?"
    );

    if (!confirmDelete) return;

    try {
      await deleteCourse(id);

      alert("Course Deleted");

      fetchCourses();
    } catch (error) {
      console.error(error);
      alert("Delete Failed");
    }
  };

  const handleEdit = (course) => {
    setEditCourse(course);
    setOpen(true);
  };

  const handleSave = async (courseData) => {
    try {
      if (editCourse) {
        await updateCourse(
          editCourse._id,
          courseData
        );
      } else {
        await createCourse(courseData);
      }

      fetchCourses();

      setEditCourse(null);
      setOpen(false);

      alert("Course Saved");
    } catch (error) {
      console.error(error);
      alert("Save Failed");
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="text-center mt-10 text-xl">
          Loading Courses...
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Courses Management
        </h1>

        {role === "admin" && (
  <button
    onClick={() => {
      setEditCourse(null);
      setOpen(true);
    }}
    className="bg-blue-600 text-white px-4 py-2 rounded"
  >
    Add Course
  </button>
)}
      </div>

      <div className="bg-white p-4 rounded shadow mb-5">
        <input
          type="text"
          placeholder="Search Course..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full border p-3 rounded"
        />
      </div>

      <DataTable
  columns={columns}
  data={filteredCourses}
  onEdit={
    role === "admin"
      ? handleEdit
      : null
  }
  onDelete={
    role === "admin"
      ? handleDelete
      : null
  }
/>

      <div className="mt-4 font-medium">
        Total Courses: {filteredCourses.length}
      </div>

      <CourseModal
        isOpen={open}
        onClose={() => {
          setOpen(false);
          setEditCourse(null);
        }}
        onSave={handleSave}
        editCourse={editCourse}
      />
    </MainLayout>
  );
}

export default Courses;