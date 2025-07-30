import { createColumnHelper,getCoreRowModel , getPaginationRowModel ,getFilteredRowModel , getSortedRowModel ,useReactTable } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { User } from 'lucide-react';

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("name", {
    cell: (info) => info.getValue(),
    enableSorting: true,
    header: () => (
      <span className='flex items-center'>
        <User className='mr-2' size={16} /> Name
      </span>
    )
  }),
  columnHelper.accessor("email", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className='flex items-center'>
        <User className='mr-2' size={16} /> Email
      </span>
    ),
    enableSorting: true,
  }),

  columnHelper.accessor("mobile", {
    cell: (info) => info.getValue(),
    enableSorting: true,
    header: () => (
      <span className='flex items-center'>
        <User className='mr-2' size={16} /> Mobile
      </span>
    )
  }),
  columnHelper.accessor("role", {
    cell: (info) => info.getValue(),
    enableSorting: true,
    header: () => (
      <span className='flex items-center'>
        <User className='mr-2' size={16} /> Role
      </span>
    )
  }),
  columnHelper.accessor("entity", {
    cell: (info) => info.getValue(),
    enableSorting: true,
    header: () => (
      <span className='flex items-center'>
        <User className='mr-2' size={16} /> Entity
      </span>
    )
  }),
];

function Users() {
  const [users, setUsers] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);

  const getUsers = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/users');
      const data = await res.json();
      setUsers(data);
      console.log(data)
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const table = useReactTable({
    data: users,
    columns: columns,
    state: {
    globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  useEffect(() => {
    table.setPageSize(10);
  }, []);

  return (
    <div className="p-6 text-gray-700">
      <h1 className="text-2xl font-semibold mb-4">User Data</h1>

      <input
        type="text"
        placeholder="Search users..."
        value={globalFilter ?? ''}
        onChange={(e) => setGlobalFilter(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded w-full max-w-sm"
      />


      <table className="min-w-full divide-y divide-gray-200 border border-gray-300 rounded-md shadow-sm overflow-hidden text-sm">
        <thead className="bg-gray-100 text-left text-sm font-semibold text-gray-600">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  className="px-4 py-3 cursor-pointer select-none"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {header.isPlaceholder ? null : (
                    <div className="flex items-center gap-2">
                      {header.column.columnDef.header?.()}
                      {{
                        asc: '🔼',
                        desc: '🔽',
                      }[header.column.getIsSorted()] ?? '↕️'}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white text-sm">
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="hover:bg-gray-50 even:bg-gray-50">
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="px-4 py-2 whitespace-nowrap">
                  {cell.renderValue()}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex items-center justify-between mt-4 text-sm">
        <span>
          Page{' '}
          <strong>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </strong>
        </span>

        <div className="space-x-2">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>


    </div>
  );
}

export default Users;
