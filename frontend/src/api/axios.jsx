import axios from "axios";

export function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  console.log("🔍 Retrieved cookie:", match ? match[2] : null);
  if (match) return match[2];
}

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
  withCredentials: true,
});

API.interceptors.request.use((config) => {
  const csrfToken = getCookie("csrftoken");
  console.log("⚠️ CSRF inside interceptor:", csrfToken);

  if (csrfToken) {
    config.headers["X-CSRFToken"] = csrfToken;
    console.log("➡️ Axios header sent:", config.headers);
  } else {
    console.warn("❌ No CSRF token found!");
  }

  return config;
});

export default API;
