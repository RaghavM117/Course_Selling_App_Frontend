import axios from "axios";

const api = axios.create({
    baseURL: "/", // Vite proxy forwards /admin and /user to localhost:5000
    headers: { "Content-Type": "application/json" },
});

// Attach JWT token from localStorage on every request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Normalise error messages so components just read error.message
api.interceptors.response.use(
    (res) => res,
    (err) => {
        const data = err.response?.data;
        const message =
            data?.error?.message ||
            data?.message ||
            err.message ||
            "Something went wrong";
        return Promise.reject(new Error(message));
    },
);

export default api;
