/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";

const emptyForm = {
  name: "",
  usn: "",
  email: "",
  phone: "",
  college: "",
  department: "",
  course: "",
};

function StudentModal({
  isOpen,
  onClose,
  onSave,
  editStudent,
}) {
  const [formData, setFormData] =
    useState(emptyForm);

  useEffect(() => {
    if (editStudent) {
      setFormData({
  name: editStudent.name || "",
  usn: editStudent.usn || "",
  email: editStudent.email || "",
  phone: editStudent.phone || "",
  college:
    editStudent.college || "",
  department:
    editStudent.department || "",
  course:
    editStudent.course || "",
});
    } else {
      setFormData(emptyForm);
    }
  }, [editStudent]);

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

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-5">
          {editStudent
            ? "Edit Student"
            : "Add Student"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">

            <input
              type="text"
              name="name"
              placeholder="Student Name"
              value={formData.name}
              onChange={handleChange}
              className="border p-3 rounded"
              required
            />

            <input
              type="text"
              name="usn"
              placeholder="USN"
              value={formData.usn}
              onChange={handleChange}
              className="border p-3 rounded"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="border p-3 rounded"
              required
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="border p-3 rounded"
              required
            />
            <input
  type="text"
  name="college"
  placeholder="College"
  value={formData.college}
  onChange={handleChange}
  className="border p-3 rounded"
  required
/>
            <input
              type="text"
              name="department"
              placeholder="Department"
              value={formData.department}
              onChange={handleChange}
              className="border p-3 rounded"
              required
            />

            <input
              type="text"
              name="course"
              placeholder="Course"
              value={formData.course}
              onChange={handleChange}
              className="border p-3 rounded"
              required
            />

          </div>

          <div className="flex justify-end gap-3 mt-6">

            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {editStudent
                ? "Update"
                : "Save"}
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}

export default StudentModal;