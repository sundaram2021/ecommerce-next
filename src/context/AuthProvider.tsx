"use client"

import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../utils/firebase';
import Login from '../app/login/page';

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user] = useAuthState(auth);


  if(user){
    return <main>{children}</main>
  }

  

  return <Login />;
};


export default AuthProvider;