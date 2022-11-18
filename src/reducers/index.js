import { combineReducers } from 'redux';
import { userUpdate, userFetch, userList, deleteUser, addUser, userPermission } from './user.reducer';


const rootReducer = combineReducers({
  userUpdate,
  userFetch,
  userList,
  deleteUser,
  addUser,
  userPermission
});

export default rootReducer;
