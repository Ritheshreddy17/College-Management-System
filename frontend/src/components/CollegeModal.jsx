/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";

const emptyForm = {
  name: "",
  code: "",
  email: "",
  phone: "",
  address: "",
};

function CollegeModal({
  isOpen,
  onClose,
  onSave,
  editCollege,
}) {
  const [formData, setFormData] =
    useState(emptyForm);

  useEffect(() => {
    if (editCollege) {
      setFormData({
        name: editCollege.name || "",
        code: editCollege.code || "",
        email: editCollege.email || "",
        phone: editCollege.phone || "",
        address: editCollege.address || "",
      });
    } else {
      setFormData(emptyForm);
    }
  }, [editCollege]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
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
          {editCollege ? "Edit College" : "Add College"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="College Name"
            className="border p-2 w-full"
            required
          />

          <input
            type="text"
            name="code"
            value={formData.code}
            onChange={handleChange}
            placeholder="Code"
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
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
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
              {editCollege ? "Update" : "Save"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default CollegeModal;