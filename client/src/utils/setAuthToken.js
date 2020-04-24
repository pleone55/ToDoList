import axios from 'axios';

const setAuthToken = token => {
    //set the token if the proper user is logged in
    if(token) {
        axios.defaults.headers.common['x-auth-token'] = token;
    } else {
        //delete the token if they log out
        delete axios.defaults.headers.common['x-auth-token'];
    }
}
export default setAuthToken;