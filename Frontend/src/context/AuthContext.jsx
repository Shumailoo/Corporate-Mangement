/* eslint-disable react/prop-types */

import { createContext, useState } from "react";

const AuthContext=createContext();

const AuthContextProvider=({children})=>{
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const login = (user) => {
    setIsAuthenticated(true);
    setUser(user);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };
  return(
    <AuthContext.Provider value={{isAuthenticated, user, setUser, login, logout}}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthContextProvider };