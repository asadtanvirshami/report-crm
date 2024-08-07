// atoms/AtomContext.tsx
import React, { createContext, useContext, ReactNode } from "react";
import { Provider } from "jotai";

interface AtomContextProps {
  children: ReactNode;
}

export const AtomContext = createContext<null>(null);

export const useAtomContext = () => useContext(AtomContext);

export const AtomProvider: React.FC<AtomContextProps> = ({ children }) => {
  return (
    <AtomContext.Provider value={null}>
      <Provider>{children}</Provider>
    </AtomContext.Provider>
  );
};
