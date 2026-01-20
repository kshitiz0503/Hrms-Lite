import Table from "../Table/Component";

export default function ViewAttendanceModal({ show, onClose, employee, records }) {
  if (!show) return null;

  const columns = [
    { key: "date", label: "Date" },
    { key: "status", label: "Status" },
  ];

  return (
    <div id="modal-overlay">
      <div id="modal-card" style={{ width: "600px" }}>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5>Attendance - {employee.first_name} {employee.last_name}</h5>
          <button className="btn btn-sm btn-outline-secondary" onClick={onClose}>X</button>
        </div>

        <Table
          title="Attendance Records"
          data={records}
          columns={columns}
          searchEnabled={true}
          pagination={true}
        />
      </div>
    </div>
  );
}
