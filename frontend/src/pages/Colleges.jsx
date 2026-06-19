import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import DataTable from "../components/DataTable";
import CollegeModal from "../components/CollegeModal";

import {
  getColleges,
  createCollege,
  updateCollege,
  deleteCollege,
} from "../services/collegeService";

function Colleges() {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editCollege, setEditCollege] = useState(null);

  useEffect(() => {
    fetchColleges();
  }, []);

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

  const filteredColleges = colleges.filter(
    (college) =>
      college.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      college.code
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      college.email
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this college?"
    );

    if (!confirmDelete) return;

    try {
      await deleteCollege(id);

      alert("College Deleted");

      fetchColleges();
    } catch (error) {
      console.error(error);
      alert("Delete Failed");
    }
  };

  const handleEdit = (college) => {
    setEditCollege(college);
    setOpen(true);
  };

  const handleSave = async (collegeData) => {
    try {
      if (editCollege) {
        await updateCollege(
          editCollege._id,
          collegeData
        );
      } else {
        await createCollege(collegeData);
      }

      fetchColleges();

      setEditCollege(null);
      setOpen(false);

      alert("College Saved");
    } catch (error) {
      console.error(error);
      alert("Save Failed");
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="text-center mt-10 text-xl">
          Loading Colleges...
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Colleges Management
        </h1>

        <button
          onClick={() => {
            setEditCollege(null);
            setOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add College
        </button>
      </div>

      <div className="bg-white p-4 rounded shadow mb-5">
        <input
          type="text"
          placeholder="Search College..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full border p-3 rounded"
        />
      </div>

      <DataTable
        columns={columns}
        data={filteredColleges}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <div className="mt-4 font-medium">
        Total Colleges:
        {" "}
        {filteredColleges.length}
      </div>

      <CollegeModal
        isOpen={open}
        onClose={() => {
          setOpen(false);
          setEditCollege(null);
        }}
        onSave={handleSave}
        editCollege={editCollege}
      />
    </MainLayout>
  );
}

export default Colleges;