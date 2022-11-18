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
    console.log(response)
    if (!response.ok) {
      let error = '';
      if (
        response.status === 401 ||
        response.status === 404 ||
        response.status === 440
      ) {
       error = response.statusText;
      }
      return Promise.reject(error);
    } else if (data.error) {
      return Promise.reject(data.error.text || data.error.code);
    }
    return data;
  });
}

function buildAddUserRequestData(firstname, lastname, username, password, email, status) {
  return {
    firstname, lastname, username, password, email, status
  };
}

function buildRequestData(firstname, lastname, username, password, email, status, id) {
  return {
    id,
    firstname,
    lastname,
    username,
    password,
    email,
    status,
  };
}

function userFetch(id) {
  const requestOptions = {
    method: "GET",
  };
  return fetch(`https://63760ae67e93bcb006c16c60.mockapi.io/user/${id}`, requestOptions)
    .then(handleResponse)
    .then((user) => user);
}

function userUpdate(firstname, lastname, username, password, email, status, id) {
    const bodyData = JSON.stringify(
        buildRequestData(firstname, lastname, username, password, email, status, id)
      );
    const requestOptions = {
      method: "PUT",
      body: bodyData,
      headers: { 'Content-Type': 'application/json' }
    };
    return fetch(`https://63760ae67e93bcb006c16c60.mockapi.io/user/${id}`, requestOptions)
      .then(handleResponse)
      .then((user) => user);
  }

function getAllUsers() {
  const requestOptions = {
    method: "GET",
    headers: { 'Content-Type': 'application/json' }
  };

  return fetch('https://63760ae67e93bcb006c16c60.mockapi.io/user', requestOptions)
    .then(handleResponse)
    .then((users) => users);
}

function deleteUser(id) {
  const requestOptions = {
    method: "DELETE",
    headers: { 'Content-Type': 'application/json' }
  };

  return fetch(`https://63760ae67e93bcb006c16c60.mockapi.io/user/${id}`, requestOptions)
    .then(handleResponse)
    .then((user) => user);
}

function getUserPermission(id) {
  const requestOptions = {
    method: "GET",
    headers: { 'Content-Type': 'application/json' }
  };

  return fetch(`https://63760ae67e93bcb006c16c60.mockapi.io/user/${id}/permission`, requestOptions)
    .then(handleResponse)
    .then((user) => user);
}

function addUser(firstname, lastname, username, password,email, status) {
  const bodyData = JSON.stringify(
    buildAddUserRequestData(firstname, lastname, username, password, email, status)
  );
  const requestOptions = {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: bodyData,
  };

  return fetch('https://63760ae67e93bcb006c16c60.mockapi.io/user', requestOptions)
    .then(handleResponse)
    .then((user) => user);
}

export const userService = {
  userFetch,
  getAllUsers,
  deleteUser,
  addUser,
  userUpdate,
  getUserPermission
};
