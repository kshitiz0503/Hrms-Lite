import "./component.css";
import { Link } from "react-router-dom";

export default function Sidebar({ isOpen }) {
  return (
    <aside id="sidebar" className={isOpen ? "sidebar-open" : ""}>
      <div id="sidebar-header">
        <h5>HRMS Lite</h5>
      </div>

      <nav id="sidebar-menu">
        <Link to="/dashboard" className="sidebar-link">📊 Dashboard</Link>
        <Link to="/employees" className="sidebar-link">👥 Employees</Link>
        <Link to="/attendance" className="sidebar-link">📝 Attendance</Link>
      </nav>
    </aside>
  );
}
