import React, {createContext, ReactNode, useContext} from "react";

const Context = createContext<unknown>(undefined);

export function Match({expression, children}: { expression: unknown, children: ReactNode }) {
  return (
    <Context.Provider value={expression}>
      {children}
    </Context.Provider>
  );
}

export function Case({value, children}: { value: unknown, children: ReactNode }) {
  const v = useContext(Context);
  if (v === value) {
    return children;
  }
  return null;
}
