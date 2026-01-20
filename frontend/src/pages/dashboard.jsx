import { useEffect, useState } from "react";
import API from "../api/axios";
import { toast } from "react-toastify";
import "../styles/dashboard.css";

export default function Dashboard() {
  const [stats, setStats] = useState({
    employees: 0,
    present: 0,
    absent: 0,
    leave: 0,
  });

  const [recent, setRecent] = useState([]);

  const fetchData = async () => {
    try {
      const empRes = await API.get("/api/employees/");
      const attRes = await API.get("/api/attendance/");

      const employees = empRes.data.data;
      const attendance = attRes.data.data;

      const today = new Date().toISOString().split("T")[0];

      const todayRecords = attendance.filter(a => a.date === today);

      setStats({
        employees: employees.length,
        present: todayRecords.filter(a => a.status === "Present").length,
        absent: todayRecords.filter(a => a.status === "Absent").length,
        leave: todayRecords.filter(a => a.status === "Leave").length,
      });

      // Sort recent by date desc and take 5
      const recentSorted = attendance
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);

      setRecent(recentSorted);

    } catch (err) {
      toast.error("Failed to load dashboard");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h4 className="mb-4">Dashboard</h4>

      
      {/* KPI CARDS */}
<div className="row g-3 mb-4">
  <div className="col-md-3 col-6">
    <div className="stat-card shadow-sm border-0">
      <h6>Total Employees</h6>
      <h3 className="stat-number">{stats.employees}</h3>
    </div>
  </div>

  <div className="col-md-3 col-6">
    <div className="stat-card present shadow-sm border-0">
      <h6>Present Today</h6>
      <h3 className="stat-number text-success">{stats.present}</h3>
    </div>
  </div>

  <div className="col-md-3 col-6">
    <div className="stat-card absent shadow-sm border-0">
      <h6>Absent Today</h6>
      <h3 className="stat-number text-danger">{stats.absent}</h3>
    </div>
  </div>

  <div className="col-md-3 col-6">
    <div className="stat-card leave shadow-sm border-0">
      <h6>On Leave Today</h6>
      <h3 className="stat-number text-warning">{stats.leave}</h3>
    </div>
  </div>
</div>


      {/* RECENT ATTENDANCE */}
      <div className="card p-3">
        <h5 className="mb-3">Recent Attendance</h5>

        <table className="table table-striped">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {recent.length > 0 ? (
              recent.map((r, i) => (
                <tr key={i}>
                  <td>{r.employee_name}</td>
                  <td>{r.date}</td>
                  <td>{r.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center text-muted">
                  No records
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
