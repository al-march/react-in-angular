import React, {FC} from "react";
import {Div, Text} from "@vkontakte/vkui";
import {useSelector} from "react-redux";
import {selectUsers} from "@/core/state/user.state";
import {UserCard} from "@/entities/user";

export type PageUserProps = {
  userId: string;
}

export const PageUser: FC<PageUserProps> = ({userId}) => {
  const users = useSelector(selectUsers);

  const user = users.find((user) => String(user.id) === userId);

  if (!user) {
    return <Text>Пользователь не найден =(</Text>;
  }

  return (
    <Div>
      <UserCard user={user} />
    </Div>
  );
};
