import { IUserContext, UserContext } from "contexts/user";
import { useContext } from "react";

export const useUser = () => useContext(UserContext);
