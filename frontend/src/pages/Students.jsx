import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import StudentModal from "../components/StudentModal";
import { FaPlus, FaSearch, FaUserGraduate, FaFileExcel, FaEdit, FaTrash } from "react-icons/fa";
import { getStudents, createStudent, updateStudent, deleteStudent } from "../services/studentService";
import { exportStudentsToExcel } from "../utils/exportStudents";

function Students() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editStudent, setEditStudent] = useState(null);
  const role = localStorage.getItem("role");

  useEffect(() => { fetchStudents(); }, []);

  async function fetchStudents() {
    try {
      const response = await getStudents();
      setStudents(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const filtered = students.filter((s) => {
    const q = search.toLowerCase();
    return (
      s.name?.toLowerCase().includes(q) ||
      s.usn?.toLowerCase().includes(q) ||
      s.email?.toLowerCase().includes(q) ||
      s.department?.toLowerCase().includes(q) ||
      s.college?.toLowerCase().includes(q)
    );
  });

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this student?")) return;
    try {
      await deleteStudent(id);
      await fetchStudents();
    } catch { alert("Delete Failed"); }
  };

  const handleSave = async (data) => {
    try {
      if (editStudent) {
        await updateStudent(editStudent._id, data);
      } else {
        await createStudent(data);
      }
      const acts = JSON.parse(localStorage.getItem("activities")) || [];
      acts.unshift({ message: `Student ${data.name} ${editStudent ? "updated" : "added"}`, time: new Date().toLocaleString() });
      localStorage.setItem("activities", JSON.stringify(acts));
      await fetchStudents();
      setEditStudent(null);
      setIsModalOpen(false);
    } catch { alert("Save Failed"); }
  };

  if (loading) return <MainLayout><div className="flex items-center justify-center h-64 text-slate-400">Loading...</div></MainLayout>;

  return (
    <MainLayout>
      <div className="p-8 space-y-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <FaUserGraduate className="text-blue-600" size={18} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Students</h1>
              <p className="text-sm text-slate-400">{filtered.length} total records</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => exportStudentsToExcel(filtered)}
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-200"
            >
              <FaFileExcel size={13} /> Export Excel
            </button>
            {role === "admin" && (
              <button
                onClick={() => { setEditStudent(null); setIsModalOpen(true); }}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-200"
              >
                <FaPlus size={12} /> Add Student
              </button>
            )}
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={13} />
          <input
            type="text"
            placeholder="Search by name, USN, email, college or department..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-5 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-sm"
          />
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-5 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">#</th>
                  {["USN","Name","Email","Phone","College","Department","Course"].map((h) => (
                    <th key={h} className="px-5 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">{h}</th>
                  ))}
                  {role === "admin" && <th className="px-5 py-4 text-right text-xs font-bold text-slate-400 uppercase tracking-wider">Actions</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.length > 0 ? filtered.map((s, i) => (
                  <tr key={s._id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-4 text-sm text-slate-400">{i + 1}</td>
                    <td className="px-5 py-4 text-sm font-medium text-slate-700">{s.usn}</td>
                    <td className="px-5 py-4 text-sm text-slate-700">{s.name}</td>
                    <td className="px-5 py-4 text-sm text-slate-500">{s.email}</td>
                    <td className="px-5 py-4 text-sm text-slate-500">{s.phone}</td>
                    <td className="px-5 py-4 text-sm text-slate-500">{s.college}</td>
                    <td className="px-5 py-4 text-sm text-slate-500">{s.department}</td>
                    <td className="px-5 py-4 text-sm text-slate-500">{s.course}</td>
                    {role === "admin" && (
                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => { setEditStudent(s); setIsModalOpen(true); }} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                            <FaEdit size={11} /> Edit
                          </button>
                          <button onClick={() => handleDelete(s._id)} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors">
                            <FaTrash size={11} /> Delete
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={role === "admin" ? 9 : 8} className="text-center py-16 text-slate-400 text-sm">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                          <span className="text-2xl">📭</span>
                        </div>
                        No students found
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      <StudentModal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setEditStudent(null); }} onSave={handleSave} editStudent={editStudent} />
    </MainLayout>
  );
}

export default Students;