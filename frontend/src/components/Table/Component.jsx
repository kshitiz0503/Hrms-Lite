import { useState, useMemo } from "react";
import "./component.css";
import { FaTrash, FaEye } from "react-icons/fa";


export default function Table({
  title,
  columns = [],
  data = [],
  searchEnabled = true,
  filterComponent = null,
  actions = null,
  pagination = true,
  rowsPerPage = 8,
}) {
  const [search, setSearch] = useState("");

  const filteredData = useMemo(() => {
    return data.filter(row =>
      Object.values(row).some(v =>
        v?.toString().toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [data, search]);

  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return filteredData.slice(start, start + rowsPerPage);
  }, [page, filteredData]);

  return (
    <div id="table-card" className="p-3">
      <div id="table-header" className="d-flex justify-content-between align-items-center mb-3">
        <h5>{title}</h5>
        {searchEnabled && (
          <input
            type="text"
            className="form-control w-auto"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: "200px" }}
          />
        )}
      </div>

      {filterComponent && (
        <div className="mb-3">
          {filterComponent}
        </div>
      )}

      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            {columns.map(col => (
              <th key={col.key}>{col.label}</th>
            ))}
            {actions && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {paginatedData.length > 0 ? (
            paginatedData.map((row, idx) => (
              <tr key={idx}>
                {columns.map(col => (
                  <td key={col.key}>
                    {row[col.key]}
                  </td>
                ))}
                {actions && (
                  <td>
                    {actions(row)}
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length + 1} className="text-center text-muted">
                No records found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {pagination && totalPages > 1 && (
        <div id="pagination" className="d-flex justify-content-end mt-3">
          <button
            className="btn btn-outline-secondary btn-sm me-2"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >Prev</button>

          <span>Page {page} / {totalPages}</span>

          <button
            className="btn btn-outline-secondary btn-sm ms-2"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >Next</button>
        </div>
      )}
    </div>
  );
}
