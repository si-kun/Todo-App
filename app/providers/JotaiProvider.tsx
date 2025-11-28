"use client";

import { User } from "@prisma/client";
import { Provider, useSetAtom } from "jotai";
import { ReactNode, useEffect } from "react";
import { userAtom } from "../atom/user/user";

interface JotaiProviderProps {
  children: ReactNode;
  initialUser: User | null;
}

export function JotaiProvider({ children, initialUser }: JotaiProviderProps) {
  return (
    <Provider>
      <UserInitializer initialUser={initialUser}>{children}</UserInitializer>
    </Provider>
  );
}

interface UserInitializerProps {
  children: ReactNode;
  initialUser: User | null;
}

function UserInitializer({ children, initialUser }: UserInitializerProps) {
  const setUser = useSetAtom(userAtom);

  useEffect(() => {
    if (initialUser) {
      setUser(initialUser);
    }
  }, [initialUser, setUser]);

  return <>{children}</>;
}
