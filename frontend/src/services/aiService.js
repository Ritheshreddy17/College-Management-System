import API from "./axios";

export const askAI = (message) =>
  API.post("/ai/chat", {
    message,
  });