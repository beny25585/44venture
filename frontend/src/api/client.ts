import axios from "axios";

const API_BASE_URL =
  (import.meta as any).env?.VITE_API_BASE_URL || "http://localhost:8000";

const client = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const apiError = error.response.data?.error;
      if (apiError) {
        return Promise.reject({
          code: apiError.code,
          message: apiError.message,
          details: apiError.details,
          status: error.response.status,
        });
      }
    }
    return Promise.reject(error);
  }
);

export default client;
