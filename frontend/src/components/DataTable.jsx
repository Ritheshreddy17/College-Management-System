import { FaEdit, FaTrash } from "react-icons/fa";

function DataTable({ columns, data, onEdit, onDelete }) {
  const showActions = onEdit || onDelete;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-5 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider w-12">#</th>
              {columns.map((col) => (
                <th key={col.key} className="px-5 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {col.label}
                </th>
              ))}
              {showActions && (
                <th className="px-5 py-4 text-right text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.length > 0 ? (
              data.map((row, index) => (
                <tr key={row._id} className="hover:bg-slate-50 transition-colors duration-150">
                  <td className="px-5 py-4 text-sm text-slate-400 font-medium">{index + 1}</td>
                  {columns.map((col) => (
                    <td key={col.key} className="px-5 py-4 text-sm text-slate-700">
                      {row[col.key]}
                    </td>
                  ))}
                  {showActions && (
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        {onEdit && (
                          <button
                            onClick={() => onEdit(row)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                          >
                            <FaEdit size={11} /> Edit
                          </button>
                        )}
                        {onDelete && (
                          <button
                            onClick={() => onDelete(row._id)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                          >
                            <FaTrash size={11} /> Delete
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={showActions ? columns.length + 2 : columns.length + 1} className="text-center py-16 text-slate-400 text-sm">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                      <span className="text-2xl">📭</span>
                    </div>
                    No records found
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTable;