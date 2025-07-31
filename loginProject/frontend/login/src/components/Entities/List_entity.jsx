import { createColumnHelper,getCoreRowModel , getPaginationRowModel ,getFilteredRowModel , getSortedRowModel ,useReactTable } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { User, Mail, Phone, CircleUserRound } from 'lucide-react';

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("name",{
    cell: (info) => info.getValue(),
    enableSorting: true,
    header: () => (
      <span className='flex items-center'>
        <User className='mr-2' size={16} /> Name
      </span>
    )
  }),

  columnHelper.accessor("pan",{
    cell: (info) => info.getValue(),
    enableSorting: true,
    header: () => (
      <span className='flex items-center'>
        <User className='mr-2' size={16} /> PAN
      </span>
    )
  }),

  columnHelper.accessor("mobile",{
    cell: (info) => info.getValue(),
    enableSorting: true,
    header: () => (
      <span className='flex items-center'>
        <Phone className='mr-2' size={16} /> Mobile
      </span>
    )
  }),

  columnHelper.accessor("address_line_1",{
    cell: (info) => info.getValue(),
    enableSorting: true,
    header: () => (
      <span className='flex items-center'>
        <User className='mr-2' size={16} /> Address
      </span>
    )
  }),

  columnHelper.accessor("state",{
    cell: (info) => info.getValue(),
    enableSorting: true,
    header: () => (
      <span className='flex items-center'>
        <User className='mr-2' size={16} /> State
      </span>
    )
  }),

  columnHelper.accessor("city",{
    cell: (info) => info.getValue(),
    enableSorting: true,
    header: () => (
      <span className='flex items-center'>
        <User className='mr-2' size={16} /> City
      </span>
    )
  }),

  columnHelper.accessor("pincode",{
    cell: (info) => info.getValue(),
    enableSorting: true,
    header: () => (
      <span className='flex items-center'>
        <User className='mr-2' size={16} /> Pincode
      </span>
    )
  }),
  
  
]


function List_entity() {

  const [entities, setEntities] = useState([])
  const [globalFilter, setGlobalFilter] = useState('');
  
  const getEntities = async() => {
    try {
      const res = await fetch('http://localhost:5000/api/list_entities')
      const data = await res.json()
      setEntities(data)
      console.log("Entities data:", data);

    } catch (error) {
      console.log("failed to fetch data: ",error)
    }
  }

  useEffect(()=>{
    getEntities();
  },[])

  const table = useReactTable({
    data: entities,
    columns: columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div className = 'p-6 text-gray-700 bg-white'>
      
      <h1 className='text-2xl font-semibold mb-4'>List Entity</h1>

      <input 
        type="text"
        placeholder='Search entity...'
        value = {globalFilter ?? ''}
        onChange={(e) => setGlobalFilter(e.target.value)}
        className='mb-4 p-2 border border-gray-300 rounded w-full max-w-sm hover:border-black'
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
  )
}

export default List_entity
