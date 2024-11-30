import React, {FC} from "react";
import {Button, Div, Text, useAppearance} from "@vkontakte/vkui";
import {useSelector} from "react-redux";
import {selectUsers} from "@/core/state/user.state";
import {UserCard} from "@/entities/user";
import {RouterLink} from "@/shared/router";
import {ExternalLink} from "lucide-react";

export function PageMain() {
  const users = useSelector(selectUsers);
  const appearance = useAppearance();
  console.log({appearance});

  return (
    <Div>
      <Text>Hello world!</Text>

      {users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          after={<ToUser id={user.id} />}
        />
      ))}
    </Div>
  );
}

const ToUser: FC<{ id: string | number }> = ({id}) => {
  return (
    <RouterLink href={`/users/${id}`}>
      <Button appearance="neutral">
        <ExternalLink size={18} />
      </Button>
    </RouterLink>
  );
};
