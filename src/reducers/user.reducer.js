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
        case userConstants.USER_DELETE_REQUEST:
            return {
                loading: true
            };
        case userConstants.USER_DELETE_SUCCES:
            return {
                user: action.user.responseData,
            };
        case userConstants.USER_DELETE_ERROR:
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

export function userPermission(state = [], action) {
    switch (action.type) {
        case userConstants.USER_PERMISSION:
            return {
                loading: true
            };
        case userConstants.USER_PERMISSION_SUCCES:
            return {
                userPermission: action.user,
            };
        case userConstants.USER_PERMISSION_ERROR:
            return {
                error: action.error
            };
        default:
            return state
    }
}

export function deletePermission(state = [], action) {
    switch (action.type) {
        case userConstants.PERMISSION_DELETE:
            return {
                loading: true
            };
        case userConstants.PERMISSION_DELETE_SUCCES:
            return {
                permission: action.permission,
            };
        case userConstants.PERMISSION_DELETE_ERROR:
            return {
                error: action.error
            };
        default:
            return state
    }
}

export function assignPermToUser(state = [], action) {
    switch (action.type) {
        case userConstants.PERMISSION_USER_ASSIGN:
            return {
                loading: true
            };
        case userConstants.PERMISSION_USER_ASSIGN_SUCCESS:
            return {
                permissionAssign: action.permission,
            };
        case userConstants.PERMISSION_USER_ASSIGN_ERROR:
            return {
                error: action.error
            };
        default:
            return state
    }
}