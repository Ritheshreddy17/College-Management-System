function DataTable({
  columns,
  data,
  onEdit,
  onDelete,
}) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-slate-800 text-white">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="p-3 text-left"
              >
                {column.label}
              </th>
            ))}

            <th className="p-3 text-center">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {data.length > 0 ? (
            data.map((row) => (
              <tr
                key={row._id}
                className="border-b hover:bg-gray-50"
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="p-3"
                  >
                    {row[column.key]}
                  </td>
                ))}

                <td className="p-3">
                  <div className="flex justify-center gap-2">

                    <button
                      onClick={() => onEdit(row)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        onDelete(row._id)
                      }
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>

                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length + 1}
                className="text-center p-5"
              >
                No Records Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;