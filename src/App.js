import './output.css';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { history } from "./helpers/history";
import UserList from './Users/UserList';
import UserPage from './Users/UserPage';
import UserCreate from './Users/UserCreate';
import PermissionPage from './Users/PermissionPage';

function App() {
  return (
    <div className="App">
      <ToastContainer />
       <BrowserRouter history={history}>
       <Routes>
       <Route
            path="/"
            element={
                <UserList />
            }
          />
        <Route
            path="/user/:id"
            element={
                <UserPage />
            }
          />
        <Route
            path="/user/create"
            element={
                <UserCreate />
            }
          />
          <Route
            path="/user/permission/:id"
            element={
                <PermissionPage />
            }
          />
       </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
