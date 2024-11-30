import React, {FC} from "react";
import {User} from "@/shared/models";
import {Avatar, Cell, CellProps, Link, Title} from "@vkontakte/vkui";

export interface UserCardProps extends CellProps {
  user: User;
};

export const UserCard: FC<UserCardProps> = ({user, ...cellProps}) => {
  return (
    <Cell
      before={<Avatar size={36} />}
      {...cellProps}
    >
      <Title level="3">{user.name}</Title>
      <Link>{user.website}</Link>
    </Cell>
  );
};
