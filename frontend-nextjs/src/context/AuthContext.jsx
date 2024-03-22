'use client';
import {AuthActionMe} from '@/src/actions/AuthAction';
import {createContext, useEffect, useState} from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUserLogin = async () => {
      const data = await AuthActionMe();
      if (data?.error) {
        setUser(null);
      } else {
        setUser(data.user);
      }
    };
    checkUserLogin();
  }, []);

  const loginContext = (user) => {
    setUser(user);
  };

  const logoutContext = () => {
    setUser(null);
  };

  return <AuthContext.Provider value={{user, loginContext, logoutContext}}>{children}</AuthContext.Provider>;
};
