import React, { createContext, useState } from 'react';

// Create the Context
export const UserDataContext = createContext();

function UserProvider({ children }) {
  // State for user data
  const [user, setUser] = useState({
    email: '',
    fullName: {
      firstName: '',
      lastName: '',
    },
  });

  return (
    // Provide both `user` and `setUser` so consumers can read and update the data
    <UserDataContext.Provider value={{ user, setUser }}>
      {children}
    </UserDataContext.Provider>
  );
}

export default UserProvider;
