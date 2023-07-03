import React, {
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from "react";

import {
  User,
  getAuth,
  onAuthStateChanged,
  signInAnonymously,
  updateProfile,
} from "firebase/auth";
import { auth } from "libs/firebase";
import { useRouter } from "next/router";

export interface IUserContext {
  user?: User | null;
  signIn?: Function;
}

export const UserContext = createContext<IUserContext>({});

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>();
  const router = useRouter();

  const signIn = (name: string) => {
    signInAnonymously(auth)
      .then(() => {
        const { currentUser } = auth;
        if (!currentUser) return;
        updateProfile(currentUser, { displayName: name }).then(() => {
          setUser((old) => ({ ...old, ...currentUser }));
        });
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/register");
        return;
      }
      setUser(auth.currentUser);
    });
  }, []);
  const value = { user, signIn };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
