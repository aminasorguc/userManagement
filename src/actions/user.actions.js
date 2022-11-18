import { userConstants } from "../constants";
import { userService } from "../services";

function userUpdate(firstname, lastname, username, password, email, status, id, permId) {
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

    return userService.userUpdate(firstname, lastname, username, password, email, status, id, permId).then(
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
    return { type: userConstants.USER_DELETE_REQUEST };
  }
  function success(user) {
    return { type: userConstants.USER_DELETE_SUCCES, user };
  }
  function failure(error) {
    return { type: userConstants.USER_DELETE_ERROR, error };
  }
  return (dispatch) => {
    dispatch(request());

    return userService.deleteUser(userId).then(
      (user) => dispatch(success(user)),
      (error) => dispatch(failure(error.toString()))
    );
  };
}

function getUserPermission(userId) {
  function request() {
    return { type: userConstants.USER_PERMISSION };
  }
  function success(user) {
    return { type: userConstants.USER_PERMISSION_SUCCES, user };
  }
  function failure(error) {
    return { type: userConstants.USER_PERMISSION_ERROR, error };
  }
  return (dispatch) => {
    dispatch(request());

    return userService.getUserPermission(userId).then(
      (user) => dispatch(success(user)),
      (error) => dispatch(failure(error.toString()))
    );
  };
}

function addUser(firstname, lastname, username, password, email, status) {
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
      .addUser(firstname, lastname, username, password, email, status)
      .then(
        (user) => dispatch(success(user)),
        (error) => {
          dispatch(failure(error.toString())) 
        }
      );
  };
}

function assignPermToUser(code, description, userId) {
  function request() {
    return { type: userConstants.PERMISSION_USER_ASSIGN };
  }
  function success(permission) {
    return { type: userConstants.PERMISSION_USER_ASSIGN_SUCCESS, permission };
  }
  function failure(error) {
    return { type: userConstants.PERMISSION_USER_ASSIGN_ERROR, error };
  }
  return (dispatch) => {
    dispatch(request());

    return userService.assignPermToUser(code, description, userId).then(
      (permission) => dispatch(success(permission)),
      (error) => dispatch(failure(error.toString()))
    );
  };
}

function deletePermission(userId, permId) {
  function request() {
    return { type: userConstants.PERMISSION_DELETE };
  }
  function success(user) {
    return { type: userConstants.PERMISSION_DELETE_SUCCES, user };
  }
  function failure(error) {
    return { type: userConstants.PERMISSION_DELETE_ERROR, error };
  }
  return (dispatch) => {
    dispatch(request());

    return userService.deletePermission(userId, permId).then(
      (user) => dispatch(success(user)),
      (error) => dispatch(failure(error.toString()))
    );
  };
}

export const userActions = {
  userUpdate,
  userFetch,
  getAllUsers,
  deleteUser,
  addUser,
  getUserPermission,
  assignPermToUser,
  deletePermission
};
