import { combineReducers } from 'redux';
import { userUpdate, userFetch, userList, deleteUser, addUser } from './user.reducer';


const rootReducer = combineReducers({
  userUpdate,
  userFetch,
  userList,
  deleteUser,
  addUser,
});

export default rootReducer;
