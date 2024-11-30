import React from "react";
import {Div, Text} from "@vkontakte/vkui";
import {useSelector} from "react-redux";
import {selectUsers} from "@/core/state/user.state";
import {UserCard} from "@/entities/user";

export function PageMain() {


  const users = useSelector(selectUsers);

  return (
    <Div>
      <Text>Hello world!</Text>

      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </Div>
  );
}
