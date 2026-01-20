import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { toast } from "react-toastify";
import "../styles/login.css";
import { useDispatch } from "react-redux";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { setAccessToken } from "../store/authSlice";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    if (!form.username || !form.password) {
      toast.error("Both fields are required");
      return;
    }

    setLoading(true);

    try {
      const res = await API.post("/api/login/", {
        username: form.username,
        password: form.password,
      });
      console.log("Login response:", res);
      toast.success("Login successful!");
      dispatch(setAccessToken(res.data.access));
      navigate("/dashboard");

    } catch (err) {
      toast.error(err.response?.data?.error || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="login-wrapper">
      <div id="login-card">
        <h3 className="mb-3">Admin Login</h3>

        <input
          type="text"
          name="username"
          placeholder="Username"
          className="form-control mb-3"
          value={form.username}
          onChange={handleChange}
        />

        <div className="password-wrapper mb-3">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            className="form-control"
            value={form.password}
            onChange={handleChange}
          />
          <span 
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button className="btn btn-primary w-100" onClick={handleLogin} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}
