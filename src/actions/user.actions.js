import { userConstants } from "../constants";
import { userService } from "../services";

function userUpdate(firstname, lastname, username, password, email, status, createdAt, id) {
  function request() {
    return { type: userConstants.USER_UPDATE_REQUEST };
  }
  function success(user) {
    return { type: userConstants.USER_UPDATE_SUCCES, user };
  }
  function failure(error) {
    return { type: userConstants.USER_UPDATE_ERROR, error };
  }
  return (dispatch) => {
    dispatch(request());

    return userService.userUpdate(firstname, lastname, username, password, email, status, createdAt, id).then(
      (user) => dispatch(success(user)),
      (error) => dispatch(failure(error.toString()))
    );
  };
}

function userFetch(id) {
  function request() {
    return { type: userConstants.USER_FETCH_REQUEST };
  }
  function success(user) {
    return { type: userConstants.USER_FETCH_SUCCES, user };
  }
  function failure(error) {
    return { type: userConstants.USER_FETCH_ERROR, error };
  }
  return (dispatch) => {
    dispatch(request());

    return userService.userFetch(id).then(
      (user) => dispatch(success(user)),
      (error) => dispatch(failure(error.toString()))
    );
  };
}

function getAllUsers() {
  function request() {
    return { type: userConstants.USER_LIST_REQUEST };
  }
  function success(objects) {
    return { type: userConstants.USER_LIST_SUCCES, objects };
  }
  function failure(error) {
    return { type: userConstants.USER_LIST_ERROR, error };
  }
  return (dispatch) => {
    dispatch(request());

    return userService
      .getAllUsers()
      .then(
        (objects) => dispatch(success(objects)),
        (error) => dispatch(failure(error.toString()))
      );
  };
}

function deleteUser(userId) {
  function request() {
    return { type: userConstants.USER_ID_REQUEST };
  }
  function success(user) {
    return { type: userConstants.USER_ID_SUCCES, user };
  }
  function failure(error) {
    return { type: userConstants.USER_ID_ERROR, error };
  }
  return (dispatch) => {
    dispatch(request());

    return userService.deleteUser(userId).then(
      (user) => dispatch(success(user)),
      (error) => dispatch(failure(error.toString()))
    );
  };
}

function addUser(
  userType,
  firstName,
  lastName,
  userName,
  password,
  active,
  rolegroups,
  clients,
  customer
) {
  function request() {
    return { type: userConstants.USER_REQUEST };
  }
  function success(user) {
    return { type: userConstants.USER_SUCCES, user };
  }
  function failure(error) {
    return { type: userConstants.USER_ERROR, error };
  }
  return (dispatch) => {
    dispatch(request());

    return userService
      .addUser(
        userType,
        firstName,
        lastName,
        userName,
        password,
        active,
        rolegroups,
        clients,
        customer
      )
      .then(
        (user) => dispatch(success(user)),
        (error) => {
          dispatch(failure(error.toString())) 
        }
      );
  };
}

export const userActions = {
  userUpdate,
  userFetch,
  getAllUsers,
  deleteUser,
  addUser,
};
