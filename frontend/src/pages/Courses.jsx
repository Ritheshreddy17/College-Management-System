import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import DataTable from "../components/DataTable";
import CourseModal from "../components/CourseModal";
import { FaPlus, FaSearch, FaBook } from "react-icons/fa";
import { getCourses, createCourse, updateCourse, deleteCourse } from "../services/courseService";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editCourse, setEditCourse] = useState(null);
  const role = localStorage.getItem("role");

  useEffect(() => { fetchCourses(); }, []);

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
    { key: "name", label: "Course Name" },
    { key: "code", label: "Code" },
    { key: "duration", label: "Duration" },
    { key: "department", label: "Department" },
  ];

  const filtered = courses.filter((c) =>
    c.name?.toLowerCase().includes(search.toLowerCase()) ||
    c.code?.toLowerCase().includes(search.toLowerCase()) ||
    c.department?.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this course?")) return;
    try {
      await deleteCourse(id);
      fetchCourses();
    } catch { alert("Delete Failed"); }
  };

  const handleEdit = (course) => { setEditCourse(course); setOpen(true); };

  const handleSave = async (data) => {
    try {
      if (editCourse) {
        await updateCourse(editCourse._id, data);
      } else {
        await createCourse(data);
      }
      const acts = JSON.parse(localStorage.getItem("activities")) || [];
      acts.unshift({ message: `Course ${data.name} ${editCourse ? "updated" : "added"}`, time: new Date().toLocaleString() });
      localStorage.setItem("activities", JSON.stringify(acts));
      fetchCourses();
      setEditCourse(null);
      setOpen(false);
    } catch { alert("Save Failed"); }
  };

  if (loading) return <MainLayout><div className="flex items-center justify-center h-64 text-slate-400">Loading...</div></MainLayout>;

  return (
    <MainLayout>
      <div className="p-8 space-y-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
              <FaBook className="text-orange-600" size={18} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Courses</h1>
              <p className="text-sm text-slate-400">{filtered.length} total records</p>
            </div>
          </div>
          {role === "admin" && (
            <button
              onClick={() => { setEditCourse(null); setOpen(true); }}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-200"
            >
              <FaPlus size={12} /> Add Course
            </button>
          )}
        </div>

        {/* Search */}
        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={13} />
          <input
            type="text"
            placeholder="Search by name, code or department..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-5 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-sm"
          />
        </div>

        {/* Table */}
        <DataTable
          columns={columns}
          data={filtered}
          onEdit={role === "admin" ? handleEdit : null}
          onDelete={role === "admin" ? handleDelete : null}
        />

      </div>

      <CourseModal isOpen={open} onClose={() => { setOpen(false); setEditCourse(null); }} onSave={handleSave} editCourse={editCourse} />
    </MainLayout>
  );
}

export default Courses;