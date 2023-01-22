import React, { useState, useEffect } from "react";
import { userActions } from "../actions";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Button, List, Icon } from "semantic-ui-react";
import { toast } from 'react-toastify';
import InputField from "./InputField";

function PermissionPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();
  const [userData, setUserData] = useState('');
  const [userPerm, setUserPerm] = useState('');

  const handleDelete = (permId) => {
    dispatch(
      userActions.deletePermission(id, permId)
    ).then((response) => {
      if(response.type === 'PERMISSION_DELETE_SUCCES'){
        window.location.reload(false)
      } else {
        toast.error('Error deleting permission', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
          className: 'toastInfoBack',
        });
      }
    });
  };

  const handleRequest = (data) => {
    dispatch(
      userActions.assignPermToUser(data.code, data.description, id)).then((response) => {
          console.log(response)
          if(response.type === 'PERMISSION_USER_ASSIGN_SUCCESS'){
              toast.info('Permission successfully assigned', {
                  position: toast.POSITION.TOP_CENTER,
                  autoClose: 3000,
                  className: 'toastInfoBack',
              });
              window.location.reload(false)
              } else {
              toast.error('Error assigning permission', {
                  position: toast.POSITION.TOP_CENTER,
                  autoClose: 3000,
                  className: 'toastInfoBack',
              });
          }
    });
  };

  useEffect(() => {
    dispatch(userActions.userFetch(id)).then((response) => {
        setUserData(response.user)
    });
    dispatch(userActions.getUserPermission(id)).then((resp) => {
      setUserPerm(resp.user)
    });
  }, [ dispatch, id ]);

  useEffect(() => {
    let defaultValues = {};
    defaultValues.id = userData.id;
    defaultValues.username = userData.username;
    reset({ ...defaultValues });
  }, [reset, userData, userPerm]);

  return (
    <div className="justify-between overflow-x-hidden mx-12">
    <form
      className="flex justify-between"
    >
      <div className="flex flex-col space-y-5 card p-10 bg-white rounded-sm  w-2/4 border mx-auto">
        <h1 style={{ color: "#5880A2" }} className="text-xl font-semibold">
          User Permission
        </h1>
        <hr />
        <InputField
          label={"Id"}
          type="text"
          name="id"
          register={register}
          disabled
          placeholder="Id"
        />
        <InputField
          label={"Username"}
          type="text"
          name="username"
          register={register}
          disabled
          placeholder="Username"
        />
        <div className="flex justify-between items-center">
          <label>Assigned Permissions </label>
          <List divided verticalAlign='middle' style={{width: "50%"}}>
            {userPerm ? userPerm.map(item => (
              <List.Item>
              <List.Content floated='right'>
                <Button type="button" onClick={() => handleDelete(item.id)} style={{ backgroundColor: "#AFC6D9" }}>Remove</Button>
              </List.Content>
              <Icon name="caret right" />
              <List.Content>{item.description}</List.Content>
            </List.Item>
            )) : ''}
        </List>
        </div>
      </div>
    </form>
    <form
      onSubmit={handleSubmit(handleRequest)}
      className="flex justify-between"
    >
      <div className="flex flex-col space-y-5 card p-10 bg-white rounded-sm  w-2/4 border mx-auto mt-4">
        <h1 style={{ color: "#5880A2" }} className="text-xl font-semibold">
          Assign Permissions
        </h1>
        <hr />
        <InputField
          label={"Code"}
          type="text"
          name="code"
          register={register}
          placeholder="Code"
        />
         <InputField
          label={"Description"}
          type="text"
          name="description"
          register={register}
          placeholder="Description"
        />
        <div className="flex items-center justify-end">
          <button
            style={{ backgroundColor: "#AFC6D9" }}
            className="py-2 rounded px-20 mt-4"
            type="submit"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  </div>
  );
}

export default PermissionPage;
