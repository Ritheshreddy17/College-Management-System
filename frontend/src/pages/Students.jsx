import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import StudentModal from "../components/StudentModal";

import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../services/studentService";
import { exportStudentsToExcel } from "../utils/exportStudents";
function Students() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editStudent, setEditStudent] = useState(null);

  const role = localStorage.getItem("role");

  useEffect(() => {
    async function fetchStudents() {
      try {
        const response = await getStudents();
        setStudents(response.data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStudents();
  }, []);

  async function loadStudents() {
    try {
      const response = await getStudents();
      setStudents(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const filteredStudents = students.filter((student) => {
    const searchText = search.toLowerCase();

    return (
      student.name?.toLowerCase().includes(searchText) ||
      student.usn?.toLowerCase().includes(searchText) ||
      student.email?.toLowerCase().includes(searchText) ||
      student.department?.toLowerCase().includes(searchText) ||
      student.college?.toLowerCase().includes(searchText)
    );
  });

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) return;

    try {
      await deleteStudent(id);
      await loadStudents();
      alert("Student Deleted Successfully");
    } catch (error) {
      console.error(error);
      alert("Delete Failed");
    }
  };

  const handleSaveStudent = async (studentData) => {
    try {
      if (editStudent) {
        await updateStudent(
          editStudent._id,
          studentData
        );
      } else {
        await createStudent(studentData);
      }

      await loadStudents();

      setEditStudent(null);
      setIsModalOpen(false);

      alert("Student Saved Successfully");
    } catch (error) {
      console.error(error);
      alert("Save Failed");
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="text-center mt-10 text-xl">
          Loading Students...
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Students Management
        </h1>

        \<div className="flex gap-3">

  <button
    onClick={() =>
      exportStudentsToExcel(filteredStudents)
    }
    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
  >
    Export Excel
  </button>

  {role === "admin" && (
    <button
      onClick={() => {
        setEditStudent(null);
        setIsModalOpen(true);
      }}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      Add Student
    </button>
  )}

</div>
      </div>

      <div className="bg-white p-4 rounded shadow mb-5">
        <input
          type="text"
          placeholder="Search Students..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full border p-3 rounded"
        />
      </div>

      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="p-3">USN</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">College</th>
              <th className="p-3">Department</th>
              <th className="p-3">Course</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <tr
                  key={student._id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-3">{student.usn}</td>
                  <td className="p-3">{student.name}</td>
                  <td className="p-3">{student.email}</td>
                  <td className="p-3">{student.phone}</td>
                  <td className="p-3">
                    {student.college}
                  </td>
                  <td className="p-3">
                    {student.department}
                  </td>
                  <td className="p-3">
                    {student.course}
                  </td>

                  <td className="p-3">
                    {role === "admin" && (
                      <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => {
                          setEditStudent(student);
                          setIsModalOpen(true);
                        }}
                        className="bg-yellow-500 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(student._id)
                        }
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="text-center p-5"
                >
                  No Students Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 font-medium">
        Total Students: {filteredStudents.length}
      </div>

      <StudentModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditStudent(null);
        }}
        onSave={handleSaveStudent}
        editStudent={editStudent}
      />
    </MainLayout>
  );
}

export default Students;