import React, { FC } from "react";
import { User } from "@/shared/models";
import { Avatar, Button, Cell, Link, Title } from "@vkontakte/vkui";
import { ExternalLink } from "lucide-react";

export type UserCardProps = {
  user: User;
};

export const UserCard: FC<UserCardProps> = ({ user }) => {
  return (
    <Cell
      before={<Avatar size={36} />}
      after={
        <Button appearance="neutral">
          <ExternalLink size={18} />
        </Button>
      }
    >
      <Title level="3">{user.name}</Title>
      <Link>{user.website}</Link>
    </Cell>
  );
};
