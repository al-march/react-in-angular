import React, { FC, ReactNode } from "react";

type ContentProps = {
  children: ReactNode,
  onClick?: () => void,
}

export const ReactContent: FC<ContentProps> = ({ children, onClick }) => {
  return (
    <div onClick={onClick}>
      {children}
    </div>
  );
};
