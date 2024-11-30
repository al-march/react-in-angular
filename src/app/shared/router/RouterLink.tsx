import React, {FC, HTMLProps, MouseEvent, ReactNode} from "react";
import {useNgInjector} from "@/core/ng-injector";
import {Router} from "@angular/router";

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
  function navigate(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    const router = useNgInjector(Router);
    router.navigate(props.href.split("/"));
  }

  return (
    <a {...props} onClick={navigate} />
  );
};
