import React from "react";

export type PageIntroProps = {
  text: string;
};

export const PageIntro = (props: PageIntroProps) => {
  return (
    <div>
      <h1>Intro page</h1>
      <p>This page is created by React</p>

      {props.text && <small>{props.text}</small>}
    </div>
  );
};
