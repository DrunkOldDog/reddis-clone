import React, { useContext, createContext, useState, useEffect } from "react";
import { Hub, Auth } from "aws-amplify";
import type { SetStateAction, Dispatch } from "react";
import type { CognitoUser } from "@aws-amplify/auth";

type User = CognitoUser | null;
interface IUserContext {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
}

const UserContext = createContext<IUserContext>({} as IUserContext);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    Hub.listen("auth", checkUser);
  }, []);

  const checkUser = async () => {
    try {
      const amplifyUser = await Auth.currentAuthenticatedUser();
      setUser(amplifyUser);
    } catch (error) {
      console.error(error.message);
      setUser(null);
    }
  };

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export const useAuth = () => useContext(UserContext);
