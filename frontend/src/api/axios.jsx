import axios from "axios";
import store from "../store/store";
const API = axios.create({
  baseURL: "https://backend.hrm.hypertonic.co.in",
//   baseURL: "http://127.0.0.1:8000",
  withCredentials: true, // <-- refresh cookie ke liye
});

// 🔹 Request Interceptor (access token bhejne ke liye)
API.interceptors.request.use(
  (config) => {
    const access = store.getState().auth.accessToken;
    if (access) {
      config.headers["Authorization"] = `Bearer ${access}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🔹 Response Interceptor (401 aaya to refresh try karega)
API.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;

    // agar access token expire -> auto refresh
    if (err.response?.status === 401 && !original._retry) {
      original._retry = true;
      try {
        const refreshRes = await axios.post(
        //   "http://127.0.0.1:8000/api/refresh/",
          "https://backend.hrm.hypertonic.co.in/",
          {},
          { withCredentials: true }
        );

        const newAccess = refreshRes.data.access;

        // Store me update
        store.dispatch({
          type: "auth/setAccessToken",
          payload: newAccess,
        });

        // retry request
        original.headers["Authorization"] = `Bearer ${newAccess}`;
        return API(original);

      } catch (refreshError) {
        store.dispatch({ type: "auth/logout" });
      }
    }

    return Promise.reject(err);
  }
);

export default API;
