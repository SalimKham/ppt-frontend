import React, { Component } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Header from "./components/Layout/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route , Switch } from "react-router-dom";
import AddProject from "./components/Project/AddProject";
import { Provider } from "react-redux";
import store from "./store";
import UpdateProject from "./components/Project/UpdateProject";
import ProjectBoard from "./components/ProjectBoard/ProjectBoard";
import AddProjectTask from "./components/ProjectBoard/ProjectTasks/AddProjectTask";
import UpdateProjectTask from "./components/ProjectBoard/ProjectTasks/UpdateProjectTask";
import landing from "./components/Layout/landing";
import register from "./components/userManagement/register";
import Login from "./components/userManagement/Login";
import jwt_decode from 'jwt-decode';
import setJWTToken from "./utils/setJWTToken"
import { SET_CURRENT_USER } from "./actions/types";
import { logout } from "./actions/userActions";



const jwtToken = localStorage.jwtToken;
if(jwtToken){
  setJWTToken(jwtToken);
  const decode_jwtToken = jwt_decode(jwtToken);
  
  const currentTime = Date.now()/1000;
  if(decode_jwtToken.exp < currentTime ){
    logout();
    window.location.href = "/";
  }else{
    store.dispatch({
      type:SET_CURRENT_USER,
      payload:decode_jwtToken
    })
  }
}
class App extends Component {
  render() {
   const logged  = localStorage.jwtToken? true: false;
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header />
            {!logged && <div>
              <Switch>
              <Route exact path="/register" component={register} />
              <Route exact path="/login" component={Login} />
              <Route  path="/" component={landing} />
              </Switch>
              </div>}
              {logged && <div>
             <Route exact path="/" component={landing} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/addProject" component={AddProject} />
            <Route exact path="/updateProject/:id" component={UpdateProject} />
            <Route exact path="/projectBoard/:id" component={ProjectBoard} />
            <Route exact path="/updateTask/:identifier/:sequence" component={UpdateProjectTask} />
            <Route
              exact
              path="/addProjectTask/:id"
              component={AddProjectTask}
            />
            </div>}
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
