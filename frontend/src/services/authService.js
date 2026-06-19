import API from "./axios";

export const login = (credentials) =>
  API.post("/auth/login", credentials);

export const getProfile = () =>
  API.get("/auth/profile");