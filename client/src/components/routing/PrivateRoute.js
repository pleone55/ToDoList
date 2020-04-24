import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/auth/AuthContext';

//Home page is a private route. If user is authenticated go to home page
//If user is not authenticated redirect back to login page
//prevents people from trying to go to home page if they are not logged in
const PrivateRoute = ({ component: Component, ...rest }) => {
    const authContext = useContext(AuthContext);
    const { isAuthenticated, loading } = authContext;

    return (
        <Route {...rest} render={props => !isAuthenticated && !loading ? (
            <Redirect to="/login" />
        ) : (
            <Component {...props} />
        )} />
    )
};
export default PrivateRoute;