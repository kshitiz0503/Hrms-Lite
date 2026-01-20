import { useState } from "react";
import "./attendanceModal.css";

export default function AttendanceModal({ show, onClose, onSubmit, employees }) {
  const [form, setForm] = useState({
    employee_id: "",
    date: "",
    status: "Present",
  });

  const [search, setSearch] = useState("");

  const filteredEmployees = employees.filter(emp =>
    emp.full_name.toLowerCase().includes(search.toLowerCase())
  );

  const submit = () => {
    if (!form.employee_id || !form.date) {
      return alert("Employee and date required");
    }
    onSubmit(form);
    setForm({ employee_id: "", date: "", status: "Present" });
  };

  if (!show) return null;

  return (
    <div id="modal-overlay">
      <div id="modal-card" style={{ width: "450px" }}>
        <h5 className="mb-3">Mark Attendance</h5>

       <label className="form-label">Employee</label>
<div className="mb-3">
  <select
    className="form-select"
    value={form.employee_id}
    onChange={(e) => setForm({
      ...form,
      employee_id: e.target.value
    })}
  >
    <option value="">Select employee...</option>

    {employees.map(emp => (
      <option key={emp.employee_id} value={emp.employee_id}>
        {emp.full_name}
      </option>
    ))}
  </select>
</div>


        <label className="form-label mt-3">Date</label>
        <input
          type="date"
          className="form-control mb-3"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />

        <label className="form-label">Status</label>
        <select
          className="form-select mb-3"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
          <option value="Leave">Leave</option>
        </select>

        <div className="d-flex justify-content-end gap-2">
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={submit}>Submit</button>
        </div>
      </div>
    </div>
  );
}
