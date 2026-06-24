import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import FacultyModal from "../components/FacultyModal";
import { FaPlus, FaSearch, FaChalkboardTeacher, FaEdit, FaTrash } from "react-icons/fa";
import { getFaculty, createFaculty, updateFaculty, deleteFaculty } from "../services/facultyService";

function Faculty() {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editFaculty, setEditFaculty] = useState(null);

  useEffect(() => { fetchFaculty(); }, []);

  async function fetchFaculty() {
    try {
      const response = await getFaculty();
      setFaculty(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load faculty");
    } finally {
      setLoading(false);
    }
  }

  const filtered = faculty.filter((m) => {
    const q = search.toLowerCase();
    return (
      m.name?.toLowerCase().includes(q) ||
      m.email?.toLowerCase().includes(q) ||
      m.department?.toLowerCase().includes(q) ||
      m.designation?.toLowerCase().includes(q)
    );
  });

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this faculty member?")) return;
    try {
      await deleteFaculty(id);
      fetchFaculty();
    } catch { alert("Delete Failed"); }
  };

  const handleSave = async (data) => {
    try {
      if (editFaculty) {
        await updateFaculty(editFaculty._id, data);
      } else {
        await createFaculty(data);
      }
      const acts = JSON.parse(localStorage.getItem("activities")) || [];
      acts.unshift({ message: `Faculty ${data.name} ${editFaculty ? "updated" : "added"}`, time: new Date().toLocaleString() });
      localStorage.setItem("activities", JSON.stringify(acts));
      fetchFaculty();
      setEditFaculty(null);
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
            <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
              <FaChalkboardTeacher className="text-red-600" size={18} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Faculty</h1>
              <p className="text-sm text-slate-400">{filtered.length} total records</p>
            </div>
          </div>
          <button
            onClick={() => { setEditFaculty(null); setIsModalOpen(true); }}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-200"
          >
            <FaPlus size={12} /> Add Faculty
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={13} />
          <input
            type="text"
            placeholder="Search by name, email, department or designation..."
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
                  {["Name","Email","Phone","Department","Designation"].map((h) => (
                    <th key={h} className="px-5 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">{h}</th>
                  ))}
                  <th className="px-5 py-4 text-right text-xs font-bold text-slate-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.length > 0 ? filtered.map((m, i) => (
                  <tr key={m._id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-4 text-sm text-slate-400">{i + 1}</td>
                    <td className="px-5 py-4 text-sm font-medium text-slate-700">{m.name}</td>
                    <td className="px-5 py-4 text-sm text-slate-500">{m.email}</td>
                    <td className="px-5 py-4 text-sm text-slate-500">{m.phone}</td>
                    <td className="px-5 py-4 text-sm text-slate-500">
                      <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-medium">{m.department}</span>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-500">{m.designation}</td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => { setEditFaculty(m); setIsModalOpen(true); }} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                          <FaEdit size={11} /> Edit
                        </button>
                        <button onClick={() => handleDelete(m._id)} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors">
                          <FaTrash size={11} /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={7} className="text-center py-16 text-slate-400 text-sm">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                          <span className="text-2xl">📭</span>
                        </div>
                        No faculty found
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      <FacultyModal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setEditFaculty(null); }} onSave={handleSave} editFaculty={editFaculty} />
    </MainLayout>
  );
}

export default Faculty;