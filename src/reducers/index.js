import { combineReducers } from 'redux';
import { userUpdate, userFetch, userList, deleteUser, addUser, userPermission, assignPermToUser, deletePermission } from './user.reducer';


const rootReducer = combineReducers({
  userUpdate,
  userFetch,
  userList,
  deleteUser,
  addUser,
  userPermission,
  assignPermToUser,
  deletePermission
});

export default rootReducer;
