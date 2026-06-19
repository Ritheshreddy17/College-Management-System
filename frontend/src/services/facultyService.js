import API from "./axios";

export const getFaculty = () =>
  API.get("/faculty/");

export const createFaculty = (data) =>
  API.post("/faculty/", data);

export const updateFaculty = (id, data) =>
  API.put(`/faculty/${id}`, data);

export const deleteFaculty = (id) =>
  API.delete(`/faculty/${id}`);