import API from "./axios";

export const getColleges = () =>
  API.get("/colleges/");

export const createCollege = (data) =>
  API.post("/colleges/", data);

export const updateCollege = (
  id,
  data
) =>
  API.put(
    `/colleges/${id}`,
    data
  );

export const deleteCollege = (
  id
) =>
  API.delete(
    `/colleges/${id}`
  );