import React, { useEffect, useState } from "react";
import '../output.css'
import { userActions } from "../actions";
import { useDispatch } from "react-redux";
import { Button, Icon, Modal } from "semantic-ui-react";
import { Link } from "react-router-dom";
import ReactTable from "./ReactTable";
import { toast } from 'react-toastify';

function exampleReducer(state, action) {
  switch (action.type) {
    case 'close':
      return { open: false }
    case 'open':
      return { open: true, size: action.size }
    default:
      throw new Error('Unsupported action...')
  }
}

function UserList() {
  const dispatch = useDispatch();
  const [list, setList] = useState([]);
  const [userId, setUserId] = useState(0);
  const [state, disp] = React.useReducer(exampleReducer, {
    open: false,
    size: undefined,
  })
  const { open, size } = state
  const sortBy = [{ id: "id" }, { id: "firstname" }, { id: "lastname" }, { id: "username" }, { id: "email" }];

  const handleDelete = (id) => {
    dispatch(
      userActions.deleteUser(
        id
      )
    ).then((response) => {
      if(response.type === 'USER_DELETE_SUCCES'){
        window.location.reload(false)
      } else {
        toast.error('Error deleting user', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
          className: 'toastInfoBack',
        });
      }
    });
  };

  useEffect(() => {
      dispatch(
        userActions.getAllUsers()
      ).then((response) => {
          if(response.type === 'USER_LIST_SUCCES'){
            setList(response.objects)
          } else {
            toast.error('Error fetching list of users', {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000,
              className: 'toastInfoBack',
            });
          }
        });
    }, [ dispatch ]);

  const columns = [
      {
        Header: "Id",
        accessor: "id",
        Cell: row => (
          <div>
            {(<Link to={`/user/${row.row.original.id}`}>{row.value}</Link>)}
          </div>
        ),
        width: 100,
      },
      {
        Header: "First name",
        accessor: "firstname",
        width: 200,
      },
      {
        Header: "Last name",
        accessor: "lastname",
        width: 200,
      },
      {
        Header: "Email",
        accessor: "email",
        width: 200,
      },
      {
        Header: "Username",
        accessor: "username",
        width: 200,
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: row => (
          <div>
            {row.value === false ? <Icon name="close" color="red" /> : <Icon name="check" color="green" /> }
          </div>
        ),
        width: 100,
      },
      {
          Header: "Edit",
          Cell: row => (
              <div>
                {(<Link to={`/user/${row.row.original.id}`}>
                  <Button style={{ backgroundColor: "#AFC6D9" }}> Edit </Button>
                </Link>)}
              </div>
            ),
            width: 200,
      },
      {
        Header: "Delete",
        Cell: row => (
            <div>
              {<Button onClick={() => {
                setUserId(row.row.original.id)
                disp({ type: 'open', size: 'mini' })}} style={{ backgroundColor: "#AFC6D9" }}> Delete </Button>}
            </div>
          ),
          width: 200,
      },
      {
        Header: "Assign Permission",
        Cell: row => (
            <div>
              {(<Link to={`/user/permission/${row.row.original.id}`}>
                  <Button style={{ backgroundColor: "#AFC6D9" }}> Assign </Button>
                </Link>)}
            </div>
          ),
          width: 200,
      },
  ]

  return (
    <div >
        <Modal
          size={size}
          open={open}
          onClose={() => disp({ type: 'close' })}
        >
          <Modal.Header>Delete User</Modal.Header>
          <Modal.Content>
            <p>Are you sure you want to delete this user</p>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={() => disp({ type: 'close' })}>
              Cancel
            </Button>
            <Button positive onClick={() => {
              handleDelete(userId)
              disp({ type: 'close' })
            }}>
              Yes
            </Button>
          </Modal.Actions>
        </Modal>
        <Link to={`/user/create`}>
          <button className='inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-500 border-0 border-l border-gray-700 rounded hover:bg-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"'> Create User </button>
        </Link>
        <ReactTable columns={columns} data={list} sortBy={sortBy} />
    </div>
  );
}

export default UserList;
