import React, {FC} from "react";
import {RouterLink, RouterLinkProps} from "@/shared/router";

export interface ToUserLinkProps extends Omit<RouterLinkProps, "href"> {
  userId: string | number;
}

export const ToUserLink: FC<ToUserLinkProps> = ({userId, ...others}) => {
  const href = `/users/${userId}`;
  return <RouterLink href={href} {...others} />;
};
