/* eslint-disable react/prop-types */

import { createContext, useState } from "react";

const AuthContext=createContext();

const AuthContextProvider=({children})=>{
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [user, setUser] = useState({userName:"shum",userEmail:"s@gmail.com",userId:"5"});

  const login = (user) => {
    setIsAuthenticated(true);
    setUser(user);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };
  return(
    <AuthContext.Provider value={{isAuthenticated, user, login, logout}}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthContextProvider };