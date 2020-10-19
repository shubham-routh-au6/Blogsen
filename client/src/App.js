import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "semantic-ui-css/semantic.min.css";
import Landing from "./components/landing";
import Login from "./components/authentication/login";
import Register from "./components/authentication/register";
import Dashboard from "./components/dashboard";
import Logout from "./components/authentication/logout";
import CreateBlog from "./components/blogCrud/createBlog";
import EditPage from "./components/blogCrud/editPage";
import PrivateRoute from "./utility/PrivateRoute";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <Route exact path="/logout" component={Logout} />
          {/* <PrivateRoute exact path="/userBlog" component={AllBlog} /> */}
          <PrivateRoute exact path="/createBlog" component={CreateBlog} />
          <PrivateRoute exact path="/editPage/:id" component={EditPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
