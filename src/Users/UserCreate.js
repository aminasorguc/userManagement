import React from "react";
import { userActions } from "../actions";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import InputField from "./InputField";

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
        if(response.type === 'USER_SUCCES'){
          toast.info('User successfully created', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
            className: 'toastInfoBack',
          });
        } else {
          toast.error('Error creating user', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
            className: 'toastInfoBack',
          });
        }
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
        <InputField
          label={"First Name"}
          type="text"
          name="firstname"
          register={register}
          placeholder="First Name"
        />
        <InputField
          label={"Last Name"}
          type="text"
          name="lastname"
          register={register}
          placeholder="Last Name"
        />
        <InputField
          label={"Email"}
          type="text"
          name="email"
          register={register}
          placeholder="Email"
        />
        <InputField
          label={"Username"}
          type="text"
          name="username"
          register={register}
          placeholder="Username"
        />
        <InputField
          label={"Password"}
          type="password"
          name="password"
          register={register}
          placeholder="Password"
        />
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
