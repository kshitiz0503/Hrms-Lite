import { useEffect, useState } from "react";
import Table from "../components/Table/Component";
import Modal from "../components/Modal/Component";
import ViewAttendanceModal from "../components/Modal/viewAttendanceModal";

import API from "../api/axios";
import { toast } from "react-toastify";
import { FaTrash, FaEye } from "react-icons/fa";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [attendanceModal, setAttendanceModal] = useState({
  show: false,
  employee: null,
  records: []
});

const openAttendanceModal = async (row) => {
  try {
    const res = await API.get(`/api/attendance/${row.employee_id}/`);
    setAttendanceModal({
      show: true,
      employee: row,
      records: res.data.data
    });
  } catch (err) {
    toast.error("Failed to load attendance");
  }
};

const closeAttendanceModal = () => {
  setAttendanceModal({
    show: false,
    employee: null,
    records: []
  });
};


  // Modal fields config
  const employeeFields = [
    { name: "employee_id", label: "Employee ID", type: "text" },
    { name: "first_name", label: "First Name", type: "text" },
    { name: "last_name", label: "Last Name", type: "text" },
    { name: "email", label: "Email", type: "email" },
    { name: "department", label: "Department", type: "text" },
  ];

  // Table column config
  const columns = [
    { key: "employee_id", label: "ID" },
    { key: "first_name", label: "First Name" },
    { key: "last_name", label: "Last Name" },
    { key: "email", label: "Email" },
    { key: "department", label: "Department" },
  ];

  const fetchEmployees = async () => {
    try {
      const res = await API.get("/api/employees/");
      setEmployees(res.data.data);
    } catch (err) {
      toast.error("Failed to load employees");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const addEmployee = async (data) => {
    try {
      await API.post("/api/employees/", data);
      toast.success("Employee added");
      setShowModal(false);
      fetchEmployees();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add employee");
    }
  };

  const deleteEmployee = async (row) => {
    try {
      await API.delete(`/api/employees/${row.employee_id}/`);
      toast.success("Employee deleted");
      fetchEmployees();
    } catch (err) {
      toast.error("Failed to delete employee");
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between mb-3">
        <h4>Employees</h4>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          + Add Employee
        </button>
      </div>

      <Table
        title="Employees List"
        data={employees}
        columns={columns}
       actions={(row) => (
  <div className="d-flex gap-2">
    <FaEye
      role="button"
      size={18}
      className="text-primary"
      onClick={() => openAttendanceModal(row)}
      title="View Attendance"
    />
    <FaTrash
      role="button"
      size={18}
      className="text-danger"
      onClick={() => deleteEmployee(row)}
      title="Delete Employee"
    />
  </div>
        )}
      />

      <Modal
        show={showModal}
        title="Add Employee"
        fields={employeeFields}
        onSubmit={addEmployee}
        onClose={() => setShowModal(false)}
      />
      <ViewAttendanceModal
  show={attendanceModal.show}
  onClose={closeAttendanceModal}
  employee={attendanceModal.employee}
  records={attendanceModal.records}
/>
    </>
  );
}
