import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './layout/Navbar';
import Home from './pages/Home';
import PrivateRoute from './components/routing/PrivateRoute';
import Login from './components/auth/Login';

import TaskState from './context/task/TaskState';
import AuthState from './context/auth/AuthState';
import setAuthToken from './utils/setAuthToken';

//load token into global headers. Private route
if(localStorage.token){
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <AuthState>
      <TaskState>
        <BrowserRouter>
          <>
            <Navbar />
              <div className="container">
                <Switch>
                  <PrivateRoute exact path='/' component={Home} />
                  <Route exact path='/login' component={Login} />
                </Switch>
              </div>
          </>
        </BrowserRouter>
      </TaskState>
    </AuthState>
  );
}

export default App;
