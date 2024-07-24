import React, { createContext, useState, useContext } from 'react';
import { API_URL } from '../services/apiService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const signIn = async (email, password) => {
    console.log('Attempting to sign in with:', email);
    try {
      const response = await fetch(`${API_URL}/api/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log('Sign in response:', data);

      if (response.ok) {
        setUser({ email, token: data.token });
        setError(null);
        console.log('Sign in successful');
      } else {
        setError(data.message || 'Sign in failed');
        console.error('Sign in failed:', data.message);
      }
    } catch (err) {
      console.error('Sign in error:', err);
      setError('An error occurred during sign in');
    }
  };

  const signUp = async (email, password) => {
    console.log('Attempting to sign up with:', email);
    try {
      const response = await fetch(`${API_URL}/api/user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log('Sign up response:', data);

      if (response.ok) {
        setUser({ email, token: data.token });
        setError(null);
        console.log('Sign up successful');
      } else {
        setError(data.message || 'Sign up failed');
        console.error('Sign up failed:', data.message);
      }
    } catch (err) {
      console.error('Sign up error:', err);
      setError('An error occurred during sign up');
    }
  };

  const signOut = () => {
    console.log('Signing out');
    setUser(null);
    setError(null);
  };

  return (
    <AuthContext.Provider value={{ user, error, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);