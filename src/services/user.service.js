import moment from "moment";
import { authHeader } from "../helpers";
import { v4 as uuidv4 } from "uuid";

function isJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

function handleResponse(response) {
  return response.text().then((text) => {
    let data = isJson(text) === true ? JSON.parse(text) : text;
    if (!response.ok) {
      if (
        response.status === 401 ||
        response.status === 404 ||
        response.status === 440
      ) {
        // auto logout if 401 or 404
        //loginService.logout();
      }
     

      const error = (data.error.code && data.message) || response.statusText;
      return Promise.reject(error);
    } else if (data.error) {
      return Promise.reject(data.error.text || data.error.code);
    }

    return data;
  });
}

function buildAddUserRequestData(
  userType,
  firstName,
  lastName,
  userName,
  password,
  status,
  rolegroups,
  clients,
  customer
) {
  const requestDate = moment(Date.now())
    .utc()
    .format("YYYY-MM-DD[T]HH:mm:ss.SSSZZ");
  const msgId = uuidv4();

  let supr = true;
  let staff = true;

  if (userType === "2") {
    supr = false;
  }
  if (userType === "3") {
    supr = false;
    staff = false;
  }
  const authToken = uuidv4();
  const active = status.length > 0 ? true : false

  return {
    serviceId: "liquid_auth",
    resource: "USER",
    action: "ADD",
    msgId,
    version: "1.0.4",
    validateOnly: false,
    requestDate,
    requestData: {
      firstName,
      lastName,
      userName,
      password,
      active,
      rolegroups,
      clients,
      customer: {customerId: customer},
      supr,
      staff,
      authToken,
      popupCompleted: 0,
      popupCounter: 0,
    },
  };
}

function buildRequestData(
  firstname,
  lastname,
  username,
  password,
  email,
  status,
  createdAt,
  id,
) {
  // const requestDate = moment(Date.now()).utc()
  // .format('YYYY-MM-DD[T]HH:mm:ss.SSSZZ');
  return {
    firstname,
    lastname,
    username,
    password,
    email,
    status,
    createdAt,
    id
  };
}

function buildUserRequestData(id) {
  return {
    id
  };
}

function userFetch(id) {
  const requestOptions = {
    method: "GET",
  };
  return fetch(`https://63760ae67e93bcb006c16c60.mockapi.io/user/list/${id}`, requestOptions)
    .then(handleResponse)
    .then((user) => user);
}

function userUpdate(firstname, lastname, username, password, email, status, createdAt, id) {
    const bodyData = JSON.stringify(
        buildRequestData(firstname, lastname, username, password, email, status, createdAt, id)
      );
    const requestOptions = {
      method: "PUT",
      body: bodyData,
    };
    return fetch(`https://63760ae67e93bcb006c16c60.mockapi.io/user/list/${id}`, requestOptions)
      .then(handleResponse)
      .then((user) => user);
  }

function getAllUsers() {
  const bodyData = JSON.stringify(
    buildRequestData()
  );
  const requestOptions = {
    method: "GET",
    headers: authHeader(bodyData),
  };

  return fetch('https://63760ae67e93bcb006c16c60.mockapi.io/user/list', requestOptions)
    .then(handleResponse)
    .then((users) => users);
}

function deleteUser(id) {
  const bodyData = JSON.stringify(buildUserRequestData(id));
  const requestOptions = {
    method: "DELETE",
    headers: authHeader(bodyData),
    //body: bodyData,
  };

  return fetch(`https://63760ae67e93bcb006c16c60.mockapi.io/user/list/${id}`, requestOptions)
    .then(handleResponse)
    .then((user) => user);
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
  const bodyData = JSON.stringify(
    buildAddUserRequestData(
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
  );
  const requestOptions = {
    method: "POST",
    headers: authHeader(bodyData),
    body: bodyData,
  };

//   return fetch(`${config.API_URL}/rest/service/proxy`, requestOptions)
//     .then(handleResponse)
//     .then((user) => user);
}

export const userService = {
  userFetch,
  getAllUsers,
  deleteUser,
  addUser,
  userUpdate
};
