import React, { useEffect, useState } from "react";
import '../output.css'
import { userActions } from "../actions";
import { useSelector, useDispatch } from "react-redux";
import { Button, Icon } from "semantic-ui-react";
import { useTable, usePagination } from 'react-table'

function ReactTable({ columns, data }) {
    // Use the state and functions returned from useTable to build your UI
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
      pageCount,
      canPreviousPage,
      canNextPage,
      gotoPage,
      nextPage,
      previousPage,
      setPageSize,
      pageOptions,
      state: { pageIndex, pageSize },
    } = useTable({
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    usePagination
    )
  
    // Render the UI for your table
    return (
        <div>
        <table className="border-collapse border border-slate-400 mx-auto mt-6"  {...getTableProps()}>
        <thead>
        {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th className="border border-slate-300" {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td 
                  className="border border-slate-300"
                  {...cell.getCellProps()}>{cell.render('Cell')}
                  </td>
                })}
              </tr>
            )
          })}
        </tbody>
        </table>

        <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      </div>    
    )
  }

function UserList() {

  const dispatch = useDispatch();
  const [list, setList] = useState([]);

    useEffect(() => {
        dispatch(
          userActions.getAllUsers()
        ).then((response) => {
            setList(response.objects)
          });
      }, [ dispatch ]);

    const columns = [
        {
          Header: "Id",
          accessor: "id",
        },
        {
          Header: "First name",
          accessor: "firstname",
        },
        {
          Header: "Last name",
          accessor: "lastname",
        },
        {
          Header: "Email",
          accessor: "email",
        },
        {
          Header: "Username",
          accessor: "username",
        },
        {
          Header: "Status",
          accessor: "status",
          Cell: row => (
            <div>
              {row.value === false ? <Icon name="close" color="red" /> : <Icon name="check" color="green" /> }
            </div>
          ),
        },
        {
            Header: "Edit",
            Cell: row => (
                <div>
                  {<Button className="bg-[#AFC6D9]"> Edit </Button>}
                </div>
              ),
        },
    ];

  return (
    <div >
        <ReactTable columns={columns} data={list} />
    </div>
  );
}

export default UserList;
