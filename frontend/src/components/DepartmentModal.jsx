/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";

const emptyForm = {
  name: "",
  code: "",
  hod: "",
  college: "",
};

function DepartmentModal({
  isOpen,
  onClose,
  onSave,
  editDepartment,
}) {
  const [formData, setFormData] =
    useState(emptyForm);

  useEffect(() => {
    if (editDepartment) {
      setFormData({
        name: editDepartment.name || "",
        code: editDepartment.code || "",
        hod: editDepartment.hod || "",
        college:
          editDepartment.college || "",
      });
    } else {
      setFormData(emptyForm);
    }
  }, [editDepartment]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg">

        <h2 className="text-2xl font-bold mb-4">
          {editDepartment
            ? "Edit Department"
            : "Add Department"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-3"
        >

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Department Name"
            className="border p-2 w-full"
            required
          />

          <input
            type="text"
            name="code"
            value={formData.code}
            onChange={handleChange}
            placeholder="Department Code"
            className="border p-2 w-full"
            required
          />

          <input
            type="text"
            name="hod"
            value={formData.hod}
            onChange={handleChange}
            placeholder="HOD Name"
            className="border p-2 w-full"
            required
          />

          <input
            type="text"
            name="college"
            value={formData.college}
            onChange={handleChange}
            placeholder="College"
            className="border p-2 w-full"
            required
          />

          <div className="flex justify-end gap-2">

            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              {editDepartment
                ? "Update"
                : "Save"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default DepartmentModal;