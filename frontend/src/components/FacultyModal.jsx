/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";

const emptyForm = {
  faculty_id: "",
  name: "",
  email: "",
  phone: "",
  department: "",
  designation: "",
};

function FacultyModal({
  isOpen,
  onClose,
  onSave,
  editFaculty,
}) {
  const [formData, setFormData] =
    useState(emptyForm);

  useEffect(() => {
    if (editFaculty) {
      setFormData({
        faculty_id:
          editFaculty.faculty_id || "",
        name:
          editFaculty.name || "",
        email:
          editFaculty.email || "",
        phone:
          editFaculty.phone || "",
        department:
          editFaculty.department || "",
        designation:
          editFaculty.designation || "",
      });
    } else {
      setFormData(emptyForm);
    }
  }, [editFaculty]);

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
          {editFaculty
            ? "Edit Faculty"
            : "Add Faculty"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-3"
        >

          <input
            type="text"
            name="faculty_id"
            value={formData.faculty_id}
            onChange={handleChange}
            placeholder="Faculty ID"
            className="border p-2 w-full"
            required
          />

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Faculty Name"
            className="border p-2 w-full"
            required
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="border p-2 w-full"
            required
          />

          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="border p-2 w-full"
            required
          />

          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            placeholder="Department"
            className="border p-2 w-full"
            required
          />

          <input
            type="text"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            placeholder="Designation"
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
              {editFaculty
                ? "Update"
                : "Save"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default FacultyModal;