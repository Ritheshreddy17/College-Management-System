import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import DataTable from "../components/DataTable";
import DepartmentModal from "../components/DepartmentModal";

import {
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from "../services/departmentService";

function Departments() {
  const [departments, setDepartments] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [open, setOpen] =
    useState(false);

  const [editDepartment, setEditDepartment] =
    useState(null);

  useEffect(() => {
    fetchDepartments();
  }, []);

  async function fetchDepartments() {
    try {
      const response =
        await getDepartments();

      setDepartments(response.data);
    } catch (error) {
      console.error(error);
      alert(
        "Failed to load departments"
      );
    } finally {
      setLoading(false);
    }
  }

  const columns = [
    {
      key: "name",
      label: "Department Name",
    },
    {
      key: "code",
      label: "Code",
    },
    {
      key: "hod",
      label: "HOD",
    },
  ];

  const filteredDepartments =
    departments.filter(
      (department) =>
        department.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        department.code
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        department.hod
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  const handleDelete = async (
    id
  ) => {
    const confirmDelete =
      window.confirm(
        "Delete this department?"
      );

    if (!confirmDelete) return;

    try {
      await deleteDepartment(id);

      alert(
        "Department Deleted"
      );

      fetchDepartments();
    } catch (error) {
      console.error(error);
      alert("Delete Failed");
    }
  };

  const handleEdit = (
    department
  ) => {
    setEditDepartment(
      department
    );
    setOpen(true);
  };

  const handleSave = async (
    departmentData
  ) => {
    try {
      if (editDepartment) {
        await updateDepartment(
          editDepartment._id,
          departmentData
        );
      } else {
        await createDepartment(
          departmentData
        );
      }

      fetchDepartments();

      setEditDepartment(null);
      setOpen(false);

      alert(
        "Department Saved"
      );
    } catch (error) {
      console.error(error);
      alert("Save Failed");
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="text-center mt-10 text-xl">
          Loading Departments...
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Departments Management
        </h1>

        <button
          onClick={() => {
            setEditDepartment(
              null
            );
            setOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Department
        </button>
      </div>

      <div className="bg-white p-4 rounded shadow mb-5">
        <input
          type="text"
          placeholder="Search Department..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="w-full border p-3 rounded"
        />
      </div>

      <DataTable
        columns={columns}
        data={
          filteredDepartments
        }
        onEdit={handleEdit}
        onDelete={
          handleDelete
        }
      />

      <div className="mt-4 font-medium">
        Total Departments:
        {" "}
        {
          filteredDepartments.length
        }
      </div>

      <DepartmentModal
        isOpen={open}
        onClose={() => {
          setOpen(false);
          setEditDepartment(
            null
          );
        }}
        onSave={handleSave}
        editDepartment={
          editDepartment
        }
      />
    </MainLayout>
  );
}

export default Departments;