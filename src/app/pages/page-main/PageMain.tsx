import React from "react";
import {Button, Div} from "@vkontakte/vkui";
import {useSelector} from "react-redux";
import {selectUsers} from "@/core/state/user.state";
import {UserCard} from "@/entities/user";
import {ExternalLink} from "lucide-react";
import {ToUserLink} from "@/features/user";

export function PageMain() {
  const users = useSelector(selectUsers);

  return (
    <Div>
      {users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          after={
            <ToUserLink userId={user.id}>
              <Button appearance="neutral" after={<ExternalLink size={18} />} />
            </ToUserLink>
          }
        />
      ))}
    </Div>
  );
}
