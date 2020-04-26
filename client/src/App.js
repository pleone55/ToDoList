import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './layout/Navbar';
import Home from './pages/Home';
import CompletedTask from './components/CompletedTask';
import PrivateRoute from './components/routing/PrivateRoute';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alerts from './layout/Alerts';

import TaskState from './context/task/TaskState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import setAuthToken from './utils/setAuthToken';

//load token into global headers. Private route
if(localStorage.token){
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <AuthState>
      <TaskState>
        <AlertState>
          <BrowserRouter>
            <>
              <Navbar />
                <div className="container">
                  <Alerts />
                  <Switch>
                    <PrivateRoute exact path='/' component={Home} />
                    <PrivateRoute exact path='/completed' component={CompletedTask} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/register' component={Register} />
                  </Switch>
                </div>
            </>
          </BrowserRouter>
        </AlertState>
      </TaskState>
    </AuthState>
  );
}

export default App;
