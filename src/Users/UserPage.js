import React, { useEffect, useState } from "react";
import { userActions } from "../actions";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';

function UserPage() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { register, handleSubmit, reset } = useForm();
    const [userData, setUserData] = useState('');

    const handleRequest = (data) => {
        dispatch(
          userActions.userUpdate(
            data.firstname,
            data.lastname,
            userData.username,
            userData.password,
            data.email,
            data.active.length === 0 ? false : true,
            id
          )
        ).then((response) => {
          if(response.type === 'USER_UPDATE_SUCCES'){
            toast.info('User successfully updated', {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000,
              className: 'toastInfoBack',
            });
          } else {
            toast.error('Error updating user', {
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
      }, [dispatch, id]);
    
      useEffect(() => {
        let defaultValues = {};
        defaultValues.firstname = userData.firstname;
        defaultValues.lastname = userData.lastname;
        defaultValues.email = userData.email;
        defaultValues.active = userData.status === true ? ['on'] : [];
        reset({ ...defaultValues });
      }, [reset, userData]);

  return (
    <div className="justify-between overflow-x-hidden mx-12">
    <form
      onSubmit={handleSubmit(handleRequest)}
      className="flex justify-between"
    >
      <div className="flex flex-col space-y-5 card p-10 bg-white rounded-sm  w-2/4 border mx-auto">
        <h1 style={{ color: "#5880A2" }} className="text-xl font-semibold">
          Identity Data
        </h1>
        <hr />
        <div className="flex justify-between items-center">
          <label>First Name </label>
          <input
            type="text"
            name="firstname"
            {...register("firstname")}
            placeholder="First Name"
            className="border border-gray-100 h-10 rounded-sm focus:border-gray-500 pl-5 w-2/4"
          />
        </div>
        <div className="flex justify-between items-center">
          <label>Last Name </label>
          <input
            type="text"
            name="lastname"
            {...register("lastname")}
            placeholder="Last Name"
            className="border border-gray-100 h-10 rounded-sm focus:border-gray-500 pl-5 w-2/4"
          />
        </div>
        <div className="flex justify-between items-center">
          <label>Email </label>
          <input
            type="text"
            name="email"
            {...register("email")}
            placeholder="Email"
            className="border border-gray-100 h-10 rounded-sm focus:border-gray-500 pl-5 w-2/4"
          />
        </div>
        <div className="flex justify-between items-center">
          <label className="pr-8">Active </label>
          <input
            type="checkbox"
            name="active"
            {...register("active")}
            className="border border-gray-300 h-6 rounded-sm focus:border-gray-500 pl-5"
          />
        </div>
        <div className="flex items-center justify-end">
          <button
            style={{ backgroundColor: "#AFC6D9" }}
            className="py-2 rounded px-20 mt-6"
            type="submit"
          >
            Update User
          </button>
        </div>
      </div>
    </form>
  </div>
  );
}

export default UserPage;
