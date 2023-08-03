"use client";

import { useState } from "react";
import { useContext, createContext, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../config/FireConfig";
import { useRouter } from "next/navigation";

const GlobalContext = createContext();

const Context = ({ children }) => {
  let [currentUser, setCurrentUser] = useState();
  let [loggedinUser, setLoggedinUser] = useState();

  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, [loggedinUser]);

  const Signout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (e) {
      console.error(e);
    }
  };

  const contextValue = { currentUser, Signout, setLoggedinUser };

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

const CustomContext = () => {
  return useContext(GlobalContext);
};

export default Context;
export { CustomContext };
