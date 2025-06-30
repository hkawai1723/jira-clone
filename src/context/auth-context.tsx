"use client";
import { User, onAuthStateChanged } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@firebase";

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      setLoading(false);

      if(user) {
        const token = await user.getIdToken();
        document.cookie= `firebase-token=${token}; path=/`;
      } else {
        document.cookie = `firebase-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      }
    });

    return () => unsubscribe();
  });

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context) {
    const { user, loading } = context;
    return { user, loading };
  } else {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
};
