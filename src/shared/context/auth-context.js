import { createContext } from "react";

export const AuthContext = createContext({
  userID: null,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});
