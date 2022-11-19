
import { useTable, usePagination, useSortBy, useFilters, useGlobalFilter } from 'react-table'
import { DefaultFilterForColumn} from "./Filters";
import { Icon } from "semantic-ui-react";

function ReactTable({ columns, data, sortBy }) {
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      prepareRow,
      canPreviousPage,
      canNextPage,
      nextPage,
      previousPage,
      setPageSize,
      pageOptions,
      setSortBy,
      page,
      gotoPage,
      pageCount,
      state: { pageIndex, pageSize },
    } = useTable({
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10, sortBy },
      defaultColumn: { Filter: DefaultFilterForColumn },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    )

    return (
        <div>
        <table className="border border-slate-600 mx-auto mt-6 bg-white rounded"  {...getTableProps()}>
        <thead>
        {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th className="border border-slate-300" 
                {...column.getHeaderProps()}
                onClick={() => {
                  const desc =
                    column.isSortedDesc === true
                      ? undefined
                      : column.isSortedDesc === false
                      ? true
                      : false;
                  setSortBy([{ id: column.id, desc }, ...sortBy]);
                }}
                >
                {column.render('Header')}
                <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? <Icon name="angle down" />
                        : <Icon name="angle up" />
                      : ""}
                  </span>
                  <div>
                    {column.canFilter ? column.render("Filter") : null}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
        {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td 
                  className="border border-slate-300"
                  {...cell.getCellProps({
                    style: {
                      width: cell.column.width,
                    },
                  })
                  }>{cell.render('Cell')}
                  </td>
                })}
              </tr>
            )
          })}
        </tbody>
        </table>

        <div>
          <div className="flex flex-col items-center">
            <span className="text-sm text-gray-700 dark:text-gray-400 -ml-28">
                Page <span className="font-semibold text-gray-900 dark:text-white">{pageIndex + 1} </span> of <span className="font-semibold text-gray-900 dark:text-white">{pageOptions.length}</span>
            </span>
            <div className="inline-flex mt-2 xs:mt-0">

            <button onClick={() => gotoPage(0)} disabled={!canPreviousPage} className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-500 rounded-l hover:bg-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                <span className="sr-only">Next</span>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7"></path></svg>
              </button>
              <button onClick={() => previousPage()} disabled={!canPreviousPage} className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-500 rounded-l hover:bg-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                  <svg aria-hidden="true" className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd"></path></svg>
                  Prev
              </button>
              <button onClick={() => nextPage()} disabled={!canNextPage} className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-500 border-0 border-l border-gray-700 rounded-r hover:bg-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                  Next
                  <svg aria-hidden="true" className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
              </button>
              <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-500 border-0 border-l border-gray-700 rounded-r hover:bg-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                <span className="sr-only">Next</span>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path></svg>
              </button>
              <select
                className='ml-2 rounded border-gray-700'
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
              >
                {[10, 20, 30, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>    
    )
  }

  export default ReactTable;