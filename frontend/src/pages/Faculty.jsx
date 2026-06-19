import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import FacultyModal from "../components/FacultyModal";

import {
  getFaculty,
  createFaculty,
  updateFaculty,
  deleteFaculty,
} from "../services/facultyService";

function Faculty() {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [editFaculty, setEditFaculty] =
    useState(null);

  useEffect(() => {
    fetchFaculty();
  }, []);

  async function fetchFaculty() {
    try {
      const response =
        await getFaculty();

      setFaculty(response.data);
    } catch (error) {
      console.error(error);
      alert(
        "Failed to load faculty"
      );
    } finally {
      setLoading(false);
    }
  }

  const filteredFaculty =
    faculty.filter((member) => {
      const text =
        search.toLowerCase();

      return (
        member.name
          ?.toLowerCase()
          .includes(text) ||
        member.email
          ?.toLowerCase()
          .includes(text) ||
        member.department
          ?.toLowerCase()
          .includes(text) ||
        member.designation
          ?.toLowerCase()
          .includes(text)
      );
    });

  const handleDelete = async (
    id
  ) => {
    const confirmDelete =
      window.confirm(
        "Delete this faculty?"
      );

    if (!confirmDelete) return;

    try {
      await deleteFaculty(id);

      fetchFaculty();

      alert(
        "Faculty Deleted"
      );
    } catch (error) {
      console.error(error);
      alert(
        "Delete Failed"
      );
    }
  };

  const handleSave = async (
    facultyData
  ) => {
    try {
      if (editFaculty) {
        await updateFaculty(
          editFaculty._id,
          facultyData
        );
      } else {
        await createFaculty(
          facultyData
        );
      }

      fetchFaculty();

      setEditFaculty(null);
      setIsModalOpen(false);

      alert(
        "Faculty Saved"
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
          Loading Faculty...
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Faculty Management
        </h1>

        <button
          onClick={() => {
            setEditFaculty(null);
            setIsModalOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Faculty
        </button>
      </div>

      <div className="bg-white p-4 rounded shadow mb-5">
        <input
          type="text"
          placeholder="Search Faculty..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="w-full border p-3 rounded"
        />
      </div>

      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="p-3 text-left">
                Name
              </th>

              <th className="p-3 text-left">
                Email
              </th>

              <th className="p-3 text-left">
                Phone
              </th>

              <th className="p-3 text-left">
                Department
              </th>

              <th className="p-3 text-left">
                Designation
              </th>

              <th className="p-3 text-center">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredFaculty.length >
            0 ? (
              filteredFaculty.map(
                (member) => (
                  <tr
                    key={
                      member._id
                    }
                    className="border-b"
                  >
                    <td className="p-3">
                      {
                        member.name
                      }
                    </td>

                    <td className="p-3">
                      {
                        member.email
                      }
                    </td>

                    <td className="p-3">
                      {
                        member.phone
                      }
                    </td>

                    <td className="p-3">
                      {
                        member.department
                      }
                    </td>

                    <td className="p-3">
                      {
                        member.designation
                      }
                    </td>

                    <td className="p-3">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => {
                            setEditFaculty(
                              member
                            );
                            setIsModalOpen(
                              true
                            );
                          }}
                          className="bg-yellow-500 text-white px-3 py-1 rounded"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(
                              member._id
                            )
                          }
                          className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              )
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center p-6"
                >
                  No Faculty Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 font-medium">
        Total Faculty:
        {" "}
        {
          filteredFaculty.length
        }
      </div>

      <FacultyModal
        isOpen={
          isModalOpen
        }
        onClose={() => {
          setIsModalOpen(
            false
          );
          setEditFaculty(
            null
          );
        }}
        onSave={handleSave}
        editFaculty={
          editFaculty
        }
      />
    </MainLayout>
  );
}

export default Faculty;