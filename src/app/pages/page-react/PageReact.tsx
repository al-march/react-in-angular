import React, { FC } from "react";

export type PageIntroProps = {
  text: string;
};

export const PageReact: FC<PageIntroProps> = (props) => {
  return (
    <div>
      <h1>Intro page</h1>
      <p>This page is created by React</p>

      <small>Text prop: {props.text}</small>
    </div>
  );
};
