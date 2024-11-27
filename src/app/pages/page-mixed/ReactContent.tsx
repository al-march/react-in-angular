import React, { FC, ReactNode } from "react";

type ContentProps = {
  children: ReactNode
}

export const ReactContent: FC<ContentProps> = ({ children }) => {
  return (
    <div>
      {children}
    </div>
  );
};
