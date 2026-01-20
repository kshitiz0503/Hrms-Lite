import { useState } from "react";
import "./component.css";

export default function Modal({ show, title, fields, onSubmit, onClose }) {
  const [form, setForm] = useState({});

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const submit = () => {
    onSubmit(form);
    setForm({});
  };

  if (!show) return null;

  return (
    <div id="modal-overlay">
      <div id="modal-card">
        <h5 className="mb-3">{title}</h5>

        {fields.map(field => (
          <div key={field.name} className="mb-3">
            <label className="form-label">{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              className="form-control"
              onChange={handleChange}
            />
          </div>
        ))}

        <div className="d-flex justify-content-end gap-2">
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={submit}>Submit</button>
        </div>
      </div>
    </div>
  );
}
