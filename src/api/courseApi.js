import api from "./axiosInstance";

// ─── AUTH ─────────────────────────────────────────────────────────────────────
export const adminSignup = (data) => api.post("/admin/signup", data);
export const adminSignin = (data) => api.post("/admin/signin", data);
export const adminChangePassword = (data) =>
    api.patch("/admin/changePassword", {
        currentPassword: data.oldPassword,
        newPassword: data.newPassword,
    });

export const userSignup = (data) => api.post("/user/signup", data);
export const userSignin = (data) => api.post("/user/signin", data);
export const userChangePassword = (data) =>
    api.patch("/user/changePassword", {
        currentPassword: data.oldPassword,
        newPassword: data.newPassword,
    });

// ─── ADMIN COURSES ────────────────────────────────────────────────────────────
export const createCourse = (data) => api.post("/admin/courses", data);
export const getAdminCourses = () => api.get("/admin/myCourses");
export const getAdminCourse = (id) => api.get(`/admin/getCourse/${id}`);
export const editCourse = (id, data) => api.patch(`/admin/courses/${id}`, data);
export const deleteCourse = (id) => api.delete(`/admin/courses/${id}`);

// ─── USER COURSES ─────────────────────────────────────────────────────────────
export const getAllCourses = () => api.get("/user/allCourses");
export const purchaseCourse = (id, price) =>
    api.post(`/user/courses/${id}`, { priceAtPurchase: price });
export const getSingleCourse = (id) => api.get(`/user/courses/${id}`);
export const getUserCourses = () => api.get("/user/myCourses");
