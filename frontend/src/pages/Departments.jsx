import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import DataTable from "../components/DataTable";
import DepartmentModal from "../components/DepartmentModal";
import { FaPlus, FaSearch, FaBuilding } from "react-icons/fa";
import { getDepartments, createDepartment, updateDepartment, deleteDepartment } from "../services/departmentService";

function Departments() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editDepartment, setEditDepartment] = useState(null);

  useEffect(() => { fetchDepartments(); }, []);

  async function fetchDepartments() {
    try {
      const response = await getDepartments();
      setDepartments(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load departments");
    } finally {
      setLoading(false);
    }
  }

  const columns = [
    { key: "name", label: "Department Name" },
    { key: "code", label: "Code" },
    { key: "hod", label: "HOD" },
  ];

  const filtered = departments.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.code.toLowerCase().includes(search.toLowerCase()) ||
    d.hod.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this department?")) return;
    try {
      await deleteDepartment(id);
      fetchDepartments();
    } catch { alert("Delete Failed"); }
  };

  const handleEdit = (dept) => { setEditDepartment(dept); setOpen(true); };

  const handleSave = async (data) => {
    try {
      if (editDepartment) {
        await updateDepartment(editDepartment._id, data);
      } else {
        await createDepartment(data);
      }
      const acts = JSON.parse(localStorage.getItem("activities")) || [];
      acts.unshift({ message: `Department ${data.name} ${editDepartment ? "updated" : "added"}`, time: new Date().toLocaleString() });
      localStorage.setItem("activities", JSON.stringify(acts));
      fetchDepartments();
      setEditDepartment(null);
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
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <FaBuilding className="text-purple-600" size={18} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Departments</h1>
              <p className="text-sm text-slate-400">{filtered.length} total records</p>
            </div>
          </div>
          <button
            onClick={() => { setEditDepartment(null); setOpen(true); }}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-200"
          >
            <FaPlus size={12} /> Add Department
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={13} />
          <input
            type="text"
            placeholder="Search by name, code or HOD..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-5 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-sm"
          />
        </div>

        {/* Table */}
        <DataTable columns={columns} data={filtered} onEdit={handleEdit} onDelete={handleDelete} />

      </div>

      <DepartmentModal isOpen={open} onClose={() => { setOpen(false); setEditDepartment(null); }} onSave={handleSave} editDepartment={editDepartment} />
    </MainLayout>
  );
}

export default Departments;