import React, { createContext, useContext, useState, ReactNode } from "react";

export interface AuthContextType {
  auth: boolean;
  name: string;
  setAuth: React.Dispatch<React.SetStateAction<boolean>>;
  setName: React.Dispatch<React.SetStateAction<string>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [auth, setAuth] = useState<boolean>(false);
  const [name, setName] = useState<string>("");

  const authContextValue = {
    auth,
    name,
    setAuth,
    setName,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
