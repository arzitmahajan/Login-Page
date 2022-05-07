import React from 'react';
//here authcontext is the object that will contain the component
const AuthContext = React.createContext({
    isLoggedIn:false
});
export default AuthContext;