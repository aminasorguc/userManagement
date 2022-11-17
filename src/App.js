import './output.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { history } from "./helpers/history";
import UserList from './Users/UserList';
import UserPage from './Users/UserPage';

function App() {
  return (
    <div className="App">
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
       </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
