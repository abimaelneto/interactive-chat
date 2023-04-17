import React, { PropsWithChildren, createContext, useState } from "react";

export const UserContext = createContext({});

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState();
  const value = {};
  return <UserContext.Provider value={value}></UserContext.Provider>;
};
