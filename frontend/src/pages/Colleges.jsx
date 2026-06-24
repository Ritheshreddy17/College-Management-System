import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import DataTable from "../components/DataTable";
import CollegeModal from "../components/CollegeModal";
import { FaPlus, FaSearch, FaUniversity } from "react-icons/fa";
import { getColleges, createCollege, updateCollege, deleteCollege } from "../services/collegeService";

function Colleges() {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editCollege, setEditCollege] = useState(null);

  useEffect(() => { fetchColleges(); }, []);

  async function fetchColleges() {
    try {
      const response = await getColleges();
      setColleges(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load colleges");
    } finally {
      setLoading(false);
    }
  }

  const columns = [
    { key: "name", label: "College Name" },
    { key: "code", label: "Code" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "address", label: "Address" },
  ];

  const filtered = colleges.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.code.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this college?")) return;
    try {
      await deleteCollege(id);
      fetchColleges();
    } catch { alert("Delete Failed"); }
  };

  const handleEdit = (college) => { setEditCollege(college); setOpen(true); };

  const handleSave = async (data) => {
    try {
      if (editCollege) {
        await updateCollege(editCollege._id, data);
      } else {
        await createCollege(data);
      }
      const acts = JSON.parse(localStorage.getItem("activities")) || [];
      acts.unshift({ message: `College ${data.name} ${editCollege ? "updated" : "added"}`, time: new Date().toLocaleString() });
      localStorage.setItem("activities", JSON.stringify(acts));
      fetchColleges();
      setEditCollege(null);
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
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <FaUniversity className="text-green-600" size={18} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Colleges</h1>
              <p className="text-sm text-slate-400">{filtered.length} total records</p>
            </div>
          </div>
          <button
            onClick={() => { setEditCollege(null); setOpen(true); }}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-200"
          >
            <FaPlus size={12} /> Add College
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={13} />
          <input
            type="text"
            placeholder="Search by name, code or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-5 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-sm"
          />
        </div>

        {/* Table */}
        <DataTable columns={columns} data={filtered} onEdit={handleEdit} onDelete={handleDelete} />

      </div>

      <CollegeModal isOpen={open} onClose={() => { setOpen(false); setEditCollege(null); }} onSave={handleSave} editCollege={editCollege} />
    </MainLayout>
  );
}

export default Colleges;