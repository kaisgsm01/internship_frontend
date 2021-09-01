import React, { useCallback, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
import Users from "./user/pages/Users";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import Auth from "./user/pages/Auth";
import { AuthContext } from "./shared/context/auth-context";
import Clients from "./Clients/pages/Clients";
import MemosListPage from "./memos/pages/MemosListPage";
import AddMemo from "./memos/pages/AddMemo";
import ButtonsPage from "./shared/pages/ButtonsPage";
import Email from "./Email/pages/Email";
import Profile from "./profile/profile";
import AddClient from "./Clients/pages/AddClient";
import AddTask from "./Tasks/pages/AddTask";
import AssignedTasks from "./Tasks/pages/assignedTasks";
import CreatedTasks from "./Tasks/pages/createdTasks";
import UpdateMemo from "./memos/pages/updateMemo";
import UpdateClient from "./Clients/pages/updateClient";
import UpdateTask from "./Tasks/pages/updateTask";
import Welcome from "./welcome/welcome";
const App = () => {
  const [userID,setUserID] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const login = useCallback((id) => {setIsLoggedIn(true);setUserID(id)}, []);
  const logout = useCallback(() => {setIsLoggedIn(false);setUserID(null)}, []);

  let routes;
  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path='/' exact ><Welcome /></Route>
        <Route path="/memos" exact>
          <ButtonsPage
            buttons={[
              { buttonName: "ADD MEMO", path: "/addmemo" },
              { buttonName: "MY MEMOS", path: "/memoslist" },
            ]}
          />
        </Route>
        <Route path="/memoslist" exact>
          <MemosListPage />
        </Route>
        <Route path="/addmemo" exact>
          <AddMemo />
        </Route>
        <Route path="/updatememo/:mid" exact>
          <UpdateMemo />
        </Route>
        <Route path="/email" exact>
          <Email/>
        </Route>
        <Route path="/clients" exact>
          <ButtonsPage
            buttons={[
              { buttonName: "ADD CLIENTS", path: "/addclient" },
              { buttonName: "MY CLIENTS", path: "/clientslist" },
            ]}
          />
        </Route>
        <Route path="/clientslist" exact>
          <Clients />
        </Route>
        <Route path="/addclient" exact>
          <AddClient />
        </Route>
        <Route path="/updateclient/:cid" exact>
          <UpdateClient />
        </Route>
        <Route path="/tasks">
          <ButtonsPage
            buttons={[
              { buttonName: "ADD TASK", path: "/addtask" },
              { buttonName: "ASSIGNED TASKS", path: "/assignedtaskslist" },
              { buttonName: "CREATED TASKS", path: "/createdtaskslist" }
            ]}
          />
        </Route>
        <Route path="/addtask" exact>
          <AddTask />
        </Route>
        <Route path="/assignedtaskslist" exact>
          <AssignedTasks />
        </Route>
        <Route path="/createdtaskslist" exact>
          <CreatedTasks />
        </Route>
        <Route path="/updatetask/:tid" exact>
          <UpdateTask />
        </Route>
        <Route path="/profile" >
          <Profile/>
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/auth" exact>
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        login: login,
        logout: logout,
        userID: userID,
      }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};
export default App;
