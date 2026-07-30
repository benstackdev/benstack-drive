import { createContext, useContext, useState } from "react";

type WebUserSessionType = {
  username: string,
  email: string;
};

type AuthProviderContextType = {
  sessionData: WebUserSessionType,
  setSessionData: (_data: WebUserSessionType) => void;
};

const AuthProviderContext = createContext<AuthProviderContextType | null>(null);

export function AuthProvider({ children }) {
  const [data, setData] = useState<WebUserSessionType | null>(null);

  const setSessionData = (_data: WebUserSessionType) => {
    setData(_data);
  };

  return (
    <AuthProviderContext.Provider value={{ sessionData: data, setSessionData }}>
      {children}
    </ AuthProviderContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthProviderContext);
export default AuthProvider;