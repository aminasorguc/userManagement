import React from "react";
import { userActions } from "../actions";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';

function UserCreate() {
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();

    const handleRequest = (data) => {
      dispatch(
        userActions.addUser(
          data.firstname,
          data.lastname,
          data.username,
          data.password,
          data.email,
          data.active
        )
      ).then((response) => {
        toast.info('User successfully created', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
          className: 'toastInfoBack',
        });
      });
    };

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
          <label>Username </label>
          <input
            type="text"
            name="username"
            {...register("username")}
            placeholder="Username"
            className="border border-gray-100 h-10 rounded-sm focus:border-gray-500 pl-5 w-2/4"
          />
        </div>
        <div className="flex justify-between items-center">
          <label>Password </label>
          <input
            type="password"
            name="password"
            {...register("password")}
            placeholder="Password"
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
            className="py-2 rounded px-20 mt-4"
            type="submit"
          >
            Create User
          </button>
        </div>
      </div>
    </form>
  </div>
  );
}

export default UserCreate;
