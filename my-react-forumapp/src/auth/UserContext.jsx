import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('forumUserData');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('forumUserData', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('forumUserData');
    }
  }, [currentUser]);

  const userLogin = (userData) => setCurrentUser(userData);
  const userLogout = () => setCurrentUser(null);

  return (
    <UserContext.Provider value={{ currentUser, userLogin, userLogout }}>
      {children}
    </UserContext.Provider>
  );
}