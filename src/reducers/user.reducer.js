import { userConstants } from '../constants';

export function userUpdate(state = [], action) {
    switch (action.type) {
        case userConstants.USER_UPDATE_REQUEST:
            return {
                loading: true
            };
        case userConstants.USER_UPDATE_SUCCES:
            return {
                user: action.user.responseData
            };
        case userConstants.USER_UPDATE_ERROR:
            return {
                error: action.error
            };
        default:
            return state
    }
}

export function userFetch(state = [], action) {
    switch (action.type) {
        case userConstants.USER_FETCH_REQUEST:
            return {
                loading: true
            };
        case userConstants.USER_FETCH_SUCCES:
            return {
                user: action.user.responseData
            };
        case userConstants.USER_FETCH_ERROR:
            return {
                error: action.error
            };
        default:
            return state
    }
}

export function userList(state = [], action) {
    switch (action.type) {
        case userConstants.USER_LIST_REQUEST:
            return {
                loading: true
            };
        case userConstants.USER_LIST_SUCCES:
            return {
                list: action.objects,
            };
        case userConstants.USER_LIST_ERROR:
            return {
                error: action.error
            };
        default:
            return state
    }
}

export function deleteUser(state = [], action) {
    switch (action.type) {
        case userConstants.USER_ID_REQUEST:
            return {
                loading: true
            };
        case userConstants.USER_ID_SUCCES:
            return {
                user: action.user.responseData,
            };
        case userConstants.USER_ID_ERROR:
            return {
                error: action.error
            };
        default:
            return state
    }
}

export function addUser(state = [], action) {
    switch (action.type) {
        case userConstants.USER_REQUEST:
            return {
                loading: true
            };
        case userConstants.USER_SUCCES:
            return {
                user: action.user.responseData,
            };
        case userConstants.USER_ERROR:
            return {
                error: action.error
            };
        default:
            return state
    }
}