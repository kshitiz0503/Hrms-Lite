import "./component.css";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import API from "../../api/axios";
import { useNavigate } from "react-router-dom";
export default function Navbar({ toggleSidebar }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await API.post("/api/logout/");
    } catch (err) {
      console.warn("Logout API failed");
    }

    dispatch(logout());
    navigate("/login");
  };
  return (
    <header id="navbar">
      <button id="sidebar-toggle" className="d-md-none" onClick={toggleSidebar}>
        ☰
      </button>

      <div className="navbar-title">Admin Panel</div>

      <div id="navbar-right">
        <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
      Logout
    </button>
      </div>
    </header>
  );
}
