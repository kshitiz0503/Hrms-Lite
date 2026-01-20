import { useEffect, useState, useMemo } from "react";
import Table from "../components/Table/Component";
import AttendanceModal from "../components/Modal/attendanceModal";
import API from "../api/axios";
import { toast } from "react-toastify";

export default function Attendance() {
  const [attendance, setAttendance] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [filterDate, setFilterDate] = useState("");

  const fetchEmployees = async () => {
    try {
      const res = await API.get("/api/employees/");
      setEmployees(res.data.data);
    } catch (err) {
      toast.error("Failed to load employees");
    }
  };

  const fetchAttendance = async () => {
    try {
      const res = await API.get("/api/attendance/");
      setAttendance(res.data.data);
    } catch (err) {
      toast.error("Failed to load attendance");
    }
  };

  useEffect(() => {
    fetchEmployees();
    fetchAttendance();
  }, []);

  // Table column config
  const columns = [
    { key: "employee_name", label: "Employee" },
    { key: "date", label: "Date" },
    { key: "status", label: "Status" },
  ];

  const filteredAttendance = useMemo(() => {
    if (!filterDate) return attendance;
    return attendance.filter(a => a.date === filterDate);
  }, [attendance, filterDate]);

  const addAttendance = async (data) => {
    try {
      await API.post("/api/attendance/", data);
      toast.success("Attendance marked");
      setShowModal(false);
      fetchAttendance();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to mark attendance");
    }
  };

  

  return (
    <>
      <div className="d-flex justify-content-between mb-3">
        <h4>Attendance</h4>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          + Mark Attendance
        </button>
      </div>

      {/* Date Filter */}
      <div className="d-flex mb-3">
        <input
          type="date"
          className="form-control w-auto"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
        {filterDate && (
          <button className="btn btn-secondary ms-2" onClick={() => setFilterDate("")}>
            Clear
          </button>
        )}
      </div>

      <Table
        title="Attendance Records"
        data={filteredAttendance}
        columns={columns}
      />

      <AttendanceModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={addAttendance}
        employees={employees}
      />
    </>
  );
}
