// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { auth, onAuthStateChanged, signOut } from '../firebaseConfig';
import { useDispatch } from 'react-redux';
import { login, logout as logoutAction } from '../store/authSlice';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        dispatch(login({ email: user.email }));
      } else {
        dispatch(logoutAction());
        localStorage.removeItem('favorites');
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  const logout = async () => {
    try {
      await signOut(auth);      // await olmalı asenkron işlem - hata veriyordu
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
