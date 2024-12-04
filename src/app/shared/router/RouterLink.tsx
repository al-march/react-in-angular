import React, {FC, HTMLProps, MouseEvent, ReactNode, useContext} from "react";
import {Router} from "@angular/router";
import {NgContext} from "@/shared/react-component/AngularContext";

export interface RouterLinkProps extends HTMLProps<HTMLAnchorElement> {
  href: string;
  children: ReactNode;
}

/**
 * Пока навигация осуществляется за счет Angular роутинга,
 * необходимо использовать Router.
 *
 * TODO: избавиться от зависимостей от Angular
 */
export const RouterLink: FC<RouterLinkProps> = (props) => {
  const router = useContext(NgContext).injector.get(Router);

  function navigate(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    router.navigate(props.href.split("/"));
  }

  return (
    <a {...props} onClick={navigate} />
  );
};
