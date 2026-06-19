/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";

const emptyForm = {
  name: "",
  code: "",
  duration: "",
  department: "",
};

function CourseModal({
  isOpen,
  onClose,
  onSave,
  editCourse,
}) {
  const [formData, setFormData] =
    useState(emptyForm);

  useEffect(() => {
    if (editCourse) {
      setFormData({
        name: editCourse.name || "",
        code: editCourse.code || "",
        duration:
          editCourse.duration || "",
        department:
          editCourse.department || "",
      });
    } else {
      setFormData(emptyForm);
    }
  }, [editCourse]);

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
          {editCourse
            ? "Edit Course"
            : "Add Course"}
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
            placeholder="Course Name"
            className="border p-2 w-full"
            required
          />

          <input
            type="text"
            name="code"
            value={formData.code}
            onChange={handleChange}
            placeholder="Course Code"
            className="border p-2 w-full"
            required
          />

          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="Duration"
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
              {editCourse
                ? "Update"
                : "Save"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default CourseModal;