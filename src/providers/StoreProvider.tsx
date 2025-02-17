"use client";

import { createContext, useContext } from "react";

const store = {
  user: {
    name: "John Doe",
  },
};

const StoreContext = createContext<typeof store | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>     
  );
}

export const useStoreContext = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStoreContext must be used within StoreProvider");
  }
  return context;
};
